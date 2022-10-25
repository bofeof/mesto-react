import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function App() {
    const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);

    function handleEditProfileClick() {

        setEditProfileClick(true);
        setAddPlaceClick(false);
        setEditAvatarClick(false);

        document.querySelector(".popup_type_edit-user").classList.add("popup_opened");
    }

    function handleEditAvatarClick() {
        setEditProfileClick(false);
        setAddPlaceClick(false);
        setEditAvatarClick(true);

        document.querySelector(".popup_type_change-avatar").classList.add("popup_opened");
    }

    function handleAddPlaceClick() {
        setEditProfileClick(false);
        setAddPlaceClick(true);
        setEditAvatarClick(false);
        document.querySelector(".popup_type_create-card").classList.add("popup_opened");
    }

    return (
        <div className="page page-content">
            <Header />

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                isOpen
            />

            <Footer />

            {/* <!-- phoptocard template --> */}
            <template id="photocard" className="photocard">
                <li className="gallery__item">
                    <button
                        type="button"
                        className="gallery__remove-button"></button>
                    <img
                        className="gallery__item-photo"
                        src="#"
                        alt="Фотография"
                    />
                    <div className="gallery__item-description">
                        <h2 className="gallery__item-name"></h2>

                        <div className="gallery__like-container">
                            <button
                                type="button"
                                className="gallery__like-button"></button>
                            <div className="gallery__like-counter">0</div>
                        </div>
                    </div>
                </li>
            </template>

        </div>
    );
}
