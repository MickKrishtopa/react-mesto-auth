import headerLogo from '../image/header__logo.svg';
import { Link } from 'react-router-dom';

export default function Header({
  location,
  loggedIn,
  handleLogOut,
  userEmail,
}) {
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
          <>
            {location.pathname === '/sign-in' && (
              <Link to="/sign-up" className="navigation__link">
                Регистрация
              </Link>
            )}
            {location.pathname === '/sign-up' && (
              <Link to="/sign-in" className="navigation__link">
                Вход
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
