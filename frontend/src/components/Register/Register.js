import {Link} from 'react-router-dom';
import useFormValidation from '../../utils/useFormValidation';

export default function Register( {name, handleRegister} ){

  const { values, handleChange } = useFormValidation()

  function onRegister(evt) {
    evt.preventDefault();
    handleRegister(values.email, values.password)
  }

  return(
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" action="#" name={name} noValidate onSubmit={onRegister}>
        <input
        id={`${name}__email`}
        className={`sign__input sign__input_type_email`} 
        type="email"
        required
        name="email"
        tabIndex={1}
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        />
        <input
        id={`${name}__password`}
        className={`sign__input sign__input_type_password`}
        type="password"
        required
        name="password"
        tabIndex={2}
        minLength={6}
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        />
        <button className="sign__submit" type="submit" tabIndex={3}>Зарегистрироваться</button>
      </form>
      <p className='sign__register'>Уже зарегистрированы?<Link className='sign__register' to="signin"> Войти</Link></p>
    </div>
  )
}