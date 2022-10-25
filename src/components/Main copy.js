import userAvatarImg from '../images/avatar.jpg';
import userEditInfoIcon from '../images/edit/edit-avatar.png';


function Main(){

    function handleEditProfileClick () {
        document.querySelector('.popup_edit_user').classList.add('popup_opened');
    }
    
    function handleEditAvatarClick () {
        document.querySelector('.popup_change_avatar').classList.add('popup_opened');
    }
    
    function handleAddPlaceClick ()  {
        document.querySelector('.popup_create_card').classList.add('popup_opened');
    }


    return (
        <>
            <main className="content">

            <section className="user">

            <div className="user__avatar-container user__avatar-editor" onClick={handleEditAvatarClick}>
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
                <button type="button" className="user__edit-button" onClick={handleEditProfileClick}></button>
                </div>
                <p className="user__job">Французский исследователь Мирового океана</p>
            </div>
            <button className="user__add-button" type="button" onClick={handleAddPlaceClick}></button>
            </section>

            <section aria-label="Галлерея мест">
            <ul className="gallery"></ul>
            </section>



            <div className="popup popup_edit_user">
                <div className="popup__container">
                    <button type="button" className="popup__close-button"></button>
                    <div className="popup__form">
                    <h3 className="popup__form-header">Редактировать профиль</h3>
                    <form
                        name="userinfo"
                        className="popup__form-inputs popup__form-userinfo"
                        noValidate
                    >
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
                    </form>
                    <button
                        className="popup__button popup__submit-button popup__save-button"
                        type="submit"
                        name="save"
                        >
                        Сохранить
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- create photocard --> */}
            <div className="popup popup_create_card">
            <div className="popup__container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__form">
                <h3 className="popup__form-header">Новое место</h3>
                <form
                    name="photocard"
                    className="popup__form-inputs popup__form-photocard"
                    noValidate
                >
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
                </form>

                <button
                    className="popup__button popup__submit-button popup__save-button"
                    type="submit"
                    name="save"
                    >
                    Создать
                    </button>

                </div>
            </div>
            </div>

            {/* <!-- open img card --> */}
            <div className="popup popup_zoom_img">
            <div className="popup__img-container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__img-figure">
                <figure className="popup__img">
                    <img className="popup__img-card" src="#" alt="Изображение" />
                    <figcaption className="popup__img-caption"></figcaption>
                </figure>
                </div>
            </div>
            </div>

            {/* <!-- remove data/confirmation --> */}
            <div className="popup popup_confirm">
            <div className="popup__container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__form popup__form_confirm">
                <h3 className="popup__form-header popup__form-header_confirm">
                    Вы уверены?
                </h3>
                <button
                    className="popup__button popup__submit-button popup__save-button"
                    type="submit"
                    name="confirm"
                >
                    Да
                </button>
                </div>
            </div>
            </div>

            {/* <!-- change avatar --> */}
            <div className="popup popup_change_avatar">
            <div className="popup__container">
                <button type="button" className="popup__close-button"></button>
                <div className="popup__form">
                <h3 className="popup__form-header">Обновить аватар</h3>
                <form
                    name="avatar"
                    className="popup__form-inputs popup__form-avatar"
                    noValidate
                >
                    <input
                    className="popup__input popup__input_form_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    id="url-input-avatar"
                    required="required"
                    />
                    <span className="popup__input-error url-input-avatar-error"></span>
                </form>

                <button
                    className="popup__button popup__submit-button popup__save-button"
                    type="submit"
                    name="save-avatar"
                    >
                    Сохранить
                    </button>
                    
                </div>
            </div>
            </div>

            </main>
        </>
    )
}

export default Main;