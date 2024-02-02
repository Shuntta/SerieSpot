import "../assets/styles/SerieHub.css";
import React from 'react'
import {Link} from "react-router-dom";
import ReviewList from "../components/ReviewList";
import useFetch from "../hooks/useFetch";


const SerieHub = () => {

    const{data: reviews, isPending, error} = useFetch("http://localhost:8000/reviews")
  return (
    <div className="tudoSerieSpot">
    <div className="left-SerieHub">
        <div className="left-container">
            <div className="movieTest" id="movie1">

            </div>
        </div>
        <div className="vertical-line-SerieHub"></div>
  
    </div>


    <div className="right-SerieHub">
        <div className="reviews">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {reviews && <ReviewList reviews={reviews} />}
        </div>
    </div>
    </div>

    
  )
};

export default SerieHub;

