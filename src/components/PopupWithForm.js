export default function PopupWithForm (props) {


    return (
        <div className= {`popup popup_type_${props.name}`}>
        <div className="popup__container">
            <button type="button" className="popup__close-button"></button>
            <div className="popup__form">
                <h3 className="popup__form-header">{props.title}</h3>

                <form name={`${props.name}`} className="popup__form-inputs" noValidate>
                    
                    {/* inputs */}
                    {props.children}

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

    )
}