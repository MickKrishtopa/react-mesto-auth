import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onAddPlace, closeAllPopups }) {
  const [newCardName, setNewCardName] = useState('');
  const [newCardLink, setNewCardLink] = useState('');

  function onChangeNewCardName(evt) {
    setNewCardName(evt.target.value);
  }

  function onChangeNewCardLink(evt) {
    setNewCardLink(evt.target.value);
  }

  function handleSubmite(e) {
    e.preventDefault();
    onAddPlace({
      name: newCardName,
      link: newCardLink,
    });
  }

  useEffect(() => {
    if (isOpen) {
      return () => {
        setNewCardName('');
        setNewCardLink('');
      };
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="element"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmite}
    >
      <input
        className="popup__input popup__element-name"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        name="title"
        required
        onChange={onChangeNewCardName}
        value={newCardName}
      />
      <span className="popup__input-error-message title-input-error"></span>
      <input
        className="popup__input popup__element-llink"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        onChange={onChangeNewCardLink}
        value={newCardLink}
      />
      <span className="popup__input-error-message link-input-error"></span>
    </PopupWithForm>
  );
}
