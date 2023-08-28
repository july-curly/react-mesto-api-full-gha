import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import CurrentUserContext from "../../context/CurrentUserContext.js";
import { useContext, useEffect } from "react";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const { values, errors, isValid, isInputValid, handleChange, setValue } = useFormValidation()
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setValue("username", currentUser.name)
    setValue("aboutme", currentUser.about)
  }, [currentUser, setValue, isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, aboutme: values.aboutme});
  } 

  return(
    <PopupWithForm title='Редактировать профиль' name='profile' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} isValid={isValid} onUpdateUser={onUpdateUser} onSubmit={handleSubmit}>
      <input
        id="profile-name"
        className={`popup__input popup__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_error'}`} 
        type="text"
        required
        name="username"
        tabIndex={1}
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        onChange={handleChange}
        value={values.username ? values.username : ''}
      />
      <span id="profile-name-error" className="popup__error popup__error_type_username">{errors.username}</span>
      <input
        id="profile-aboutme"
        className={`popup__input popup__input_type_aboutme ${isInputValid.aboutme === undefined || isInputValid.aboutme ? '' : 'popup__input_error'}`} 
        type="text"
        required
        name="aboutme"
        tabIndex={2}
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        onChange={handleChange}
        value={values.aboutme ? values.aboutme : ''}
      />
      <span className="popup__error popup__error_type_aboutme" id="profile-aboutme-error">{errors.aboutme}</span>
    </PopupWithForm>
  )
}