import s from "./styles.module.css";
import Logo from "../../Logo/index";
import cn from "classnames";
const NavBar = ({ isActive, onChangeActivity }) => {
  const handleClick = () => {
    onChangeActivity && onChangeActivity();
  };
  return (
    <nav className={s.root} onClick={handleClick}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          <Logo />
          LOGO
        </p>
        <a
          href="#home"
          className={cn(s.menuButton, { [s.active]: isActive === true })}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};
export default NavBar;
