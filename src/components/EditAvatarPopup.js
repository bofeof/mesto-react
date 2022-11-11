import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useEffect, useRef, useContext } from 'react';

export default function EditAvatarPopup({ isOpen, onClose, onSubmit, buttonSubmitName}) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [isOpen]);

  function handleAvatarSubmit(evt) {
    evt.preventDefault();
    onSubmit({ avatar: avatarRef.current.value });
    onClose();
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonSubmitName={buttonSubmitName}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAvatarSubmit}
    >
      <>
        <input
          className="popup__input popup__input_form_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          id="url-input-avatar"
          required="required"
          ref={avatarRef}
        />

        <span className="popup__input-error url-input-avatar-error"></span>
      </>
    </PopupWithForm>
  );
}
