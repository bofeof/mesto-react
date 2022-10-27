export default function PopupConfirm({ title, buttonSubmitName, isOpen, onClose }) {
    return (
      <div className={`popup popup_confirm ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={onClose}></button>
          <div className="popup__form popup__form_confirm">
            <h3 className="popup__form-header popup__form-header_confirm">{title}</h3>
            <button className="popup__button popup__submit-button popup__save-button" type="submit" name="confirm">
              {buttonSubmitName}
            </button>
          </div>
        </div>
      </div>
    );
  }
  