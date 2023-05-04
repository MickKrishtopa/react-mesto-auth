import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : ''
  } `;

  function handleLikeClick() {
    props.onCardLikeClick(props.card);
  }

  function handleImageClick() {
    props.onCardImageClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDeleteClick(props.card);
  }

  return (
    <li className="card">
      {isOwn ? (
        <button
          onClick={handleDeleteClick}
          className="card__delete"
          aria-label="Удалить"
        ></button>
      ) : null}
      <img
        onClick={handleImageClick}
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        className="card__image"
      />
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-area">
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label="Лайк"
        ></button>
        <span className="card__like-counter">{props.card.likes.length}</span>
      </div>
    </li>
  );
}
