import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import s from './style.module.css';
const ProfilePage = () => {
  const userData = useSelector(selectUser);

  return (
    <div>
      <h1 className={s.header}>User info</h1>
      <table className={s.table}>
        <thead className={s.row}>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userData).map((item, key) => {
            return (
              <tr key={key} className={s.row}>
                <td>{item[0]}</td>
                <td>{JSON.stringify(item[1])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
