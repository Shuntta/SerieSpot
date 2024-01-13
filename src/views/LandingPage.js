import "../assets/styles/LandingPage.css";
import React from "react";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="landing">

      <div>
        <h1 className="maintext">SerieSpot</h1>
        <h2 className="slogan">A place where you can write your Series review</h2>
      </div>

      <div className="btnbox">
        <Link to="/" className="btngohome">
          Enter Website
        </Link>
      </div>

    </div>
  );
};

export default Landingpage;
