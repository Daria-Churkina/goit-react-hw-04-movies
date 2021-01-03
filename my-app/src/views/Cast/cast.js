import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCast } from '../../services/api';
import noImageAvailable from '../../images/noImageAvailable.svg';
import s from '../Cast/Cast.module.css';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(request => setCast(request.cast));
  }, [movieId]);

  return (
    <div>
      {cast.length > 0 && (
        <ul className={s.list}>
          {cast.map(actor => (
            <li key={actor.id} className={s.listItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : noImageAvailable
                }
                alt={actor.original_name}
                className={s.image}
              />
              <h4>{actor.original_name}</h4>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
