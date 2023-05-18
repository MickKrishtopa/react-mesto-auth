import headerLogo from '../image/header__logo.svg';

export default function Header({ loggedIn, handleLogOut, userEmail }) {
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
        ) : null}
      </nav>
    </header>
  );
}
