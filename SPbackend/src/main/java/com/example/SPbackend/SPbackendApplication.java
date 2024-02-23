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
import java.util.ArrayList;
import java.util.List;

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

		@PostMapping("/createreviews")
		public ResponseEntity<String> addReview(@RequestBody ReviewRequest reviewRequest) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String sql = "INSERT INTO avaliacoes (id_usuario, avaliacao, comentario, id_movie) VALUES (?, ?, ?, ?)";
				try (PreparedStatement statement = connection.prepareStatement(sql)) {
					statement.setInt(1, reviewRequest.getUserId());
					statement.setInt(2, reviewRequest.getRating());
					statement.setString(3, reviewRequest.getBody());
					statement.setInt(4, reviewRequest.getMovieId());
					int rowsInserted = statement.executeUpdate();
					if (rowsInserted > 0) {
						return ResponseEntity.ok("Revisão adicionada com sucesso!");
					} else {
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								.body("Falha ao adicionar revisão.");
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erro ao conectar-se ao banco de dados.");
			}
		}

		@PostMapping("/watched")
		public ResponseEntity<String> markAsWatched(@RequestBody WatchedRequest requestWatched) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT watched FROM biblioteca_user WHERE user_id = ? AND movie_id = ?";
				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, requestWatched.getUserId());
					selectStatement.setInt(2, requestWatched.getMovieId());
					try (ResultSet resultSet = selectStatement.executeQuery()) {
						if (resultSet.next()) {
							boolean watched = resultSet.getBoolean("watched");
							String updateQuery = "UPDATE biblioteca_user SET watched = ? WHERE user_id = ? AND movie_id = ?";
							try (PreparedStatement updateStatement = connection.prepareStatement(updateQuery)) {
								updateStatement.setBoolean(1, !watched); // Alterna o valor de watched
								updateStatement.setInt(2, requestWatched.getUserId());
								updateStatement.setInt(3, requestWatched.getMovieId());
								int rowsAffected = updateStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as watched successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as watched.");
								}
							}
						} else {
							String insertQuery = "INSERT INTO biblioteca_user (user_id, movie_id, watched) VALUES (?, ?, true)";
							try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
								insertStatement.setInt(1, requestWatched.getUserId());
								insertStatement.setInt(2, requestWatched.getMovieId());
								int rowsAffected = insertStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as watched successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as watched.");
								}
							}
						}
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to connect to the database.");
			}
		}

		@PostMapping("/watch")
		public ResponseEntity<String> markAsWatch(@RequestBody WatchedRequest requestWatch) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT towatch FROM biblioteca_user WHERE user_id = ? AND movie_id = ?";
				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, requestWatch.getUserId());
					selectStatement.setInt(2, requestWatch.getMovieId());
					try (ResultSet resultSet = selectStatement.executeQuery()) {
						if (resultSet.next()) {
							boolean towatch = resultSet.getBoolean("towatch");
							String updateQuery = "UPDATE biblioteca_user SET towatch = ? WHERE user_id = ? AND movie_id = ?";
							try (PreparedStatement updateStatement = connection.prepareStatement(updateQuery)) {
								updateStatement.setBoolean(1, !towatch);
								updateStatement.setInt(2, requestWatch.getUserId());
								updateStatement.setInt(3, requestWatch.getMovieId());
								int rowsAffected = updateStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as to watch successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as to watch.");
								}
							}
						} else {
							String insertQuery = "INSERT INTO biblioteca_user (user_id, movie_id, towatch) VALUES (?, ?, true)";
							try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
								insertStatement.setInt(1, requestWatch.getUserId());
								insertStatement.setInt(2, requestWatch.getMovieId());
								int rowsAffected = insertStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as to watch successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as to watch.");
								}
							}
						}
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to connect to the database.");
			}
		}

		@PostMapping("/liked")
		public ResponseEntity<String> markAsliked(@RequestBody WatchedRequest requestliked) {
			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT liked FROM biblioteca_user WHERE user_id = ? AND movie_id = ?";
				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, requestliked.getUserId());
					selectStatement.setInt(2, requestliked.getMovieId());
					try (ResultSet resultSet = selectStatement.executeQuery()) {
						if (resultSet.next()) {
							boolean liked = resultSet.getBoolean("liked");
							String updateQuery = "UPDATE biblioteca_user SET liked = ? WHERE user_id = ? AND movie_id = ?";
							try (PreparedStatement updateStatement = connection.prepareStatement(updateQuery)) {
								updateStatement.setBoolean(1, !liked);
								updateStatement.setInt(2, requestliked.getUserId());
								updateStatement.setInt(3, requestliked.getMovieId());
								int rowsAffected = updateStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as to watch successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as to watch.");
								}
							}
						} else {
							String insertQuery = "INSERT INTO biblioteca_user (user_id, movie_id, liked) VALUES (?, ?, true)";
							try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
								insertStatement.setInt(1, requestliked.getUserId());
								insertStatement.setInt(2, requestliked.getMovieId());
								int rowsAffected = insertStatement.executeUpdate();
								if (rowsAffected > 0) {
									return ResponseEntity.ok("Movie marked as to watch successfully.");
								} else {
									return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
											.body("Failed to mark movie as to watch.");
								}
							}
						}
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Failed to connect to the database.");
			}
		}

		@PostMapping("/watcheduser")
		public ResponseEntity<List<Integer>> getWatchedMovies(@RequestBody WatchedUserRequest watchedUserRequest) {
			int userId = watchedUserRequest.getUserId();
			List<Integer> watchedMovies = new ArrayList<>();

			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT movie_id FROM biblioteca_user WHERE user_id = ? AND watched = true";

				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, userId);

					try (ResultSet resultSet = selectStatement.executeQuery()) {
						while (resultSet.next()) {
							watchedMovies.add(resultSet.getInt("movie_id"));
						}
					}
				}

				return ResponseEntity.ok(watchedMovies);
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(null); // Retorna uma resposta vazia em caso de erro
			}
		}

		@PostMapping("/likeduser")
		public ResponseEntity<List<Integer>> getlikedMovies(@RequestBody WatchedUserRequest likedUserRequest) {
			int userId = likedUserRequest.getUserId();
			List<Integer> likedMovies = new ArrayList<>();

			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT movie_id FROM biblioteca_user WHERE user_id = ? AND liked = true";

				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, userId);

					try (ResultSet resultSet = selectStatement.executeQuery()) {
						while (resultSet.next()) {
							likedMovies.add(resultSet.getInt("movie_id"));
						}
					}
				}

				return ResponseEntity.ok(likedMovies);
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(null); // Retorna uma resposta vazia em caso de erro
			}
		}

		@PostMapping("/towatchuser")
		public ResponseEntity<List<Integer>> gettowatchMovies(@RequestBody WatchedUserRequest towatchUserRequest) {
			int userId = towatchUserRequest.getUserId();
			List<Integer> towatchMovies = new ArrayList<>();

			try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
				String selectQuery = "SELECT movie_id FROM biblioteca_user WHERE user_id = ? AND towatch = true";

				try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
					selectStatement.setInt(1, userId);

					try (ResultSet resultSet = selectStatement.executeQuery()) {
						while (resultSet.next()) {
							towatchMovies.add(resultSet.getInt("movie_id"));
						}
					}
				}

				return ResponseEntity.ok(towatchMovies);
			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(null); // Retorna uma resposta vazia em caso de erro
			}
		}

		@PostMapping("/reviewsmoviesid")
