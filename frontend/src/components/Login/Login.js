import useFormValidation from "../../utils/useFormValidation"

export default function Login({name, handleLogin}) {

  // {errors, isValid, isInputValid,}

  const { values, handleChange } = useFormValidation() 

  function onLogin(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password)
  }

  return(
    <div className="sign">
      <h2 className="sign__title">Войти</h2>
      <form className="sign__form" action="#" name={name} noValidate onSubmit={onLogin}>
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
        <button className="sign__submit" type="submit" tabIndex={3}>Вход</button>
      </form>
    </div>
  )
}