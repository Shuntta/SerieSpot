import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import LandingPage from "./views/LandingPage";
import "./App.css";
import CreateReview from "./views/CreateReview";
import Login from "./views/Login";
import SignIn from "./views/SignIn";
import MySeries from "./views/MySeries"; // Importe a sua página MySeries

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />

            <Route
              path="/CreateReview"
              element={
                <>
                  <Navbar />
                  <CreateReview />
                </>
              }
            />

            <Route
              path="/Login"
              element={
                <>
                  <Navbar />
                  <Login />
                </>
              }
            />

            <Route
              path="/SignIn"
              element={
                <>
                  <Navbar />
                  <SignIn />
                </>
              }
            />

            
            <Route
              path="/MySeries"
              element={
                <>
                  <Navbar />
                  <MySeries />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
