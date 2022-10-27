export default function PopupWithForm(props) {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>
          <div className="popup__form">
            <h3 className="popup__form-header">{props.title}</h3>
  
            <form name={`${props.name}`} className="popup__form-inputs" noValidate>
              
              {/* inputs area */}
              {props.children}

            </form>
  
            <button className="popup__button popup__submit-button popup__save-button" type="submit" name="save">
              {props.buttonSubmitName}
            </button>
            
          </div>
        </div>
      </div>
    );
  }
  