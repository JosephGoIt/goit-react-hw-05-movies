import React from 'react';
import MovieCard from './MovieCard';

const Search = ({ query, setQuery, handleSearch, searchResults, setModalData, loading, error }) => {
  return (
    <div className="search">
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
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} setModalData={setModalData} />
        ))}
      </div>
    </div>
  );
};

export default Search;
