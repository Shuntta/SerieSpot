import React, { useState } from "react";
import "../assets/styles/SignIn.css";
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("As passwords não correspondem. Por favor, insira as mesmas credenciais nos campos de password.");
      return;
    }
    
    const data = {
      email: email,
      password: password
    };
  
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log("Cadastro realizado com sucesso!");
        window.location.replace('/Login');
      } else {
        console.error("Falha no cadastro!");
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };
  
  return (
    <div id="page-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="repeatPassword">Repetir Senha:</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <p>
          <a href="/LogIn">Já tem uma conta? Faça login</a>
        </p>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUp;
