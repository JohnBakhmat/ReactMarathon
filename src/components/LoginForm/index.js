import { useState } from 'react';
import FormField from '../FormField';
import s from './style.module.css';


const LoginForm = ({ onSubmitForm, setModalTitle, onGoogleLogin }) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [buttonLabels, setButtonLabels] = useState({
    primary: 'Login',
    secondary: 'Register',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitForm && onSubmitForm(user);
    //TODO надо придумать как юзать value вместо Reset
    document.querySelector('form').reset();
    setUser({});
  };
  const handleSecondaryClick = (event) => {
    setModalTitle((prevState) =>
      prevState === 'Login' ? 'Register' : 'Login'
    );
    setButtonLabels((prevState) => ({
      primary: prevState.secondary,
      secondary: prevState.primary,
    }));
  };

  const handleGoogleLogin = ()=>{
    onGoogleLogin && onGoogleLogin();
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <FormField label="email" type="text" isRequired setState={setUser} />
      <FormField
        label="password"
        type="password"
        isRequired
        setState={setUser}
      />
      <div className={s.action}>
        <button className={s.primary} type="submit">
          {buttonLabels.primary}
        </button>
        <button className={s.primary} type="button" onClick={handleGoogleLogin}>
          Google
        </button>
        <button
          className={s.secondary}
          type="button"
          onClick={handleSecondaryClick}
        >
          {buttonLabels.secondary}?
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
