import s from "./styles.module.css";
import cn from "classnames";
import {Link} from 'react-router-dom'
const Links = [
  {
    label: 'HOME',
    to:'/'
  },
  {
    label: 'GAME',
    to:'/game'
  },
  {
    label: 'ABOUT',
    to:'/about'
  },
  {
    label: 'CONTACTS',
    to:'/contacts'
  }
]

const Menu = ({ isActive,onChangeActivity }) => {
  const handleClick = () => {
    onChangeActivity && onChangeActivity();
  };

  return (
    <div
      className={cn(s.menuContainer, {
        [s.active]: isActive === true,
        [s.deactive]: isActive === false,
      })}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {
          Links.map(({label,to},index)=>(
            <li key={index}>
              <Link to={to} onClick={handleClick}>
                {label}
              </Link>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Menu;
