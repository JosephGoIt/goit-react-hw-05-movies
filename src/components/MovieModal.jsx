import React from 'react';
import closeBtnIcon from './images/symbol-defs.svg';

const MovieModal = ({ movie, setModalData }) => {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    release_date,
  } = movie;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const handleClose = () => {
    setModalData(null);
  };

  return (
    <div className="film-modal">
      <button className="button-close" type="button" onClick={handleClose}>
        <svg className="icon-close">
          <use href={`${closeBtnIcon}#icon-close`}></use>
        </svg>
      </button>
      <img className="film__image" src={posterUrl} alt="Film Image" />
      <article>
        <div className="film__content">
          <h2 className="film__title">{title}</h2>
          <ul className="film-info">
            <li className="film-info__item">
              <p className="film-info__label">Vote / Votes</p>
              <div className="film-vote">
                <span className="film-vote__label film-vote__label--orange">{vote_average}</span>
                <span>/</span>
                <span className="film-vote__label">{vote_count}</span>
              </div>
            </li>
            <li className="film-info__item">
              <p className="film-info__label">Popularity</p>
              <span className="film-info__text">{popularity}</span>
            </li>
            <li className="film-info__item">
              <p className="film-info__label">Original Title</p>
              <span className="film-info__text film-info__text--uppercase">
                {original_title}
              </span>
            </li>
            <li className="film-info__item">
              <p className="film-info__label">Genre</p>
              <span className="film-info__text">
                {genres.map(genre => genre.name).join(', ')}
              </span>
            </li>
          </ul>
          <div className="film-description">
            <h3 className="film-description__title">About</h3>
            <p className="film-description__text">{overview}</p>
          </div>
        </div>
        <ul className="film-button">
          <li className="film-button__item">
            <button className="film-button__primary" type="button">
              Add to Watched
            </button>
          </li>
          <li className="film-button__item">
            <button className="film-button__primary" type="button">
              Add to Queue
            </button>
          </li>
        </ul>
      </article>
    </div>
  );
};

export default MovieModal;
