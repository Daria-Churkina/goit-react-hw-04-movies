import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as api from '../../services/api';
import Status from '../../services/status';
import PendingView from '../PendingView/PendingView';
import ErrorView from '../ErrorView/ErrorView';
import noImageAvailable from '../../images/noImageAvailable.svg';
import s from '../HomeView/HomeView.module.css';
import Typical from 'react-typical';

function HomeView() {
  const [trending, setTrending] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();

  useEffect(() => {
    setStatus(Status.pending);
    api
      .fetchTrendingMovies()
      .then(({ results }) => {
        setTrending(results);
        setStatus(Status.resolved);
      })
      .catch(error => {
        console.log(error);
        setError('Please try again.');
        setStatus(Status.rejected);
      });
  }, []);

  return (
    <div className={s.mainContainer}>
      <header className={s.title}>
        <Typical
          wrapper="p"
          steps={[
            'Trending',
            1000,
            'Trending today',
            1000,
            'Trending movies today',
            1000,
          ]}
          loop={3}
        />
      </header>
      {status === Status.pending && <PendingView />}

      {status === Status.rejected && <ErrorView message={error.message} />}

      {status === Status.resolved && (
        <>
          <ul className={s.list}>
            {trending.map(movie => (
              <li key={movie.id} className={s.item}>
                <Link to={`${url}movies/${movie.id}`} className={s.link}>
                  <img
                    className={s.image}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noImageAvailable
                    }
                    alt={movie.title}
                  />
                  <p className={s.movieTitle}>{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default HomeView;
