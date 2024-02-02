  import "../assets/styles/MySeries.css";

  const MySeries = () => {
    return (
      <div className="tudoMySeries">
        <div className="containerMySeries">
          <div className="containerWatched">
            <span className="watchedText">Watched</span>
            <div className="mySeriesMovie" id="movie1" />
            <div className="mySeriesMovie" id="movie2" />
            <div className="mySeriesMovie" id="movie3" />
            <div className="mySeriesMovie" id="movie4" />
          </div>

          <div className="containerLiked">
            <span className="watchedText">Like</span>
            <div className="mySeriesMovie" id="movie1" />
            <div className="mySeriesMovie" id="movie2" />
            <div className="mySeriesMovie" id="movie3" />
            <div className="mySeriesMovie" id="movie4" />
          </div>

          <div className="containerToWatch">
            <span className="watchedText">ToWatch</span>
            <div className="mySeriesMovie" id="movie1" />
            <div className="mySeriesMovie" id="movie2" />
            <div className="mySeriesMovie" id="movie3" />
            <div className="mySeriesMovie" id="movie4" />
          </div>
        </div>
      </div>
    );
  };

  export default MySeries;
