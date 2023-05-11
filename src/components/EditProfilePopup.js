import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  closeAllPopups,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    name: '',
    about: '',
  });
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (isOpen) {
      setUserData({ name: currentUser.name, about: currentUser.about });
      setErrorMessage({});
    }
  }, [currentUser, isOpen]);

  function onChangeInput(e, name) {
    setUserData({ ...userData, [name]: e.target.value });
    setErrorMessage({ ...errorMessage, [name]: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(userData);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        placeholder="Введите имя"
        className="popup__input popup__name"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        required
        value={userData.name}
        onChange={(e) => onChangeInput(e, 'name')}
      />
      <span className="popup__input-error-message name-input-error">
        {errorMessage.name}
      </span>
      <input
        placeholder="Введите род деятельности"
        className="popup__input popup__description"
        type="text"
        minLength="2"
        maxLength="200"
        name="description"
        required
        value={userData.about || ''}
        onChange={(e) => onChangeInput(e, 'about')}
      />
      <span className="popup__input-error-message description-input-error">
        {errorMessage.about}
      </span>
    </PopupWithForm>
  );
}
