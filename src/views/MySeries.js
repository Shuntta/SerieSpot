import "../assets/styles/MySeries.css";

const MySeries = () => {
  return (
    <div className="tudo">
      <div className="container">
        <div className="containerWatched">
          <span className="watchedText">Watched</span>
          <div className="movie" id="movie1" />
          <div className="movie" id="movie2" />
          <div className="movie" id="movie3" />
          <div className="movie" id="movie4" />
        </div>

        <div className="containerLiked">
          <span className="watchedText">Like</span>
          <div className="movie" id="movie1" />
          <div className="movie" id="movie2" />
          <div className="movie" id="movie3" />
          <div className="movie" id="movie4" />
        </div>

        <div className="containerToWatch">
          <span className="watchedText">ToWatch</span>
          <div className="movie" id="movie1" />
          <div className="movie" id="movie2" />
          <div className="movie" id="movie3" />
          <div className="movie" id="movie4" />
        </div>
      </div>
    </div>
  );
};

export default MySeries;
