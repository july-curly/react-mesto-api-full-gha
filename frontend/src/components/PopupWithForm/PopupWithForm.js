import Popup from "../Popup/Popup";

function PopupWithForm ({title, name, buttonText, isOpen, onClose, children, onSubmit, isValid=true}) {
  return(
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
       <h2 className={`popup__title ${name === 'delete-card' && 'popup__title_form-delete'}`}>{title}</h2>
        <form className="popup__form form-profile" action="#" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button className={`popup__save ${isValid ? '' : 'popup__save_disabled'}`} type="submit" tabIndex={3} disabled={!isValid}>{buttonText}</button>
        </form>
    </Popup>
  )
}

export default PopupWithForm;