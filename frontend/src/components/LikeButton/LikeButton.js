export default function LikeButton({ cardLikes, onCardLike, isLike, card }) {

  return (
    <div className="post__like-container">
      <button className={`post__like ${isLike && 'post__like_active'}`} type="button" onClick={() => onCardLike(card)}/>
      <div className="post__like-sum">{cardLikes.length}</div>
    </div>
  )
}

 //const [isLike, setLike] = useState(false)
 // const [count, setCount] = useState(cardLikes.length)
  
  // function handleLikeClick() {
  //   if(isLike) {
  //     api.deleteLike(cardId)
  //       .then(res => {
  //         setLike(false)
  //         setCount(res.likes.length)
  //       })
  //       .catch((error) => {
  //         console.error(`Ошибка удаления лайка ${error}`)
  //       })
  //   }
  //   else {
  //     api.addLike(cardId)
  //       .then(res => {
  //         setLike(true)
  //         setCount(res.likes.length)
  //       })
  //       .catch((error) => {
  //         console.error(`Ошибка постановки лайка ${error}`)
  //       }) 
  //   }
  // }

  // useEffect(() => {
  //   setLike(cardLikes.some((item) => userId === item._id))
  // },[cardLikes, userId])
