import React from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import { usePageContext } from './context/PageContext';
import styles from './MovieDetails.module.css';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { modalData, setModalData } = usePageContext();
  const movieDetailsUrl = `${IMDB_URL}/3/movie/${movieId}?api_key=${IMDB_API_KEY}&append_to_response=credits,reviews`;
  const { data: movie, loading, error } = useFetch(movieDetailsUrl);

  React.useEffect(() => {
    if (movie) {
      setModalData(movie);
    }
  }, [movie, setModalData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie details.</p>;

  const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';

  return (
    <div className={styles.movieContainer}>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div>
        <h2>{movie.title} ({movie.release_date})</h2>
        {/* <p>Vote: {movie.vote_average}</p> */}
        {/* <p>Votes: {movie.vote_count}</p> */}
        <p>Popularity: {movie.popularity}</p>
        <p>Original Title: {movie.original_title}</p>
        <p>Overview: {movie.overview}</p>
        <p>Genres: {genres}</p>
        {/* <p>Release Date: {movie.release_date}</p> */}
      </div>
      <nav>
        <Link to="cast">Cast</Link>
        <br></br>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
