import { NavLink } from 'react-router-dom';
import s from '../Navigation/Navigation.module.css';

function Navigation() {
  return (
    <nav className={s.nav}>
      <NavLink
        exact
        to="/"
        className={s.NavigationLink + ' ' + s.navLink}
        activeClassName={s.NavigationLinkActive}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={s.NavigationLink + ' ' + s.navLink}
        activeClassName={s.NavigationLinkActive}
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
