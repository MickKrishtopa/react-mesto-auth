import headerLogo from '../image/header__logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
      <nav className="navigation">
        <span className="navigation__user-info">Мой емейл</span>
        <p className="navigation__link">Выход</p>
      </nav>
    </header>
  );
}
