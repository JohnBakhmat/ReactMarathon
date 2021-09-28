import s from './style.module.css'
import cn from 'classnames'
const Layout = ({ title, children, urlBg, colorBg }) => {
  const img = urlBg
    ? {
        background: `linear-gradient(rgba(6, 46, 73, 0.5), rgba(6, 46, 73, 0.5)), url(${urlBg})`,
        color: 'white',
        backgroundSize: 'cover',
      }
    : {}
  const color = colorBg ? { background: `${colorBg}` } : {}

  const bg = Object.keys(img).length > 0 ? img : color

  return (
    <section className={s.root} style={bg}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={`${cn(s.desc, s.full)}`}>{children}</div>
        </article>
      </div>
    </section>
  )
}
export default Layout
