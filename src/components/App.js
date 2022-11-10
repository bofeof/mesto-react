import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

import ImagePopup from '../components/ImagePopup';
import PopupWithForm from '../components/PopupWithForm';
import PopupConfirm from '../components/PopupConfirm';

import EditProfilePopup from '../components/EditProfilePopup'

import {CurrentUserContext} from '../contexts/CurrentUserContext';

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

  const [currentUser, setCurrentUser] = useState({});

  const api = new API(configAPI);

// first run
  useEffect(() => {
    Promise.all([api.getGalleryData(), api.getUserData()])
      .then(([cardsData, userData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);


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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((prevStateCards) => 
      prevStateCards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  } 

  function handleCardDelete(card){
    api.removePhotoCard(card._id)
    .then(() => {
      setCards((prevGallery) => prevGallery.filter((prevCard) => prevCard._id !== card._id))
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUserSubmit(userData){

    api.setUserData(userData)
    .then((userData)=>{
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setCardZoomPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page page-content">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onClose={closeAllPopups}
            /** gallery data from server */
            cards={cards}
            /** card for zoom */
            card={selectedCard}
          />

          {/* Popups */}
          {/* edit user */}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUserSubmit}/>

        

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
      </>
    </CurrentUserContext.Provider>
  );
}
