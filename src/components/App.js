import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

import {API} from '../utils/API.js';
import {configAPI, userId} from '../utils/constants.js'

import { useEffect, useState } from 'react';


export default function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isCardZoonPopupOpen, setCardZoomPopupOpen] = useState(false);

    const [cards, getCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();

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

    function handleCardClick(card){
        setSelectedCard(card);
        setCardZoomPopupOpen(true);
    }
    

    function closeAllPopups(){
        setEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);

        setCardZoomPopupOpen(false);
        setSelectedCard();
    }


    /**  get current user info, cards from server */
    useEffect(()=>{

        Promise.all([api.getGalleryData()])
        .then(([cardsData]) => {

            // user
            // user.setUserInfo({ name: userData.name, about: userData.about });
            // user.setUserAvatar({ avatar: userData.avatar });
            
            // cards
            getCards(...[], cardsData);

        })
        .catch((err) => console.log(`Ошибка: ${err}`));

    
    }, [])

    return (
        <div className="page page-content">
            <Header />

            <Main

                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onEditAvatar = {handleEditAvatarClick}
                onCardClick = {handleCardClick}

                isEditProfilePopupOpen = {isEditProfilePopupOpen}
                isAddPlacePopupOpen = {isAddPlacePopupOpen}
                isEditAvatarPopupOpen = {isEditAvatarPopupOpen}
                isCardZoonPopupOpen = {isCardZoonPopupOpen}

                onClose = {closeAllPopups}

                /** gallery data from server */ 
                cards = {cards}

                /** card for zoom */ 
                card = {selectedCard}

            />

            <Footer />

        </div>
    );
}
