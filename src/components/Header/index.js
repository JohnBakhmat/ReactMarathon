import s from "./style.module.css";
import {useHistory} from 'react-router-dom';

const Header = ({ title, descr, onRedirect }) => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/game')
  }
  return (
    <header className={s.root}>
      
      <div className={s.forest}/>
      <div className={s.silhouette}/>
      <div className={s.moon}/>

      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={handleRedirect}>Get Started</button>
      </div>
    </header>
  );
};

export default Header;
