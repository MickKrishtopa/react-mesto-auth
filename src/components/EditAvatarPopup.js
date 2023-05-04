import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

export default function EditAvatarPopup({
  isOpen,
  closeAllPopups,
  onUpdateAvatar,
}) {
  function hadleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(newAvatarInput.current.value);
  }

  const newAvatarInput = useRef();

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-image-edit"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={hadleSubmit}
    >
      <input
        ref={newAvatarInput}
        placeholder="Ссылка на картинку"
        className="popup__input popup__description"
        type="url"
        name="avatar"
        required
      />
      <span className="popup__input-error-message avatar-input-error"></span>
    </PopupWithForm>
  );
}
