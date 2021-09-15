import s from "./styles.module.css";
import Logo from "../../Logo/index";
import cn from "classnames";
const NavBar = ({ isActive, bgActive=false, onChangeActivity }) => {
  const handleClick = () => {
    onChangeActivity && onChangeActivity();
  };
  return (
    <nav id={s.navbar} className={cn(s.root,{
      [s.bgActive]:bgActive
    })} onClick={handleClick}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          <Logo />
          LOGO
        </p>
        <div
          className={cn(s.menuButton, { [s.active]: isActive === true })}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
