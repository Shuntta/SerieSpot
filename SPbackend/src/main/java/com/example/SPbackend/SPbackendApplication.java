package com.example.SPbackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@SpringBootApplication
public class SPbackendApplication {

	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String dbUsername;

	@Value("${spring.datasource.password}")
	private String dbPassword;

	public static void main(String[] args) {
		SpringApplication.run(SPbackendApplication.class, args);
	}

	@CrossOrigin(origins = "http://localhost:3000")

	@RestController
	public class AuthController {

		@PostMapping("/signin")
		public ResponseEntity<Object> signIn(@RequestBody SignInRequest signInRequest) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				System.out.println("Email do usuário: " + signInRequest.getEmail());
				System.out.println("Senha do usuário: " + signInRequest.getPassword());

				String sql = "SELECT id FROM usuarios WHERE email = ? AND senha = ?";
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setString(1, signInRequest.getEmail());
					statement.setString(2, signInRequest.getPassword());
					try (ResultSet resultSet = statement.executeQuery()) {
						if (resultSet.next()) {
							int userId = resultSet.getInt("id");
							// Retorna um objeto JSON com a mensagem e o ID do usuário
							return ResponseEntity.ok()
									.body("{\"message\": \"Login bem-sucedido!\", \"userId\": " + userId + "}");
						} else {
							return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos!");
						}
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erro ao conectar-se ao banco de dados.");
			}
		}

		@PostMapping("/signup")
		public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpRequest) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setString(1, signUpRequest.getEmail());
					statement.setString(2, signUpRequest.getPassword());
					int rowsInserted = statement.executeUpdate();
					if (rowsInserted > 0) {
						return ResponseEntity.ok("Usuário cadastrado com sucesso!");
					} else {
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								.body("Falha ao cadastrar usuário.");
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erro ao conectar-se ao banco de dados.");
			}
		}
	}

	public static class SignInRequest {
		private String email;
		private String password;

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

	public static class SignUpRequest {
		private String email;
		private String password;

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}
}
