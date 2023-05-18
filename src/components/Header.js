import headerLogo from '../image/header__logo.svg';
import { Link } from 'react-router-dom';

export default function Header({
  location,
  loggedIn,
  handleLogOut,
  userEmail,
}) {
  console.log(location);
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
      <nav className="navigation">
        {loggedIn ? (
          <>
            <span className="navigation__user-info">{userEmail}</span>
            <p onClick={handleLogOut} className="navigation__link">
              Выход
            </p>
          </>
        ) : (
          <Link
            to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}
            // onClick={toggleeNavigationText}
            className="navigation__link"
          >
            {location.pathname === '/sign-up' ? 'Выход' : 'Регистрация'}
          </Link>
        )}
      </nav>
    </header>
  );
}
