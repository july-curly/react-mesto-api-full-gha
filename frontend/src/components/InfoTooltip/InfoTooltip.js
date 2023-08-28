import Popup from "../Popup/Popup";
import successImage from '../../images/success.svg';
import unsuccessImage from '../../images/unsuccess.svg';

export default function InfoTooltip ({isOpen, isSuccessInfoTooltipStatus, onClose}) {
  return(
    <Popup isOpen={isOpen} onClose={onClose} name={'info'}>
      <img className="popup__info-img" src={isSuccessInfoTooltipStatus ? successImage : unsuccessImage} alt="Сообщение"/>
      <h2 className="popup__info-title">{isSuccessInfoTooltipStatus ? "Вы успешно зарегистрировались!": "Что-то пошло не так! Попробуйте ещё раз."}</h2>
    </Popup>
  )
}