import "../assets/styles/Login.css";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido! ID do usuário:", data.userId);
        localStorage.setItem("userId", data.userId);
        window.location.replace('/');
      } else {
        const data = await response.json();
        console.error("Erro ao fazer login:", data.error);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <div id="page-container">
      <div id="content-wrap">
        <form id="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p>
          <a href="/SignIn">I don't have an account? </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

