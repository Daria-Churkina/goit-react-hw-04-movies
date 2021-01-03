import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import noImageAvailable from '../../images/noImageAvailable.svg';
import Cast from '../Cast/cast';
import Reviews from '../Reviews/reviews';
import PendingView from '../PendingView/PendingView';
import s from '../MovieDetailView/MovieDetailView.module.css';

function MovieDetailView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    if (!location.state) {
      history.push('/');
      return;
    }
    history.push({ ...location.state.from });
  };

  return (
    <>
      <div className={s.main}>
        <button className={s.button} type="button" onClick={onGoBack}>
          <span className={s.label}>Back to movies</span>
        </button>

        <div className={s.wrapper}>
          <img
            className={s.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : noImageAvailable
            }
            alt={movie.title && movie.original_name}
          />
          <div className={s.description}>
            <h2 className={s.title}>{movie.title}</h2>
            <span className={s.subtitle}>Rating </span>
            <span>{movie.vote_average}</span>
            <p className={s.subtitle}>Overview</p>
            <p>{movie.overview}</p>
            <span className={s.subtitle}>Release: </span>
            <span>{movie.release_date}</span>
            <span className={s.subtitleRuntime}>Runtime: </span>
            <span>{movie.runtime}min</span>

            {movie.genres && (
              <>
                <p className={s.subtitle}>Genres</p>
                <ul className={s.list}>
                  {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </>
            )}
            {movie.production_countries && (
              <>
                <p className={s.subtitle}>Production countries</p>
                <ul className={s.list}>
                  {movie.production_countries.map(country => (
                    <li key={country.iso_3166_1}>{country.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <ul className={s.navigation}>
          <li>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: location.state ? location.state.from : '/' },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: location.state ? location.state.from : '/' },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Suspense fallback={<PendingView />}>
          <Switch>
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default MovieDetailView;
