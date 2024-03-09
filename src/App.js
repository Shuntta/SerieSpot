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
import { MovieProvider } from './components/MovieContext';
import "./App.css";

function App() {
  return (
    <Router>
      <MovieProvider> {}
        <div className="App">
          <div className="content">
            <Navbar /> {}
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/CreateReview/:movieId" element={<CreateReview />} />
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
