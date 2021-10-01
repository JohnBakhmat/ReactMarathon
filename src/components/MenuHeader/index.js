import { useState } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Modal from '../../components/Modal';
import LoginForm from '../LoginForm';

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const [isModalActive, setModalActive] = useState(true);

  const handleActivity = () => {
    setActive(!isActive);
  };
  const handleClickLogin = () => {
    setModalActive((prevState) => !prevState);
  };
  return (
    <>
      <Menu isActive={isActive} onChangeActivity={handleActivity} />
      <NavBar
        isActive={isActive}
        bgActive={bgActive}
        onChangeActivity={handleActivity}
        onClickLogin={handleClickLogin}
      />
      <Modal
        onCloseModal={handleClickLogin}
        title="Login Form"
        isOpen={isModalActive}
      >
        <LoginForm />
      </Modal>
    </>
  );
};
export default MenuHeader;
