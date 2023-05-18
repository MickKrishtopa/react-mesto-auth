import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Login({ onSubmit, toggleeNavigationText }) {
  // const buttonText = isLoading ? 'Сохранение...' : 'Зарегистрироваться';

  const [formValue, setformValue] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({});

  const handleChangeInput = (event) => {
    setformValue({ ...formValue, [event.target.name]: event.target.value });
    setErrorMessage({
      ...errorMessage,
      [event.target.name]: event.target.validationMessage,
    });
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    onSubmit(email, password);
  };

  return (
    <div className="authorization">
      <form onSubmit={handleSubmite} className="authorization__form">
        <h2 className="authorization__title">Вход</h2>
        <input
          placeholder="Email"
          className="authorization__input authorization__email"
          type="email"
          name="email"
          required
          value={formValue.email}
          onChange={handleChangeInput}
        />
        <span className="authorization__input-error-message email-input-error">
          {errorMessage.email}
        </span>
        <input
          placeholder="Password"
          className="authorization__input authorization__password"
          type="password"
          name="password"
          required
          value={formValue.password}
          onChange={handleChangeInput}
        />
        <span className="authorization__input-error-message password-input-error"></span>

        <button
          type="submit"
          className="authorization__button authorization__button_enabled"
        >
          Войти
        </button>
        <span className="authorization__caption">
          Еще не зарегистрированы?{' '}
          <Link className="authorization__caption" to="/sign-up">
            Регистрация
          </Link>
        </span>
      </form>
    </div>
  );
}
