import userAvatarImg from '../images/avatar.jpg';
import userEditInfoIcon from '../images/edit/edit-avatar.png';

import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm';
import PopupConfirm from './PopupConfirm';

import Card from './Card';

export default function Main(props) {


    return (
        <>
            <main className="content">

                <section className="user">

                <div className="user__avatar-container user__avatar-editor" onClick={props.onEditAvatar}>
                    <img
                    className="user__avatar"
                    src={userAvatarImg}
                    alt="Фото пользователя"
                    />
                    <div className="user__avatar-overlay">
                    <img className = "user__avatar-icon" src={userEditInfoIcon} alt="Иконка редактирования аватара" />
                    </div>
                </div>

                <div className="user__info">
                    <div className="user__header">
                    <h1 className="user__name">Жак-Ив Кусто</h1>
                    <button type="button" className="user__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="user__job">Французский исследователь Мирового океана</p>
                </div>
                <button className="user__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>

                {/* gallery */}
                <section aria-label="Галлерея мест">
                <ul className="gallery">
                    {
                        props.cards.map((card) => {
                            return (
                                <li className="gallery__item" key = {card._id}>
                                    <Card card = {card} onCardClick = {props.onCardClick} />
                                </li>
                            )
                        })
                    }
                </ul>
                </section>

                {/* Popups */}
                {/* edit user */}
                <PopupWithForm name='edit-user' title='Редактировать профиль' isOpen={props.isEditProfilePopupOpen} onClose = {props.onClose}>
                    {<>
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
                    </>}
                </PopupWithForm>

                {/* change avatar */}
                <PopupWithForm name = 'change-avatar' title = 'Обновить аватар' isOpen={props.isEditAvatarPopupOpen} onClose = {props.onClose}>
                    {
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

                    }
                </PopupWithForm>

                {/*  create photocard */}
                <PopupWithForm name = 'create-card' title = 'Новое место' isOpen={props.isAddPlacePopupOpen} onClose = {props.onClose}>

                    {
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
                    }

                </PopupWithForm>

                {/* open img card */}
                <ImagePopup name = 'zoom-img' card = {props.card} isOpen = {props.isCardZoonPopupOpen} onCLose = {props.onClose}/>
                    
                {/* remove data/confirmation */}
                <PopupConfirm onCLose = {props.onClose} />

            </main>
        </>
    )
}
