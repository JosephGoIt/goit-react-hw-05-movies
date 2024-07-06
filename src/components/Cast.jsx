import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './hooks/useFetch';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const Cast = () => {
  const { movieId } = useParams();
  const castUrl = `${IMDB_URL}/3/movie/${movieId}/credits?api_key=${IMDB_API_KEY}`;
  const { data: credits, loading, error } = useFetch(castUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cast information.</p>;

  return (
    <div className="cast">
      <h3>Cast</h3>
      <ul>
        {credits.cast.map(actor => (
          <li key={actor.cast_id}>
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
