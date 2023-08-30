import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import { useEffect, useState } from 'react';
import CurrentUserContext from '../context/CurrentUserContext.js'
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from './InfoTooltip/InfoTooltip.js'
import { register, authorize, checkToken } from '../utils/auth.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import DeleteCardPopup from './DeleteCardPopup/DeleteCardPopup.js';
import Main from './Main/Main.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [trashPopupOpen, setTrashPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
 
  const[currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false)
  const navigate = useNavigate()

  function handleCardDelete(cardId) {
    setTrashPopupOpen(true)
    setDeleteCardId(cardId)
  } 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false)
    setTrashPopupOpen(false)
    setInfoTooltipOpen(false)
  }

  function handleDeleteClick() {
    api.deleteCard(deleteCardId, localStorage.jwt)
    .then(()=>{
      setCards((state) => state.filter(item => {
        return item._id !== deleteCardId
      }))
      closeAllPopups()
    })
    .catch((error) => {
      console.error(`Ошибка удаления карточки ${error}`);
    })
  }

  function handleUpdateUser(data) {
    api.setInfo(data, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.error(`Ошибка редактирования профиля ${error}`);
      })
  } 

  function handleUpdateAvatar(data) {
    api.setAvatar(data, localStorage.jwt)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((error) => {
      console.error(`Ошибка редактирования аватара ${error}`);
    })
  }

  function handleAddPlaceSubmit(data, reset) {
    api.setCard(data, localStorage.jwt)
    .then(res => {
      setCards([res, ...cards])
      closeAllPopups()
      reset()
    })
    .catch((error) => {
      console.error(`Ошибка создания карточки ${error}`);
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([api.getInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards)
        })
        .catch((error) => {
          console.error(`Ошибка получения данных профиля ${error}`)
        })
    }
  }, [isAuthenticated])

  // useEffect(() =>{
  //   Promise.all([api.getInfo(), api.getInitialCards()])
  //     .then(([user, cards]) => {
  //       setCurrentUser(user)
  //       setCards(cards)
  //     })
  //     .catch((error) => {
  //       console.error(`Ошибка получения данных профиля ${error}`)
  // })}, [])

  function handleRegister(email, password) {
    register(email, password)
      .then(() =>{
        setInfoTooltipOpen(true)
        setIsSuccessInfoTooltipStatus(true)
        navigate('/sign-in')
      })
      .catch((error) => {
        setInfoTooltipOpen(true)
        setIsSuccessInfoTooltipStatus(false)
        console.error(`Ошибка регистрации ${error}`)
      })
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((res) =>{
        localStorage.setItem("jwt", res.token)
        setIsAuthenticated(true)
        setEmail(email)
        navigate('/')
      })
      .catch((error) => {
        setInfoTooltipOpen(true)
        setIsSuccessInfoTooltipStatus(false)
        console.error(`Ошибка входа ${error}`)
      })
  }

  useEffect(() => { 
    if (localStorage.jwt) { 
      checkToken(localStorage.jwt) 
        .then((res) => { 
          setEmail(res.data.email) 
          setIsAuthenticated(true) 
          navigate('/') 
        }) 
        .catch((error) => { 
          console.error(`Ошибка последующего входа ${error}`) 
        }) 
    } else { 
      setIsAuthenticated(false) 
    }   
  }, [])

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    setEmail('');
    navigate('/sign-in');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error)=> { 
        console.error(`Ошибка лайка ${error}`) 
      })
    ;
  } 
   
  return (
    <CurrentUserContext.Provider value={currentUser}> 
      <div className="page__container">
        <Header email={email} handleSignOut={handleSignOut}/>
        <Routes>
          <Route path="/" 
            element={ <ProtectedRoute
            element={Main}
            onEditProfile={handleEditProfileClick} 
            onEditAvatar={handleEditAvatarClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            cards={cards}
            isAuthenticated={isAuthenticated}
            onCardLike={handleCardLike}
            />} 
          />
          <Route path='/sign-in/*' element={ 
            <>
              <Login name={'signin'} handleLogin={handleLogin}/>
            </>
          }/>
          <Route path='/sign-up' element={
            <>
              <Register name={'signup'} handleRegister={handleRegister}/>
            </>
          }/>
          
          <Route path='*' element={<Navigate to='/' replace/>}/>
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser = {handleUpdateUser}/>
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace = {handleAddPlaceSubmit}/>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar = {handleUpdateAvatar}/>
        <DeleteCardPopup 
          isOpen={trashPopupOpen} 
          onClose={closeAllPopups} 
          onDeleteCard={handleDeleteClick}
          card={selectedCard}/>
        <ImagePopup 
          card={selectedCard} 
          isOpen={isImagePopupOpen} 
          onClose={closeAllPopups}/>
        <InfoTooltip 
        isOpen={isInfoTooltipOpen} 
        onClose={closeAllPopups} 
        isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
