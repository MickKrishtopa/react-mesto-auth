import { useState, useEffect } from "react";
import api from "../utils/api.js";
import Card from "./Card.js";

export default function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const fetchData = async () => {
    try {
      const [user, cards] = await Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ]);
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      setCards(cards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   api.getInitialCards().then((res) => {
  //     console.log(res);
  //     setCards(res);
  //     console.log("cards:", cards);
  //   });
  // }, []);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__button-edit-photo">
          <img
            src={userAvatar}
            alt="Фото пользователя"
            className="profile__photo"
          />
        </button>

        <div className="profile__area">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit"
              aria-label="Изменить профиль"
            ></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__add-botton"
            aria-label="Добавить фото"
          ></button>
        </div>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
