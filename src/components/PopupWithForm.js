export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form
        onSubmit={onSubmit}
        className="popup__container popup__container-profile"
        name={name}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__close popup__close-profile"
          aria-label="Закрыть окно"
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__button popup__button_enabled">
          Сохранить
        </button>
      </form>
    </div>
  );
}
