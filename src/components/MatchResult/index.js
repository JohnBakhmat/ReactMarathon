import { useState, useEffect } from 'react';
import s from './style.module.css';
import YouWin from './assets/you-win.png';
import YouLose from './assets/you-lose.png';
import Draw from './assets/draw.png';

const MatchResult = ({ type }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'Won':
        setUrl(YouWin);
        break;
      case 'Lost':
        setUrl(YouLose);
        break;
      case 'Draw':
        setUrl(Draw);
        break;
      default:
        setUrl(YouWin);
    }
  }, [type]);

  return (
    <div className={s.result}>
      <img src={url} alt="result" />
    </div>
  );
};

export default MatchResult;
