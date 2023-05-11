import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({
  isOpen,
  onAddPlace,
  closeAllPopups,
  isLoading,
}) {
  const [errorMessage, setErrorMessage] = useState({});

  const [newCardData, setNewCardData] = useState({
    name: '',
    link: '',
  });

  function onChangeInput(e, name) {
    setNewCardData({ ...newCardData, [name]: e.target.value });
    setErrorMessage({
      ...errorMessage,
      [name]: e.target.validationMessage,
    });
  }

  function handleSubmite(e) {
    e.preventDefault();
    onAddPlace(newCardData);
  }

  useEffect(() => {
    if (isOpen) {
      setNewCardData({
        name: '',
        link: '',
      });
      setErrorMessage({});
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="element"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmite}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__element-name"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        name="title"
        required
        onChange={(e) => onChangeInput(e, 'name')}
        value={newCardData.name}
      />
      <span className="popup__input-error-message title-input-error">
        {errorMessage.name}
      </span>
      <input
        className="popup__input popup__element-llink"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        onChange={(e) => onChangeInput(e, 'link')}
        value={newCardData.link}
      />
      <span className="popup__input-error-message link-input-error">
        {errorMessage.link}
      </span>
    </PopupWithForm>
  );
}
