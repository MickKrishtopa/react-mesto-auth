import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  closeAllPopups,
  onUpdateUser,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  function onChangeName(evt) {
    setName(evt.target.value);
  }
  function onChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Введите имя"
        className="popup__input popup__name"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        required
        value={name}
        onChange={onChangeName}
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
        value={description}
        onChange={onChangeDescription}
      />
      <span className="popup__input-error-message description-input-error"></span>
    </PopupWithForm>
  );
}
