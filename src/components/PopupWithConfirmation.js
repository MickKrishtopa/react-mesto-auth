export default function PopupWithConfirmation(props) {
  function handleConfirmationClick(e) {
    e.preventDefault();
    props.onDeleteClick(props.removeCard);
  }

  const buttonText = props.isLoading ? 'Удаление...' : 'Да';
  return (
    <div
      className={`popup popup_type_delete-card ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <form className="popup__container">
        <button
          onClick={props.closeAllPopups}
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        ></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button
          onClick={handleConfirmationClick}
          type="submit"
          className="popup__button popup__button_enabled"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
