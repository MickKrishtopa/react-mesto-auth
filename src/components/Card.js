export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card" key={props.card._id}>
      <button className="card__delete" aria-label="Удалить"></button>
      <img
        onClick={handleClick}
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        className="card__image"
      />
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-area">
        <button className="card__like-button" aria-label="Лайк"></button>
        <span className="card__like-counter">{props.card.likes.length}</span>
      </div>
    </li>
  );
}
