import { useState } from 'react'
import PokemonCard from '../../../../../components/PokemonCard'
import s from './styles.module.css'
import cn from 'classnames'

const PlayerHand = ({ player, cards, onCardClick }) => {
  const [isSelected, setSelected] = useState(null)

  return (
    <>
      {Object.values(cards).map((item) => (
        <div
          className={cn(s.hand, { [s.isSelected]: isSelected === item.id })}
          key={item.id}
          onClick={() => {
            setSelected(item.id)
            onCardClick && onCardClick({ ...item, player })
          }}
        >
          <PokemonCard
            name={item.name}
            img={item.img}
            id={item.id}
            type={item.type}
            values={item.values}
            isActive
            minimize
          />
        </div>
      ))}
    </>
  )
}
export default PlayerHand
