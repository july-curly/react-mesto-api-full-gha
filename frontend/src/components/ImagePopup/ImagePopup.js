function ImagePopup({ card, isOpen, onClose }) {

  return (
    <div className= {`popup popup-gallery ${isOpen && 'popup_opened'}`}>
      <div className="popup-gallery__container">
        <button className="popup__close" type="button" onClick={onClose}/>
        <figure className="popup-gallery__figure">
          <img className="popup-gallery__img" alt={card.name} src={card.link}/>
          <figcaption className="popup-gallery__title">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup