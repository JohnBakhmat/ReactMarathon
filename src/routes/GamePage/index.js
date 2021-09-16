import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard/'
import pDb from "../../data/pokemons.json";
import s from "./styles.module.css"
import {useState} from 'react'
function GamePage() {
	const [pokemons,setPokemons] = useState(pDb)
	const handleFlipEvent=(id)=>{
		let newArray = [...pokemons]
		let pokeId = newArray.findIndex(p=>p.id===id)
		newArray[pokeId].isActive ^= true
		setPokemons(newArray)
	}
	return (
		<div className={s.section}>
          {pokemons.map((item) => (
            <PokemonCard
              key={item.id}
              id={item.id}
              name={item.name}
              img={item.img}
              stats={item.stats}
              type={item.type}
              values={item.values}
			  isActive={item.isActive}
			  onClickEvent={handleFlipEvent}
            />
          ))}

		</div>
	)
}

export default GamePage

