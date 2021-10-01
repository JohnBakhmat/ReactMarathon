import s from './style.module.css';
const FormField = ({
  label,
  name = 'a',
  type,
  setState,
  isRequired = false,
}) => {
  const handleChange = (event) => {
    setState &&
      setState((prevState) => ({
        ...prevState,
        [label]: event.target.value,
      }));
  };
  return (
    <div className={s.root}>
      <input
        type={type}
        className={s.input}
        required={isRequired}
        onChange={handleChange}
      />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>{label}</label>
    </div>
  );
};
export default FormField;
