
import AboutLink from '../../components/AboutLink'
import face from './assets/face.jpg'
import s from './styles.module.css'
function AboutPage() {
	return (
		<div>
			<div className={s.wrap}>
				<img className={s.face} src={face} alt="My face"/>
				<div className={s.textBlock}>
					<h1 className={s.name}>Yevhenii Bakhmat</h1>
					<h1>Kharkiv National University of Radioelectronics</h1>
					<AboutLink path={"https://github.com/Yevhenii-Bakhmat"} label="GitHub">
						<i class="fab fa-github-square"></i>
					</AboutLink>
				</div>
			</div>
		</div>
	)
}

export default AboutPage
