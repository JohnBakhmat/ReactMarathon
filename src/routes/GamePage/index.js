import MenuHeader from "../../components/MenuHeader";

const GamePage = ({onRedirect}) => {
  const handleRedirect = (path) => {
    onRedirect && onRedirect(path);
  };

  return (
    <div>
      <MenuHeader onRedirect={handleRedirect} bgActive={true}/>
      <div>asdfas</div>
    </div>
  );
};
export default GamePage;
