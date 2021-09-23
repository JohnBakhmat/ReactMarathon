import React from "react";
import { useHistory } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCard from "../../../../components/PokemonCard";
import {createPlayer} from '../../../../services/zarApiService'
import s from './styles.module.css'
import firebase from '../../../../services/firebase'
function FinishPage() {
  const { playerOneHand,playerTwoHand,savePlayerOneDeck,savePlayerTwoDeck } = useContext(PokemonContext);
  const history = useHistory();
  if (!Object.keys(playerOneHand).length) {
    history.replace("/game");
  }
  const [stolenCard, setStolenCard] = useState(null)
  // const [playerTwo,setPlayerTwo] = useState([])
  // useEffect(() => {
  //   createPlayer().then((resp) => {
  //     let data = resp.data.data;

  //     setPlayerTwo(() => {
  //       return data
  //     });
      
  //   });
  // }, []);

  const handleCardSelect = (id) => {
    savePlayerTwoDeck(prevState=>{
      let newArray = prevState.map(i=>({...i,isSelected:false}));
      newArray.find(i=> (i.id===id)).isSelected^=true
      setStolenCard(newArray.find(i=> (i.id===id)))
      return [...newArray]
    })
  };

  const handleGameEnd = ()=>{
    console.log(stolenCard);
    let card = stolenCard;
    card.isSelected = false;
    (new firebase()).addPokemon(card, ()=>{})
    savePlayerOneDeck({})
    savePlayerTwoDeck({})
    history.replace('/game')
    
  }

  // useEffect(()=>{
  //   console.dir(stolenCard)
  // },[stolenCard])


  return (
  <div>
    <div className={s.row}>
        {
          Object.values(playerOneHand).map(item => (
            <PokemonCard
              key={item.id}
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
        onClick={handleGameEnd}
      >
        End Game
      </button>
    <div className={s.row}>
        {
          // Object.values(playerTwoHand)
          Object.values(playerTwoHand).map(item => (
            <PokemonCard
            key={item.id}
              id={item.id}
              name={item.name}
              img={item.img}
              stats={item.stats}
              type={item.type}
              values={item.values}
              isActive={true}
              isSelected={item.isSelected}
              className={s.pokemonCard}
              onClickEvent={()=>{
                handleCardSelect(item.id)
              }}
            />
          ))
        }
    </div>
  </div>);
}

export default FinishPage;
