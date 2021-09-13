import s from "./style.module.css";
const Header = ({ title, descr, onRedirect }) => {
  const handleRedirect=()=>{
    onRedirect && onRedirect('game')
  }
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={handleRedirect}>Get Starter</button>
      </div>
    </header>
  );
};
export default Header;
