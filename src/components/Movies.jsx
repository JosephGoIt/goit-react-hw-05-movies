import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import useFetch from './hooks/useFetch';
import { usePageContext } from './context/PageContext';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const { setModalData } = usePageContext();
  const { data: searchResults, loading, error } = useFetch(searchUrl);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchUrl(`${IMDB_URL}/3/search/movie?api_key=${IMDB_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
  };

  return (
    <div className="movies">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading movies.</p>}
      <div className="gallery">
        {searchResults && searchResults.results.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} setModalData={setModalData} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
