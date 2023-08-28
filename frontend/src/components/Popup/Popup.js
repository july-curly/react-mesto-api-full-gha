function Popup ({name, isOpen, onClose, children }) {
  return(
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}/>
          {children}
      </div>
    </div>
  )
}

export default Popup;