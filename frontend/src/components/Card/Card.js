import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import LikeButton from "../LikeButton/LikeButton.js";

function Card({ card, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = useContext(CurrentUserContext)
  const isLike = card.likes.some(i => i._id === currentUser._id)
 
  return(
    <div className="post__item">
      {currentUser._id === card.owner._id && <button className="post__del" type="button" onClick={() => {onCardDelete(card._id)}}/>}
      <img className="post__img" alt={card.name} src={card.link} onClick={() => {onCardClick({name: card.name, link: card.link})}} />
      <div className="post__info">
        <h2 className="post__description">{card.name}</h2>
        <LikeButton cardLikes={card.likes} onCardLike={onCardLike} isLike={isLike} card={card}/>
      </div>
    </div> 
  )
}

export default Card