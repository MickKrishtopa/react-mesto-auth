import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

export default function EditAvatarPopup({
  isOpen,
  closeAllPopups,
  onUpdateAvatar,
}) {
  function hadleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(newAvatarInput.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      return () => {
        console.log('Close popUp Avatar');
        newAvatarInput.current.value = '';
      };
    }
  }, [isOpen]);

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
