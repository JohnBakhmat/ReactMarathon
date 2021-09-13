import s from "./styles.module.css";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";
import Layout from "../../components/Layout/index";
import PokemonCard from "../../components/PokemonCard/index";
import MenuHeader from "../../components/MenuHeader/index";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.jpg";
import pokemons from "../../pokemonDb.json";

const HomePage = ({ onRedirect }) => {
  const color = "#F79C1E";
  const handleRedirect = (path) => {
    onRedirect && onRedirect(path);
  };
  return (
    <div className="App">
      <MenuHeader onRedirect={handleRedirect} />
      <Header
        title="Zar Marathon"
        descr="Yevhenii Bakhmat's Homework"
        onRedirect={handleRedirect}
      />
      <Layout title="Layout1 title" urlBg={img1}>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
      </Layout>
      <Layout title="Cards" colorBg={color}>
        <div className={s.flex}>
          {pokemons.map((item) => (
            <PokemonCard
              key={item.id}
              id={item.id}
              name={item.name}
              img={item.img}
              stats={item.stats}
              type={item.type}
              values={item.values}
            />
          ))}
        </div>
      </Layout>
      <Layout title="Layout3 title" urlBg={img2}>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.{" "}
        </p>
      </Layout>
      <Footer />
    </div>
  );
};

export default HomePage;