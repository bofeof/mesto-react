export default function PopupConfirm() {

    return (

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

    )

}