import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

import ImagePopup from '../components/ImagePopup';
import PopupWithForm from '../components/PopupWithForm';
import PopupConfirm from '../components/PopupConfirm';

import { API } from '../utils/API.js';
import { configAPI } from '../utils/constants.js';

import { useEffect, useState } from 'react';

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardZoomPopupOpen, setCardZoomPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [user, setUser] = useState({});

  const api = new API(configAPI);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardZoomPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);

    setCardZoomPopupOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    Promise.all([api.getGalleryData(), api.getUserData()])
      .then(([cardsData, userData]) => {
        // user
        setUser(userData);

        // cards
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <div className="page page-content">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        /** gallery data from server */
        cards={cards}
        /** card for zoom */
        card={selectedCard}
        user={user}
      />

      {/* Popups */}
      {/* edit user */}
      <PopupWithForm
        name="edit-user"
        title="Редактировать профиль"
        buttonSubmitName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* inputs */}
        <>
          <input
            className="popup__input popup__input_form_name"
            type="text"
            name="name"
            id="username-input"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required="required"
          />
          <span className="popup__input-error username-input-error"></span>

          <input
            className="popup__input popup__input_form_job"
            type="text"
            name="about"
            id="jobinfo-input"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required="required"
          />
          <span className="popup__input-error jobinfo-input-error"></span>
        </>
      </PopupWithForm>

      {/* change avatar */}
      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        buttonSubmitName="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__input popup__input_form_avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            id="url-input-avatar"
            required="required"
          />

          <span className="popup__input-error url-input-avatar-error"></span>
        </>
      </PopupWithForm>

      {/*  create photocard */}
      <PopupWithForm
        name="create-card"
        title="Новое место"
        buttonSubmitName="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            className="popup__input popup__input_form_photoname"
            type="text"
            name="name"
            id="photoname-input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required="required"
          />
          <span className="popup__input-error photoname-input-error"></span>

          <input
            className="popup__input popup__input_form_photolink"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            id="url-input"
            required="required"
          />
          <span className="popup__input-error url-input-error"></span>
        </>
      </PopupWithForm>

      {/* open img card */}
      <ImagePopup card={selectedCard} isOpen={isCardZoomPopupOpen} onClose={closeAllPopups} />

      {/* remove data/confirmation */}
      <PopupConfirm title="Вы уверены?" buttonSubmitName="Да" isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />

      <Footer />
    </div>
  );
}