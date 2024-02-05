import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ReviewDetails = () => {
    const { id } = useParams();
    const { data: review, error, isPending, rating } = useFetch(`http://localhost:8000/reviews/${id}`);
    const navigate = useNavigate();  // Substitua useHistory por useNavigate

    const handleClick = () => {
        fetch(`http://localhost:8000/reviews/${review.id}`, {
            method: "DELETE"
        }).then(() => {
            navigate("/");
        });
    };

    return (
        <div className="review-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {review && (
                <article>
                    <h2>{review.title}</h2>
                    <p>Written by {review.author}</p>
                    <div>{review.body}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
};

export default ReviewDetails;
