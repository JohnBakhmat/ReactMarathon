import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import { getBoard, playerTurn,gameStart, gameProceed } from '../../../../services/zarApiService';
import PlayerHand from './PlayerHand';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayer,
  setGameStatus,
  getFirstPlayer,
  selectGameStatus,
  setPlayerHand,
} from '../../../../store/board';

import MatchResult from '../../../../components/MatchResult';
import TurnIndicator from '../../../../components/TurnIndicator';
import { selectPokemonsData } from '../../../../store/pokemons';
import { returnBoard } from '../../../../utils';

const winCounter = (board, playerOne, playerTwo) => {
  let handOneCount = playerOne.length;
  let handTwoCount = playerTwo.length;
  board.forEach((item) => {
    if (item.card.possession === 'red') {
      handTwoCount++;
    }
    if (item.card.possession === 'blue') {
      handOneCount++;
    }
  });

  return [handOneCount, handTwoCount];
};

const BoardPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const playerOneHandRedux = useSelector(selectPlayer(1));
  const playerTwoHandRedux = useSelector(selectPlayer(2));
  const pokemonsSelector = useSelector(selectPokemonsData);
  const firstPlayer = useSelector(getFirstPlayer);
  const gameStatus = useSelector(selectGameStatus);

  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  const [turns, setTurns] = useState(0);
  const [board, setBoard] = useState([]);
  const [chosenCard, setChosenCard] = useState(null);
  const [playerTwo, setPlayerTwo] = useState([]);
  const [playerOne, setPlayerOne] = useState([]);
  const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0])

  if (
    !playerOneHandRedux.data.length &&
    !playerTwoHandRedux.data.length &&
    !playerOneHandRedux.isLoading &&
    !playerTwoHandRedux.isLoading
  ) {
    history.replace('/game');
  }
  
  useEffect(() => {
    getBoard().then((resp) => {
      setBoard(resp.data.data);
    });

    gameStart({
      pokemons:Object.values(pokemonsSelector)
    }).then(response=>{
      let data = response.data.data
      
      dispatch(setPlayerHand(2,data,'red'))


      setPlayerTwo(()=>data.map(item =>({
        ...item,
        possession: 'red'
      })))

      
      
    }).catch(error =>{
      console.error(error)
    })
    dispatch(setGameStatus('InProgress'));
    
  }, []);

  useEffect(() => {
    setPlayerOne(playerOneHandRedux.data);
    setPlayerTwo(playerTwoHandRedux.data);
    
  }, [playerTwoHandRedux, playerOneHandRedux]);
  
  useEffect(()=>{
    if(firstPlayer === 2 && turns === 0 && playerOne.length && playerTwo.length){
      handleAiStart()
    }
  },[playerOne,playerTwo])

  const handleAiStart = ()=>{
    const params = {
      currentPlayer: 'p2',
      hands: {
        p1: playerOne,
        p2: playerTwo
      },
      move: null,
      board: serverBoard
    }
    setCurrentPlayer((prevState) => (prevState === 1 ? 2 : 1));
    setTurns((prevState) => {
            const count = prevState + 1;
            return count;
          });
    gameProceed(params).then(({data})=>{
      // setBoard(returnBoard(data.oldBoard))
      
      if(data.move !== null){
        const idAi = data.move.poke.id;
        setTimeout(()=>{
          setPlayerTwo(prevState => prevState.map(item =>{
            if(item.id === idAi){
              return {
                ...item,
                isActive: true
              }
            }
            return item
          }))
        },1000)

        setTimeout(() => {
          setPlayerTwo(()=>data.hands.p2.pokes.map(item=>item.poke))
          setServerBoard(data.board)
          setBoard(returnBoard(data.board))

          
          

        }, 1500);
      }
    }).catch(error=>console.error(error))
  }

  const handleCellClick = (position) => {

    if ((typeof chosenCard === 'object') && (chosenCard && chosenCard.player === currentPlayer)) {
      

      if(chosenCard.player === 1){
        setPlayerOne(prevState => prevState.filter(item => item.id !== chosenCard.id))
      }

      setBoard(prevState => prevState.map(item=>{
        if(item.position === position){
          return {
            ...item,
            card:chosenCard
          }
        }

        return item;

      }))
      const params = {
        currentPlayer: `p${currentPlayer}`,
        hands: {
          p1: playerOne,
          p2: playerTwo
        },
        move: {
          poke: {...chosenCard},
          position: position
        },
        board: serverBoard
      }
      console.dir(params)
      gameProceed(params).then(({data})=>{
        console.log(data)
        setCurrentPlayer((prevState) => (prevState === 1 ? 2 : 1));
        setTurns((prevState) => {
          const count = prevState + 1;
          return count;
        });
        setBoard(returnBoard(data.oldBoard))
        
        if(data.move !== null){
          const idAi = data.move.poke.id;
          setTimeout(()=>{
            setPlayerTwo(prevState => prevState.map(item =>{
              if(item.id === idAi){
                return {
                  ...item,
                  isActive: true
                }
              }
              return item
            }))
          },1000)

          setTimeout(() => {
            setPlayerTwo(()=>data.hands.p2.pokes.map(item=>item.poke))
            setServerBoard(data.board)
            setBoard(returnBoard(data.board))

            
            setCurrentPlayer((prevState) => (prevState === 1 ? 2 : 1));
            setTurns((prevState) => {
              const count = prevState + 1;
              return count;
            });

          }, 1500);
        }
      }).catch(error=>console.error(error))
    }
  };

  useEffect(() => {
    if (turns !== 9) return;
    const [scoreOne, scoreTwo] = winCounter(board, playerOne, playerTwo);
    if (scoreOne > scoreTwo) {
      dispatch(setGameStatus('Won'));
    } else if (scoreOne < scoreTwo) {
      dispatch(setGameStatus('Lost'));
    } else {
      dispatch(setGameStatus('Draw'));
    }
    setTimeout(() => {
      history.push('/game/finish');
    }, 1000);
  }, [board, playerOne, playerTwo, turns]);

  return (
    <div className={s.root}>
      {gameStatus !== 'InProgress' && <MatchResult type={gameStatus}/>}
      <TurnIndicator side={currentPlayer} />
      <div className={s.playerOne}>
        <PlayerHand
          player={1}
          cards={playerOne}
          onCardClick={(card) => setChosenCard(card)}
        />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div
            key={item.position}
            className={s.boardPlate}
            onClick={() => !item.card && handleCellClick(item.position)}
          >
            {item.card ? (
              <PokemonCard {...item.card} isActive minimize />
            ) : (
              item.position
            )}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerHand
          player={2}
          cards={playerTwo}
          onCardClick={(card) => setChosenCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
