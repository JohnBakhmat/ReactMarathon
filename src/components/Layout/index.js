import s from "./style.module.css";

const Layout = ({ title, descr, urlBg, colorBg }) => {
console.log(urlBg)
    const img = urlBg ? {
        background : `linear-gradient(rgba(6, 46, 73, 0.5), rgba(6, 46, 73, 0.5)), url(${urlBg})`,
        color:'white',
        backgroundSize : 'cover',
    } :{}
    const color = colorBg ? {background: `${colorBg}`} : {}

    const bg = Object.keys(img).length>0 ? img : color 

  return (
    <section className={s.root} style={bg}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={`${s.desc} ${s.full}`}>
            <p>{descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};
export default Layout;
