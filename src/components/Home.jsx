import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import LoadMore from './LoadMore';
import useFetch from './hooks/useFetch';
import { usePageContext } from './context/PageContext';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setModalData } = usePageContext();
  const trendingUrl = `${IMDB_URL}/3/trending/movie/day?api_key=${IMDB_API_KEY}&page=${currentPage}`;
  const { data: trendingMovies, loading, error } = useFetch(trendingUrl);
//   const navigate = useNavigate();

  useEffect(() => {
    if (trendingMovies) {
      setTotalPages(trendingMovies.total_pages);
    }
  }, [trendingMovies]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return (
    <div className="home">
      <div className="gallery">
        {trendingMovies.results.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`} state={{ from: '/' }}>
            <MovieCard movie={movie} setModalData={setModalData} />
          </Link>
        ))}
      </div>
      <LoadMore currentPage={currentPage} totalPages={totalPages} onLoadMore={handleLoadMore} />
    </div>
  );
};

export default Home;
