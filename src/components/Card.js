export default function Card({ card, onCardClick }) {
    function handleZoomClick() {
      onCardClick(card);
    }
  
    return (
      <>
        <button type="button" className="gallery__remove-button"></button>
        <img className="gallery__item-photo" src={card.link} alt={card.name} onClick={handleZoomClick} />
        <div className="gallery__item-description">
          <h2 className="gallery__item-name">{card.name}</h2>
          <div className="gallery__like-container">
            <button type="button" className="gallery__like-button"></button>
            <div className="gallery__like-counter">{card.likes.length}</div>
          </div>
        </div>
      </>
    );
  }
  