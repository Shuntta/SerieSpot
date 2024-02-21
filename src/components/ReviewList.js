import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import getCurrentDate from "../assets/utils/getCurrentDate";
import StarRating from "./StarRating";
import "../assets/styles/ReviewList.css"
import axios from "axios";

const ReviewList = ({ reviews, title, date }) => {
  const displayDate = date === undefined ? getCurrentDate() : date;

  const sendMovieIdToBackend = async (movieId) => {
    try {
      const response = await fetch('http://localhost:8080/reviewsmovieid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId }),
      });
      const responseData = await response.json();
      console.log("Resposta do backend:", responseData);
    } catch (error) {
      console.error("Erro ao enviar o movieId para o backend:", error);
    }
  };


  useEffect(() => {
    // Chama a função para enviar o movieId para o backend ao carregar a página
    sendMovieIdToBackend(title);
  }, []); // O segundo argumento vazio faz com que o useEffect só seja executado uma vez, ao carregar a página





  return (
    <div className="review-list">
      
    </div>
  );
};

export default ReviewList;