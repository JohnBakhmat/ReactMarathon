import s from './style.module.css';
const LoginForm = () => {
  return (
    <div className={s.root}>
      <input type="email" className={s.input} required />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>Email</label>
    </div>
  );
};
export default LoginForm;
