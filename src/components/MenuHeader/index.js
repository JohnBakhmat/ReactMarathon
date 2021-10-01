import { useState } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Modal from '../../components/Modal';
import LoginForm from '../LoginForm';
import { userSignUp, userLogin } from '../../services/firebase';
import { NotificationManager } from 'react-notifications';
const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const [isModalActive, setModalActive] = useState(false);
  const [modalTitle, setModalTitle] = useState('Login');

  const handleActivity = () => {
    setActive(!isActive);
  };
  const handleClickLogin = () => {
    setModalActive((prevState) => !prevState);
  };
  const handleSubmitLogin = (values) => {
    console.log(values);
    if (modalTitle === 'Login') {
      userLogin(values)
        .then(({ data }) => {
          NotificationManager.success('Success');
          localStorage.setItem('idToken', data.idToken);
        })
        .catch((error) => {
          console.dir(error.response.data.error.message);
          NotificationManager.error(error.response.data.error.message, 'Title');
        });
    } else if (modalTitle === 'Register') {
      userSignUp(values)
        .then(({ data }) => {
          NotificationManager.success('Success');
          localStorage.setItem('idToken', data.idToken);
        })
        .catch((error) => {
          console.dir(error.response.data.error.message);
          NotificationManager.error(error.response.data.error.message, 'Title');
        });
    }
  };
  return (
    <>
      <Menu isActive={isActive} onChangeActivity={handleActivity} />
      <NavBar
        isActive={isActive}
        bgActive={bgActive}
        onClickHamburger={handleActivity}
        onClickLogin={handleClickLogin}
      />
      <Modal
        onCloseModal={handleClickLogin}
        title={modalTitle}
        isOpen={isModalActive}
      >
        <LoginForm
          onSubmitForm={handleSubmitLogin}
          setModalTitle={setModalTitle}
        />
      </Modal>
    </>
  );
};
export default MenuHeader;
