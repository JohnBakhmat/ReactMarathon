import s from './style.module.css'
import logo from '../../assets/logo.jpg'


export default function Logo(){

	return(
		<img className={s.img} src={logo} alt="Yevhenii Bakhmat's Logo"/>
	)
}