export default function Card (props) {

    function handleZoomClick(){
        props.onCardClick(props.card)
    }

    return(
        <>
            <button
                type="button"
                className="gallery__remove-button"></button>
            <img
                className="gallery__item-photo"
                src={props.card.link}
                alt= {props.card.name}
                onClick = {handleZoomClick}
            />
            <div className="gallery__item-description">
                <h2 className="gallery__item-name">{props.card.name}</h2>

                <div className="gallery__like-container">
                    <button
                        type="button"
                        className="gallery__like-button"></button>
                    <div className="gallery__like-counter">{props.card.likes.length}</div>
                </div>
            </div>
        </>

    )

}