public ResponseEntity<List<MovieReview>> getMovieReviewsById(@RequestBody ReviewMoviesId requestBody) {
    int movieId = requestBody.getMovieId(); // Obtendo o movieId do objeto ReviewMoviesId

    List<MovieReview> movieReviews = new ArrayList<>();

    try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
        System.out.println("Conexão estabelecida com o banco de dados.");
        
        String selectQuery = "SELECT avaliacao, comentario FROM avaliacoes WHERE id_movie = ?";
        System.out.println("Query SQL: " + selectQuery);
        
        try (PreparedStatement selectStatement = connection.prepareStatement(selectQuery)) {
            selectStatement.setInt(1, movieId);
            System.out.println("Parâmetro movieId definido: " + movieId);

            try (ResultSet resultSet = selectStatement.executeQuery()) {
                System.out.println("Executando a consulta...");
                
                while (resultSet.next()) {
                    int avaliacao = resultSet.getInt("avaliacao");
                    String comentario = resultSet.getString("comentario");
                    movieReviews.add(new MovieReview(movieId, avaliacao, comentario));
                    System.out.println("Adicionada avaliação: " + avaliacao + ", Comentário: " + comentario);
                }
            }
        }

        System.out.println("Retornando as avaliações do filme com ID: " + movieId);
        return ResponseEntity.ok(movieReviews);
    } catch (SQLException e) {
        e.printStackTrace();
        System.err.println("Erro ao executar a consulta SQL: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(null);
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

	public static class ReviewRequest {
		private String body;
		private int userId;
		private int movieId;
		private int rating;

		public String getBody() {
			return body;
		}

		public void setBody(String body) {
			this.body = body;
		}

		public int getUserId() {
			return userId;
		}

		public void setUserId(int userId) {
			this.userId = userId;
		}

		public int getMovieId() {
			return movieId;
		}

		public void setMovieId(int movieId) {
			this.movieId = movieId;
		}

		public int getRating() {
			return rating;
		}

		public void setRating(int rating) {
			this.rating = rating;
		}
	}

	public static class WatchedRequest {
		private int userId;
		private int movieId;

		public int getUserId() {
			return userId;
		}

		public void setUserId(int userId) {
			this.userId = userId;
		}

		public int getMovieId() {
			return movieId;
		}

		public void setMovieId(int movieId) {
			this.movieId = movieId;
		}
	}

	public static class WatchedUserRequest {
		private int userId;

		public int getUserId() {
			return userId;
		}

		public void setUserId(int userId) {
			this.userId = userId;
		}
	}

	public static class MovieReview {
		private int movieId;
		private int avaliacao;
		private String comentario;
	
		public MovieReview(int movieId, int avaliacao, String comentario) {
			this.movieId = movieId;
			this.avaliacao = avaliacao;
			this.comentario = comentario;
		}
	
		public int getMovieId() {
			return movieId;
		}
	
		public void setMovieId(int movieId) {
			this.movieId = movieId;
		}
	
		public int getAvaliacao() {
			return avaliacao;
		}
	
		public void setAvaliacao(int avaliacao) {
			this.avaliacao = avaliacao;
		}
	
		public String getComentario() {
			return comentario;
		}
	
		public void setComentario(String comentario) {
			this.comentario = comentario;
		}
	}
	public static class ReviewMoviesId {
		private int movieId;
	
		public int getMovieId() {
			return movieId;
		}
	
		public void setMovieId(int movieId) {
			this.movieId = movieId;
		}
	}
	
	
	

}
