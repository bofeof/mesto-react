import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

import ImagePopup from '../components/ImagePopup';
import PopupWithForm from '../components/PopupWithForm';
import PopupConfirm from '../components/PopupConfirm';

import EditProfilePopup from '../components/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

// first run: get data about gallery and user
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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setCardZoomPopupOpen(false);
    setSelectedCard({});
  }

  function onUserUpdate(userData){
    api.setUserData(userData)
    .then((userData)=>{
      setCurrentUser(userData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function onAvatarUpdate(avatarLink){
    api.changeUserAvatar(avatarLink)
    .then((userData) =>{
      setCurrentUser(userData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function onCardCreate(cardData){
    api.addPhotoCard(cardData)
    .then((newCard) => {
      setCards((prevCards)=>{
        return [newCard, ...prevCards]
      })
    })
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
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={onUserUpdate}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={onAvatarUpdate}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={onCardCreate}/>



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
