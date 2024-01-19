import React, { useState } from "react";
import "../assets/styles/SignIn.css"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
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
        <label htmlFor="repeatEmail">Repeat Email:</label>
        <input
          type="email"
          id="repeatEmail"
          value={repeatEmail}
          onChange={(e) => setRepeatEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          <a href="/LogIn">I don't have an account? </a>
        </p>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
