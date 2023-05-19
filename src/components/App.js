import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Spinner from './Spinner';
import PopupWithConfirmation from './PopupWithConfirmation';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

import ProtectedRoute from './ProtectedRoute';
import Page404 from './Page404';
import authorization from '../utils/Authorization';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [removeCard, setRemoveCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userEmail, setuserEmail] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [statusInfoTooltip, setStatusInfoTooltip] = useState({
    isOpen: false,
    status: '',
    message: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  function handlePressEsc(e) {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoadingPopup(true);
    api
      .addNewCard(newCardData.name, newCardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((res) => console.log('Ошибка добавления новой карточки!', res))
      .finally(() => setIsLoadingPopup(false));
  }
  //
  function handleUpdateAvatar(newAvatarLink) {
    setIsLoadingPopup(true);
    api
      .setUserAvatar(newAvatarLink)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((res) => console.log('Ошибка обновления аватара!', res))
      .finally(() => setIsLoadingPopup(false));
  }

  function handleUpdateUser(userData) {
    setIsLoadingPopup(true);
    api
      .setUserInfo(userData.name, userData.about)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((res) => console.log('Ошибка обновления данных юзера!', res))
      .finally(() => setIsLoadingPopup(false));
  }

  function handleCardDeleteClick(card) {
    setIsLoadingPopup(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((elem) => card._id !== elem._id));
        setRemoveCard(null);
      })
      .catch((res) => console.log('Ошибка удаления карточки!', res))
      .finally(() => setIsLoadingPopup(false));
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(
      (cardLikes) => cardLikes._id === currentUser._id
    );

    api
      .toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch((res) => console.log('Ошибка лайка карточки!', res));
  }

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
    setIsLoadingCards(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    authorization
      .checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        fetchData();
        setuserEmail(res.data.email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log('Ошибка:', err.status);
      });
  }, []);

  function handleEditAvatarClick() {
    document.addEventListener('keydown', handlePressEsc);
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    document.addEventListener('keydown', handlePressEsc);
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    document.addEventListener('keydown', handlePressEsc);
    setIsAddPlacePopupOpen(true);
  }

  function handleRemovePlaceClick(card) {
    document.addEventListener('keydown', handlePressEsc);
    setRemoveCard(card);
  }

  function handleCardImageClick(card) {
    document.addEventListener('keydown', handlePressEsc);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setRemoveCard(false);
    setStatusInfoTooltip({
      isOpen: false,
      status: '',
      message: '',
    });
    document.removeEventListener('keydown', handlePressEsc);
  }

  function handleRegistrationSubmit(email, password) {
    authorization
      .registration(email, password)
      .then(() => {
        setStatusInfoTooltip({
          isOpen: true,
          status: 'success',
          message: 'Вы успешно зарегистрировались!',
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((res) => res.json())
      .then((res) => {
        console.log('Ошибка регистрации:', res.error);

        setStatusInfoTooltip({
          isOpen: true,
          status: 'error',
          message: res.error,
        });
      });
  }

  function handleLoginSubmit(email, password) {
    authorization
      .login(email, password)
      .then((res) => {
        setLoggedIn(true);
        fetchData();
        setuserEmail(email);
        navigate('/', { replace: true });
        localStorage.setItem('token', res.token);
      })
      .catch((res) => res.json())
      .then((res) => {
        console.log('Ошибка авторизации:', res.message);
        console.log(res.message);
        setStatusInfoTooltip({
          isOpen: true,
          status: 'error',
          message: res.message,
        });
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  if (loggedIn === null) {
    return;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        location={location}
        loggedIn={loggedIn}
        handleLogOut={handleLogOut}
        userEmail={userEmail}
      />
      <Routes>
        <Route
          path="/sign-up"
          element={<Register onSubmit={handleRegistrationSubmit} />}
        ></Route>
        <Route
          path="/sign-in"
          element={<Login onSubmit={handleLoginSubmit} />}
        ></Route>

        <Route
          path="/"
          element={
            <ProtectedRoute
              element={isLoadingCards ? Spinner : Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardImageClick={handleCardImageClick}
              onCardLikeClick={handleCardLikeClick}
              cards={cards}
              onCardDeleteClick={handleRemovePlaceClick}
              loggedIn={loggedIn}
              isLoading={isLoadingCards}
            />
          }
        ></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>

      <Footer />

      <EditProfilePopup
        isLoading={isLoadingPopup}
        isOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isLoading={isLoadingPopup}
        isOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isLoading={isLoadingPopup}
        isOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithConfirmation
        onDeleteClick={handleCardDeleteClick}
        isOpen={removeCard}
        closeAllPopups={closeAllPopups}
        removeCard={removeCard}
        isLoading={isLoadingPopup}
      />
      <InfoTooltip {...statusInfoTooltip} closeAllPopups={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
