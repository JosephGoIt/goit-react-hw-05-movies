import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from './hooks/useFetch';

const IMDB_API_KEY = '9d52264b8376313698d7d20c165a8537';
const IMDB_URL = 'https://api.themoviedb.org';

const Reviews = () => {
  const { movieId } = useParams();
  const reviewsUrl = `${IMDB_URL}/3/movie/${movieId}/reviews?api_key=${IMDB_API_KEY}`;
  const { data: reviews, loading, error } = useFetch(reviewsUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div className="reviews">
      <h3>Reviews</h3>
      {reviews.results.length > 0 ? (
        <ul>
          {reviews.results.map(review => (
            <li key={review.id}>
              <p><strong>{review.author}</strong>: {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No review yet</p>
      )}
    </div>
  );
};

export default Reviews;
