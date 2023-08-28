import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function DeleteCardPopup ({ isOpen, onClose, onDeleteCard }) {
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  } 

  return (
    <PopupWithForm 
      title='Вы уверены' 
      name='delete-card' 
      buttonText='Да' 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    />
  );
}