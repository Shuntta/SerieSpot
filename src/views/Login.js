import "../assets/styles/Login.css";
import React, { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // You would need to implement a function to actually
    // handle the login process using the email and password
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
        </form>
        <p>
          <a href="/SignIn">I don't have an account? </a>
        </p>
      </div>
    </div>
  );
};

export default Login;