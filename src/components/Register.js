export default function Register() {
  // const buttonText = isLoading ? 'Сохранение...' : 'Зарегистрироваться';

  return (
    <div className="authorization">
      <form onSubmit="" className="authorization__form">
        <h2 className="authorization__title">Регистрация</h2>
        <input
          placeholder="Email"
          className="authorization__input authorization__email"
          type="email"
          name="email"
          required
        />
        <span className="authorization__input-error-message email-input-error"></span>
        <input
          placeholder="Password"
          className="authorization__input authorization__password"
          type="password"
          name="password"
          required
        />
        <span className="authorization__input-error-message password-input-error"></span>

        <button
          type="submit"
          className="authorization__button authorization__button_enabled"
        >
          Зарегистрироваться
        </button>
        <span className="authorization__caption">
          Уже зарегистрированы? Войти
        </span>
      </form>
    </div>
  );
}
