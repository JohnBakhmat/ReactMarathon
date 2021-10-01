import { useState } from 'react';
import FormField from '../FormField';
import s from './style.module.css';

const LoginForm = () => {
  const [user,setUser] = useState({Email:'',Password:''})  

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.dir(user)

    //TODO надо придумать как юзать value вместо Reset
    document.querySelector('form').reset()
    setUser({})
  }

  return (
    <form onSubmit={handleSubmit} className={s.root}>
      <FormField label="Email" type="text" isRequired setState={setUser}/>
      <FormField label="Password" type="password" isRequired setState={setUser}/>
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
