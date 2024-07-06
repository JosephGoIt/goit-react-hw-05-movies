import React from 'react';
import { genres } from './genres'; // Add this import statement

const MovieCard = ({ movie, setModalData }) => {
  const { id, poster_path, title, genre_ids, release_date } = movie;

  const handleClick = () => {
    setModalData(movie);
  };

  const movieGenres = genre_ids.map((id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : '';
  }).join(', ');

  return (
    <div className="card" id={id} onClick={handleClick}>
      <img className="card_img" src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt={title} />
      <p className="card_title">{title} <br />
        <span className="card_text">{movieGenres} | {release_date}</span>
      </p>
    </div>
  );
};

export default MovieCard;
