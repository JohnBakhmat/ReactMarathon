import React from "react";
import { useHistory } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";
import {createPlayer} from '../../../../services/zarApiService'
import s from './styles.module.css'
function FinishPage() {
  const { playerOneHand,playerTwoHand } = useContext(PokemonContext);
  const history = useHistory();
  if (!Object.keys(playerOneHand).length) {
    history.replace("/game");
  }

  //Test Array
  // const [playerTwo,setPlayerTwo] = useState([])
  // useEffect(() => {
  //   createPlayer().then((resp) => {
  //     let data = resp.data.data;

  //     setPlayerTwo(() => {
  //       return data
  //     });
      
  //   });
  // }, []);

  return (
  <div>
    <div className={s.row}>
        {
          Object.values(playerOneHand).map(item => (
            <PokemonCard
              id={item.id}
              name={item.name}
              img={item.img}
              stats={item.stats}
              type={item.type}
              values={item.values}
              isActive={true}
              isSelected={item.isSelected}
              className={s.pokemonCard}
            />
          ))
        }
    </div>
    <button
        type="button"
        onClick={()=>{history.replace('/game')}}
      >
        End Game
      </button>
    <div className={s.row}>
        {
          Object.values(playerTwoHand).map(item => (
            <PokemonCard
              id={item.id}
              name={item.name}
              img={item.img}
              stats={item.stats}
              type={item.type}
              values={item.values}
              isActive={true}
              isSelected={item.isSelected}
              className={s.pokemonCard}
            />
          ))
        }
    </div>
  </div>);
}

export default FinishPage;
