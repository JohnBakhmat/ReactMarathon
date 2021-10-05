import { useState } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Modal from '../../components/Modal';
import LoginForm from '../LoginForm';
import { userSignUp, userLogin, postPokemons } from '../../services/firebase';
import { NotificationManager } from 'react-notifications';
import { getStartingDeck } from '../../services/zarApiService';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync, removeUser } from '../../store/user';
import { useHistory } from 'react-router';

const MenuHeader = ({ bgActive }) => {
  const history = useHistory()
  const [isActive, setActive] = useState(null);
  const [isModalActive, setModalActive] = useState(false);
  const [modalTitle, setModalTitle] = useState('Login');
  const dispatch = useDispatch()
  const handleActivity = () => {
    setActive(!isActive);
  };
  const handleClickLogin = () => {
    setModalActive((prevState) => !prevState);
  };
  const handleClickUserIcon = ()=>{
    history.push('/user')
  }
  const handleClickLogout = ()=>{
    localStorage.removeItem('idToken')
    dispatch(removeUser())
    history.replace('/')
  }
  const handleSubmitLogin = (values) => {
    console.log(values);
    if (modalTitle === 'Login') {
      userLogin(values)
        .then(({ data }) => {
          NotificationManager.success('Success');
          localStorage.setItem('idToken', data.idToken);
          dispatch(getUserUpdateAsync())
        })
        .catch((error) => {
          console.dir(error.response.data.error.message);
          NotificationManager.error(error.response.data.error.message, 'Title');
        });
    } else if (modalTitle === 'Register') {
      userSignUp(values)
        .then(({ data }) => {
          const idToken = data.idToken;
          const localId = data.localId;
          NotificationManager.success('Success');
          localStorage.setItem('idToken', idToken);

          getStartingDeck().then((response) => {
            console.dir(response.data.data);
            postPokemons(response.data.data, localId, idToken)
          });
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
        onClickUserIcon={handleClickUserIcon}
        onClickLogout={handleClickLogout}
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
