import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './Components/AppBar/AppBar';
import Container from './Components/Container/Container';
import PendingView from './views/PendingView/PendingView';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView' /* webpackChunkName: "HomeView" */),
);
const MoviesPageView = lazy(() =>
  import(
    './views/MoviesPageView/MoviesPageView' /* webpackChunkName: "MoviesPageView" */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView' /* webpackChunkName: "NotFoundView" */
  ),
);
const MovieDetailView = lazy(() =>
  import(
    './views/MovieDetailView/MovieDetailView' /* webpackChunkName: "MovieDetailView" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<PendingView />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route path="/movies" exact>
            <MoviesPageView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
