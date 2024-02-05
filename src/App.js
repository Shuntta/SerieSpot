import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import LandingPage from "./views/LandingPage";
import CreateReview from "./views/CreateReview";
import Login from "./views/Login";
import SignIn from "./views/SignIn";
import MySeries from "./views/MySeries";
import SerieHub from "./views/SerieHub";
import ReviewDetails from "./components/ReviewDetails";
import SerieHubNoId from "./views/SerieHubNoId";
import { MovieProvider } from './components/MovieContext'; // Certifique-se de que o caminho está correto
import "./App.css";

function App() {
  return (
    <Router>
      <MovieProvider> {/* Envolve todos os componentes roteados com MovieProvider */}
        <div className="App">
          <div className="content">
            <Navbar /> {/* O Navbar pode ser movido para fora do Routes se for comum a todas as páginas */}
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/CreateReview" element={<CreateReview />} />
              <Route path="/review/:id" element={<ReviewDetails />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/MySeries" element={<MySeries />} />
              <Route path="/SerieHub/:movieId" element={<SerieHub />} />
              <Route path="/SerieHubNoId" element={<SerieHubNoId />} />
            </Routes>
          </div>
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;
