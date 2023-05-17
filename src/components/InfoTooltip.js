import success from '../image/Success.svg';
import fail from '../image/Fail.svg';

export default function InfoTooltip(props) {
  // const buttonText = props.isLoading ? 'Удаление...' : 'Да';
  return (
    <div className={`popup  popup_type_fetch-info `}>
      <form className="popup__container">
        <button
          // onClick={props.closeAllPopups}
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        ></button>

        <img className="popup__info-img" src={success}></img>
        <span className="popup__fetch-message">
          Вы успешно зарегистрировались!
        </span>
      </form>
    </div>
  );
}
