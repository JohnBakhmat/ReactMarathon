import s from "./styles.module.css";
import cn from "classnames";
const Menu = ({ isActive, onRedirect }) => {
  const handleRedirect = (path) => {
    onRedirect && onRedirect(path);
  };
  const handleHomeClick = () => {
    handleRedirect("home");
  };
  const handleGameClick = () => {
    handleRedirect("game");
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
          <li>
            <a href="#home" onClick={handleHomeClick}>
              HOME
            </a>
          </li>
          <li>
            <a href="#game" onClick={handleGameClick}>
              GAME
            </a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
