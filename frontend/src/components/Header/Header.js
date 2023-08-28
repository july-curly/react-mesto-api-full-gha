import logo from '../../images/logo.svg';
import { Link, Route, Routes } from "react-router-dom";

function Header({ email, handleSignOut }) {
  function onSignOut() {
    handleSignOut();
  }

  return (
    <header className="header">
      <img
      className="logo"
      src={logo}
      alt="Лого проекта Место"
      />
      <Routes>
        <Route path={'/sign-in'} element={
          <Link className="header__link" to="/sign-up">Регистрация</Link> 
        }/>
        <Route path={'/sign-up'} element={
          <Link className="header__link" to="/sign-in">Войти</Link>
        }/>
        <Route path="/" element={
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Link className="header__link header__link_signout" to="/sign-in" onClick={onSignOut}>Выйти</Link>
          </div>
        }/> 
      </Routes>
    </header>
    )
  }
  
export default Header;