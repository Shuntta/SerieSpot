import "../assets/styles/MySeries.css";

const MySeries = () => {
  return (
    <div className="tudo">
      <span className="watchedText">Watched</span>
      <div className="containerWatched">
        <div className="movie" id="movie1" />
        <div className="movie" id="movie2" />
        <div className="movie" id="movie3" />
        <div className="movie" id="movie4" />
      </div>
    </div>
  );
};

export default MySeries;
