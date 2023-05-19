import success from '../image/Success.svg';
import fail from '../image/Fail.svg';

export default function InfoTooltip(props) {
  // const buttonText = props.isLoading ? 'Удаление...' : 'Да';

  return (
    <div
      className={`popup  popup_type_fetch-info ${
        props.isOpen ? 'popup_opened' : ''
      } `}
    >
      <form className="popup__container">
        <button
          onClick={props.closeAllPopups}
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        ></button>

        <img
          className="popup__info-img"
          src={props.status === 'success' ? success : fail}
        ></img>
        <span className="popup__fetch-message">{props.message}</span>
      </form>
    </div>
  );
}
