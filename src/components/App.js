import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Main } from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  function handleAddPlaceSubmit(newCardData) {
    api.addNewCard(newCardData.name, newCardData.link).then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    });
  }
  //
  function handleUpdateAvatar(newAvatarLink) {
    api.setUserAvatar(newAvatarLink).then((newUserData) => {
      setCurrentUser(newUserData);
      setIsEditAvatarPopupOpen(false);
    });
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData.name, userData.about).then((newUserData) => {
      setCurrentUser(newUserData);
      setIsEditProfilePopupOpen(false);
    });
  }

  const [cards, setCards] = useState([]);

  function handleCardDeleteClick(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((elem) => card._id !== elem._id));
    });
  }

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

  const fetchData = async () => {
    try {
      const [cards, user] = await Promise.all([
        api.getInitialCards(),
        api.getUserInfo(),
      ]);
      setCurrentUser(user);
      setCards(cards);
    } catch (err) {
      console.log('Ошибка запроса начальных данных:', err);
    }
  };

  useEffect(() => {
    fetchData();
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
    // setIsEditProfilePopupOpen(false);
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

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

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
