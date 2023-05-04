// import React from "react";
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Main } from './Main';

function App() {
  //

  function handleCardDeleteClick(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((elem) => card._id !== elem._id));
    });
  }
  const [cards, setCards] = useState([]);
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(
      (cardLikes) => cardLikes._id === currentUser._id
    );

    api.toggleCardLike(card._id, isLiked).then((newCard) => {
      setCards((state) =>
        state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
      );
    });
  }

  const [currentUser, setCurrentUser] = useState(null);
  const fetchUserInfo = async () => {
    try {
      const [user] = await Promise.all([api.getUserInfo()]);
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = useState(null);
  function handleCardImageClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardImageClick={handleCardImageClick}
        onCardLikeClick={handleCardLikeClick}
        cards={cards}
        setCards={setCards}
        onCardDeleteClick={handleCardDeleteClick}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile-edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          placeholder="Введите имя"
          className="popup__input popup__name"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          required
        />
        <span className="popup__input-error-message name-input-error"></span>
        <input
          placeholder="Введите род деятельности"
          className="popup__input popup__description"
          type="text"
          minLength="2"
          maxLength="200"
          name="description"
          required
        />
        <span className="popup__input-error-message description-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="element"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__element-name"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          name="title"
          required
        />
        <span className="popup__input-error-message title-input-error"></span>
        <input
          className="popup__input popup__element-llink"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
        />
        <span className="popup__input-error-message link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="profile-image-edit"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          placeholder="Ссылка на картинку"
          className="popup__input popup__description"
          type="url"
          name="avatar"
          required
        />
        <span className="popup__input-error-message avatar-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="popup popup_type_delete-card">
        <form className="popup__container">
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть окно"
          ></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__button popup__button_enabled">
            Да
          </button>
        </form>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
