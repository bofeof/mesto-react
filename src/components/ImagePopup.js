export default function ImagePopup(){

    return(
        <>
            <div className="popup popup_zoom_img popup_type_zoom-img">
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
        </>
    )

}