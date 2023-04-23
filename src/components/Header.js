import headerLogo from "../image/header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
    </header>
  );
}
