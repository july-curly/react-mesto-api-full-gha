import { useContext } from "react";
import Card from "../Card/Card.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, cards, onCardLike}) {
  const currentUser = useContext(CurrentUserContext)
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__information">
          <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
            <button className="profile__button-edit" type="button" onClick={onEditProfile}/>
          </div>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}/>
      </section>
      <section className="post">
        {cards.map((data) => {
          return (
            <Card card={data} onCardClick={onCardClick} onCardDelete={onCardDelete} key = {data._id} onCardLike={onCardLike}/>
          )
        })}
      </section>
    </main>
  )
} 

export default Main;