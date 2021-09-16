import { useState } from "react";
import Menu from "./Menu";
import NavBar from "./NavBar";
const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const handleActivity = () => {
    setActive(!isActive);
  };

  return (
    <>
      <Menu isActive={isActive} onChangeActivity={handleActivity} />
      <NavBar
        isActive={isActive}
        bgActive={bgActive}
        onChangeActivity={handleActivity}
      />
    </>
  );
};
export default MenuHeader;
