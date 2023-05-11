import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

export default function EditAvatarPopup({
  isOpen,
  closeAllPopups,
  onUpdateAvatar,
  isLoading,
}) {
  function hadleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(newAvatarInput.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      newAvatarInput.current.value = '';
      errorMessage.current.textContent = '';
      newAvatarInput.current?.addEventListener('input', handleChangeInput);
    }
    return () => {
      newAvatarInput.current?.removeEventListener('input', handleChangeInput);
    };
  }, [isOpen]);

  const newAvatarInput = useRef();
  const errorMessage = useRef();

  function handleChangeInput() {
    console.log(newAvatarInput.current.validationMessage);
    console.log(errorMessage);
    errorMessage.current.textContent = newAvatarInput.current.validationMessage;
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-image-edit"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={hadleSubmit}
      isLoading={isLoading}
    >
      <input
        ref={newAvatarInput}
        placeholder="Ссылка на картинку"
        className="popup__input popup__description"
        type="url"
        name="avatar"
        required
      />
      <span
        ref={errorMessage}
        className="popup__input-error-message avatar-input-error"
      ></span>
    </PopupWithForm>
  );
}
