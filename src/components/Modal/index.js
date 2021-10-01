import s from './style.module.css';
import cn from 'classnames';
import { useEffect, useRef } from 'react';

const Modal = ({ title, children, isOpen, onCloseModal }) => {
  const modalElement = useRef();

  const handleCloseModal = () => {
    onCloseModal && onCloseModal();
  };
  const handleClickRoot = (event) => {
    if (!modalElement.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
  }, [isOpen]);

  return (
    <div
      className={cn(s.root, { [s.open]: isOpen })}
      onMouseDown={handleClickRoot}
    >
      <div className={s.modal} ref={modalElement}>
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
