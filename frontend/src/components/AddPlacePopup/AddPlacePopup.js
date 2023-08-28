import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({title: values.title, link: values.link}, reset);
  } 

  function resetOnClose() {
    onClose();
    reset()
  }

  return(
    <PopupWithForm title='Новое место' name='post' buttonText='Создать' isOpen={isOpen} onClose={resetOnClose} onSubmit={handleSubmit} isValid={isValid}>
      <input
        id="post-title"
        className={`popup__input popup__input_type_title ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_error'}`} 
        type="text"
        required
        name="title"
        tabIndex={1}
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={values.title ?? ''}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_title" id="post-title-error">{errors.title}</span>
      <input
        id="post-img"
        className={`popup__input popup__input_type_link ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_error'}`}
        type="url"
        required
        name="link"
        tabIndex={2}
        placeholder="Ссылка на картинку"
        value={values.link ?? ''}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_link" id="post-img-error">{errors.link}</span>
    </PopupWithForm>
  )
}