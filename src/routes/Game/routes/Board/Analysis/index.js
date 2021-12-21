import styles from './style.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectGameLog } from '../../../../../store/board';
const Analysis = () => {
  return (
    <div className={styles['root']}>
      <h1>Analitics</h1>
      <Log>4123</Log>
    </div>
  );
};

export const Log = () => {
  const gameLog = useSelector(selectGameLog);

  return (
    <div>
      <h3>Game Log</h3>
      <ul>
        {gameLog.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Analysis;
