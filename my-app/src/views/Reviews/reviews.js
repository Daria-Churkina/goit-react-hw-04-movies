import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../services/api';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import s from '../Reviews/Reviews.module.css';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(request => setReviews(request.results));
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>
                <ReactReadMoreReadLess
                  charLimit={200}
                  readMoreText={'Read more ▼'}
                  readLessText={'Read less ▲'}
                  readMoreClassName="read-more-less--more"
                  readLessClassName="read-more-less--less"
                >
                  {review.content}
                </ReactReadMoreReadLess>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No reviews was found</h2>
      )}
    </div>
  );
}

export default Reviews;
