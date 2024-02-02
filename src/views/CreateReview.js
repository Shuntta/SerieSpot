import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import AutocompleteInput from "../components/AutocompleteInput";
import "../assets/styles/CreateReview.css";

const CreateReview = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(1);

  useEffect(() => {
    const adjustHeight = (element) => {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };

    const titleInput = document.getElementById("tituloInput");
    const authorInput = document.getElementById("authorInput");
    const bodyTextarea = document.getElementById("bodyTextarea");

    if (titleInput) {
      adjustHeight(titleInput);
    }

    if (authorInput) {
      adjustHeight(authorInput);
    }

    if (bodyTextarea) {
      adjustHeight(bodyTextarea);
    }
  }, [title, author, body]);

  const handleTitleChange = (newTitle, newAuthor) => {
    setTitle(newTitle);
    setAuthor(newAuthor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = { title, body, author, rating: selectedRating };
    console.log("Review Object:", review);

    setIsPending(true);

    fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then(() => {
      console.log("new review added");
      setIsPending(false);
      navigate("/"); // Alteração aqui
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
                  required  
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
                  required
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
