import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
//import CurrentUserContext from "../../context/CurrentUserContext.js";
import { useRef } from "react";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar( {avatar: input.current.value});
  } 

  return(
    <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={isValid} >
      <input
        ref={input}
        id="avatar"
        className={`popup__input popup__input_type_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_error'}`}
        type="url"
        required
        name="avatar"
        tabIndex={1}
        placeholder="Ссылка на картинку"
        value={values.avatar ? values.avatar : ''}
        onChange={handleChange}
      />
      <span
        className="popup__error popup__error_type_avatar"
        id="avatar-error"
      >{errors.avatar}</span>
    </PopupWithForm>
  )
}