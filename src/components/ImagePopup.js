export default function ImagePopup(props){
    
    let cardName;
    let cardLink;

    if (props.card) {
        cardName = props.card.name;
        cardLink = props.card.link;
    } else {
        cardName = '';
        cardLink = '';
    }

    return (
        <>
            <div className={props.isOpen ?  `popup popup_zoom_img popup_type_${props.name} popup_opened` : `popup popup_zoom_img popup_type_${props.name}`}>
            <div className="popup__img-container">
                <button type="button" className="popup__close-button" onClick={props.onCLose}></button>
                <div className="popup__img-figure">
                <figure className="popup__img">
                    <img className="popup__img-card" src={cardLink} alt={cardName} />
                    <figcaption className="popup__img-caption">{cardName}</figcaption>
                </figure>
                </div>
            </div>
            </div>
        </>
    );

}