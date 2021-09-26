import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard";
import { PokemonContext } from "../../../../context/pokemonContext";
import s from "./style.module.css";
import {
  getBoard,
  createPlayer,
  playerTurn,
} from "../../../../services/zarApiService";
import PlayerHand from "./PlayerHand";

const winCounter = (board, playerOne, playerTwo) => {
  let handOneCount = playerOne.length;
  let handTwoCount = playerTwo.length;
  board.forEach((item) => {
    if (item.card.possession === "red") {
      handTwoCount++;
    }
    if (item.card.possession === "blue") {
      handOneCount++;
    }
  });

  return [handOneCount, handTwoCount];
};

const BoardPage = () => {
  const { playerOneHand, savePlayerTwoDeck, setGameStatus } = useContext(
    PokemonContext
  );

  const [turns, setTurns] = useState(0);
  const [board, setBoard] = useState([]);
  const [chosenCard, setChosenCard] = useState(null);
  const [playerTwo, setPlayerTwo] = useState([]);
  const [playerOne, setPlayerOne] = useState(() => {
    return Object.values(playerOneHand).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });

  const history = useHistory();

  if (!Object.keys(playerOneHand).length) {
    history.replace("/game");
  }

  useEffect(() => {
    getBoard().then((resp) => {
      setBoard(resp.data.data);
    });

    createPlayer().then((resp) => {
      let data = resp.data.data;
      setPlayerTwo(() => {
        savePlayerTwoDeck(data);
        return data.map((item) => ({
          ...item,
          possession: "red",
        }));
      });

      setGameStatus("InProgress");
    });
  }, []);

  const handleCellClick = (position) => {
    if (chosenCard) {
      const params = {
        position,
        card: chosenCard,
        board,
      };

      if (chosenCard.player === 1) {
        setPlayerOne((prevState) =>
          prevState.filter((i) => i.id !== chosenCard.id)
        );
      } else if (chosenCard.player === 2) {
        setPlayerTwo((prevState) =>
          prevState.filter((i) => i.id !== chosenCard.id)
        );
      }
      playerTurn(params).then((response) => {
        setBoard(response.data.data);
        setTurns((prevState) => {
          const count = prevState + 1;
          return count;
        });
      });
    }
  };

  useEffect(() => {
    if (turns === 9) {
      const [scoreOne, scoreTwo] = winCounter(board, playerOne, playerTwo);

      if (scoreOne > scoreTwo) {
        setGameStatus("Won");
        alert("You won");
      } else if (scoreOne < scoreTwo) {
        setGameStatus("Lost");
        alert("You lost!");
      } else {
        setGameStatus("Tie");
        alert("Tie!");
      }
      history.push("/game/finish");
    }
  }, [board, history, playerOne, playerTwo, setGameStatus, turns]);

  return (
    <div className={s.root}>
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
