import { useState } from "react";
import Menu from "./Menu";
import NavBar from "./NavBar";
const MenuHeader = ({ onRedirect, bgActive }) => {
  const [isActive, setActive] = useState(null);
  const handleActivity = () => {
    setActive(!isActive);
  };
  const handleRedirect = (path) => {
    onRedirect && onRedirect(path);
  };

  return (
    <>
      <Menu
        isActive={isActive}
        onChangeActivity={handleActivity}
        onRedirect={handleRedirect}
      />
      <NavBar isActive={isActive} bgActive={bgActive} onChangeActivity={handleActivity} />
    </>
  );
};
export default MenuHeader;
