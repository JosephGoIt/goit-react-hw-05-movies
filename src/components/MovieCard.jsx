import React from 'react';

const MovieCard = ({ movie, setModalData }) => {
  const handleClick = () => {
    setModalData(movie);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        className="card_img"
        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="card_title">
        {movie.title} <br />
        <span className="card_text">
          {movie.release_date}
        </span>
      </p>
    </div>
  );
};

export default MovieCard;
