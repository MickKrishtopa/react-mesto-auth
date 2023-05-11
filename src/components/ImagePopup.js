export default function ImagePopup(props) {
  function handleClickOutside(e) {
    if (e.target.className.includes('popup ')) {
      props.onClose();
    }
  }

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      className={`popup popup_big-photo ${props.card ? 'popup_opened' : ''}`}
    >
      <figure className="popup__figure">
        <button
          type="button"
          className="popup__close popup__close-big-photo"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img
          src={props?.card?.link}
          alt={props?.card?.name}
          className="popup__photo"
        />
        <figcaption className="popup__photo-name">
          {props?.card?.name}
        </figcaption>
      </figure>
    </div>
  );
}
