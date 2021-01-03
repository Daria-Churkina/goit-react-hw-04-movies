import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMoviesWithQuery } from '../../services/api';
import Status from '../../services/status';
import PendingView from '../PendingView/PendingView';
import ErrorView from '../ErrorView/ErrorView';
import SearchForm from '../../Components/SearchForm/searchForm';
import noImageAvailable from '../../images/noImageAvailable.svg';
import s from '../MoviesPageView/MoviesPageView.module.css';

function MoviesPageView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get('query') ?? '',
  );
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    setStatus(Status.pending);
    fetchMoviesWithQuery(query)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`for ${query}!`);
          setStatus(Status.rejected);
          return;
        }
        setMovies(results);
        setStatus(Status.resolved);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(Status.rejected);
      });
  }, [query]);

  const onSearch = querySearch => {
    if (query === querySearch) return;
    setQuery(querySearch);
    history.push({ ...location, search: `query=${querySearch}` });
  };

  return (
    <div className={s.mainContainer}>
      <SearchForm onSearch={onSearch} />

      {status === Status.pending && <PendingView />}

      {status === Status.rejected && <ErrorView message={error} />}

      {status === Status.resolved && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : noImageAvailable
                  }
                  alt={movie.title}
                  className={s.image}
                />
              </Link>
              <span className={s.title}>{movie.title} </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPageView;
