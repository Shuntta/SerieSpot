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


  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("bodyTextarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaInput = (e) => {
    setBody(e.target.value);
    adjustTextareaHeight(); // Ajusta a altura da textarea
  };

  useEffect(() => {
    adjustTextareaHeight();// Ajuste de altura dos inputs, igual ao código fornecido
  }, [title, author, body]);

  

  const handleTitleChange = (newTitle, newAuthor, newMovieId) => {
    setTitle(newTitle);
    setAuthor(newAuthor);
    setMovieId(newMovieId); // Define o movieId
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = { title, body, author, movieId, rating: selectedRating }; // Inclui movieId no objeto review
    console.log("Review Object:", review);

    setIsPending(true);

    fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then(() => {
      console.log("new review added");
      setIsPending(false);
      navigate(`/SerieHub/${movieId}`);
    });
  };

  return (
    <div className="container flex-container">
      <div className="left" style={{ height: "auto"}}>
        <input
          type="titulo--preview"
          disabled
          value={title}
          className="titulo-input"
          id="tituloInput"
          style={{
            width:"100%",
            backgroundColor:"rgba(0, 0, 0, 0)",
            borderColor:"black"
            
          }}
        />
        <input
          type="author-preview"
          disabled
          value={author}
          className="author-input"
          id="authorInput"
          style={{
            marginBottom:"15px",
            width:"40%"
            
            
          }}
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
          style={{
            marginTop:"10px",
            fontSize: "15px",
            verticalAlign: "top",
            height:"auto"
            
            
          }}
        />
        <label
          style={{
            fontSize: "15px",
            lineHeight: "3",
            verticalAlign: "top"
            
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
            fontSize: "12px",
            padding:"15px",
            color:"white"
            
          }}
        />
      </div>

      <div className="vertical-line"></div>

      <div className="right">
        <div className="create-page">
          <div className="form">
            <label>Review</label>
            
              <form onSubmit={handleSubmit}>
              <AutocompleteInput className="Searchreview" onTitleChange={handleTitleChange} />
              
              <div
                className="form-group2"
                style={{ display: "flex", 
                alignItems: "center",
                marginLeft: "-10px"}}
              >
                <label style={{paddingTop:"10px"}}>Username</label>
                <textarea
                  required  
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  style={{ height: "20px", paddingTop: "20px", resize:"none", marginRight:"50px"}}
                ></textarea>

                <div
                  className="Rating"
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px", paddingTop:"10px" }}>Rating:</label>
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

              <div className="form-group1" style={{ marginTop: "20px" , width: "100%"}}>
                <label>Review</label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 400) {
                      setBody(text);
                    } else {
                      setBody(text.slice(0, 400));
                    }
                  }}
                  id="bodyTextarea"
                  style={{ fontSize: "16px", resize:"none" }}
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
