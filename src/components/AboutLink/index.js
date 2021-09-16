// import s from "./styles.module.css";
const AboutLink = ({ path, label, children }) => {
  return (
    <div>
      <a href={path}>
        {children}
        <label>{label}</label>
      </a>
    </div>
  );
};
export default AboutLink;
