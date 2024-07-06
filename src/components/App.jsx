import React, { useState, useEffect } from 'react';
import axios from 'axios';
import throttle from 'lodash.throttle';
import './App.css';
import { genres } from './genres';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import LoadMore from './LoadMore'; // Import the LoadMore component
import ScrollToTop from './ScrollToTop';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';
const MOVIES_PER_PAGE = 20;

export function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [functionCaller, setFunctionCaller] = useState(0);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 300));
    return () => window.removeEventListener('scroll', throttle(handleScroll, 300));
  }, []);

  const fetchMovies = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchTrendingMovies = async () => {
    const url = `${IMDB_URL}/3/trending/movie/day?api_key=${IMDB_API_KEY}&page=${currentPage}`;
    const data = await fetchMovies(url);
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const searchMovies = async () => {
    const url = `${IMDB_URL}/3/search/movie?api_key=${IMDB_API_KEY}&query=${query}&language=en-US&page=${currentPage}&include_adult=false`;
    const data = await fetchMovies(url);
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFunctionCaller(1);
    setCurrentPage(1);
    searchMovies();
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    let url = '';
    if (functionCaller === 0) {
      url = `${IMDB_URL}/3/trending/movie/day?api_key=${IMDB_API_KEY}&page=${nextPage}`;
    } else {
      url = `${IMDB_URL}/3/search/movie?api_key=${IMDB_API_KEY}&query=${query}&language=en-US&page=${nextPage}&include_adult=false`;
    }

    const data = await fetchMovies(url);
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
  };

  const handleScroll = () => {
    const scrollToTopEl = document.querySelector('.scroll-to-top');
    if (window.scrollY > 100) {
      scrollToTopEl.classList.remove('scroll-to-top--hidden');
    } else {
      scrollToTopEl.classList.add('scroll-to-top--hidden');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <div className="gallery">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} setModalData={setModalData} />
          ))}
        </div>
        {modalData && <MovieModal movie={modalData} setModalData={setModalData} />}
        <LoadMore currentPage={currentPage} totalPages={totalPages} onLoadMore={handleLoadMore} />
        <ScrollToTop />
      </main>
    </div>
  );
}

// export default App;
