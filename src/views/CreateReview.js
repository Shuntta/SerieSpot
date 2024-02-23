import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import AutocompleteInput from "../components/AutocompleteInput";
import "../assets/styles/CreateReview.css";

const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState("");
  const [movieId, setMovieId] = useState(null); // Estado para armazenar movieId
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(1);

  useEffect(() => {
    // Ajuste de altura dos inputs, igual ao código fornecido
  }, [title, author, body]);

  const handleTitleChange = (newTitle, newAuthor, newMovieId) => {
    setTitle(newTitle);
    setAuthor(newAuthor);
    setMovieId(newMovieId); // Define o movieId
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Obtém o userId do localStorage
    const userId = localStorage.getItem("userId");
  
    // Verifica se userId existe
    if (!userId) {
      console.error("userId not found in localStorage");
      navigate("/Login");
      return;
    }
  
    const review = {
      body,
      userId: parseInt(userId),
      movieId,
      rating: selectedRating
    };
  
    console.log("Review Object:", review);
  
    setIsPending(true);
  
    fetch("http://localhost:8080/createreviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then(() => {
        console.log("new review added");
        setIsPending(false);
        navigate(`/SerieHub/${movieId}`);
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        setIsPending(false);
      });
  };
  

  return (
    <div className="container flex-container">
      <div className="left">
        <input
          type="titulo--preview"
          disabled
          value={title}
          className="titulo-input"
          id="tituloInput"
        />
        <input
          type="author-preview"
          disabled
          value={author}
          className="author-input"
          id="authorInput"
        />

        <div className="rating-preview">
          <StarRating initialRating={selectedRating} />
        </div>

        <textarea
          type="text-preview"
          disabled
          value={body}
          className="body-input"
          id="bodyTextarea"
        />
        <label
          style={{
            fontSize: "15px",
            lineHeight: "3",
            verticalAlign: "top",
            color: "white",
          }}
        >
          By{" "}
        </label>
        <textarea
          type="user-preview"
          disabled
          value={user}
          className="user-input"
          id="userInput"
          style={{
            borderRadius: "0px 10px 10px 0px",
            height: "14px",
            fontSize: "14px",
            color: "#6e6e6e90",
          }}
        />
      </div>

      <div className="vertical-line"></div>

      <div className="right">
        <div className="create-page">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <AutocompleteInput onTitleChange={handleTitleChange} />

              <div
                className="form-group2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <label>Username</label>
                <textarea 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  style={{ height: "13px" }}
                ></textarea>

                <div
                  className="Rating"
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Rating:</label>
                  <select
                    value={selectedRating}
                    onChange={(e) =>
                      setSelectedRating(parseInt(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group1" style={{ marginTop: "20px" }}>
                <label>Review</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  id="bodyTextarea"
                  style={{ fontSize: "16px" }}
                ></textarea>
              </div>

              <div className="button-group">
                {!isPending ? (
                  <button className="CreateReview-btn">Add Review</button>
                ) : (
                  <button className="CreateReview-btn" disabled>
                    Adding Review...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
