import { useState, useEffect, useContext } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const fetchData = async () => {
    try {
      const [cards] = await Promise.all([api.getInitialCards()]);

      setCards(cards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__button-edit-photo">
          <img
            src={currentUser?.avatar}
            alt="Фото пользователя"
            className="profile__photo"
          />
        </button>

        <div className="profile__area">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit"
              aria-label="Изменить профиль"
            ></button>
            <p className="profile__subtitle">{currentUser?.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__add-botton"
            aria-label="Добавить фото"
          />
        </div>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
