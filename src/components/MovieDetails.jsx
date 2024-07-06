import React from 'react';
// import { Link, useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import { usePageContext } from './context/PageContext';
import styles from './MovieDetails.module.css';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { setModalData } = usePageContext();
  const movieDetailsUrl = `${IMDB_URL}/3/movie/${movieId}?api_key=${IMDB_API_KEY}&append_to_response=credits,reviews`;
  const { data: movie, loading, error } = useFetch(movieDetailsUrl);
  const navigate = useNavigate();
//   const location = useLocation();

  React.useEffect(() => {
    if (movie) {
      setModalData(movie);
    }
  }, [movie, setModalData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie details.</p>;

  const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';

  const handleGoBack = () => {
    const moviesState = JSON.parse(localStorage.getItem('moviesState'));
    if (moviesState) {
      const { query, currentPage } = moviesState;
      navigate(`/movies?query=${query}&page=${currentPage}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.movieDetails}>
        <div className={styles.btnOverview}>
            <div className={styles.btnImg}>
                <button className={styles.goBack} onClick={handleGoBack}>Go Back</button>
                <img className={styles.movieImg} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className={styles.movieOverview}>
                <h2>{movie.title}</h2>
                {/* <p>Vote: {movie.vote_average}</p> */}
                {/* <p>Votes: {movie.vote_count}</p> */}
                <p>Popularity: {movie.popularity}</p>
                {/* <p>Original Title: {movie.original_title}</p> */}
                <h4>Genres:</h4>
                <p>{genres}</p>
                <h4>Overview:</h4>
                <p>{movie.overview}</p>
                <h4>Release Date:</h4>
                <p>{movie.release_date}</p>
            </div>
        </div>
        <nav className={styles.castNav}>
            <h4>Additional Information</h4>
            <Link to="cast">Cast</Link>
            <br></br>
            <Link to="reviews">Reviews</Link>
        </nav>
        <div className={styles.castNavOutlet}>
            <Outlet />
        </div>
    </div>
  );
};

export default MovieDetails;
