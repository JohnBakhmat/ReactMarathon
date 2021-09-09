// import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/Footer/index";
import Header from "./components/Header/index";
import Layout from "./components/Layout/index";
import Logo from "./components/Logo/index";
import {lorem} from './lorem.json'
import img1 from './assets/img1.png'
import img2 from './assets/img2.jpg'

function App() {
  const color = "#F79C1E"
  
  return (
    <div className="App">
      <Logo />
      <Header title="Zar Marathon" descr="Yevhenii Bakhmat's Homework" />
      <Layout title="Layout1 title" descr={lorem} urlBg={img1} colorBg="" />
      <Layout title="Layout2 title" descr={lorem} colorBg={color} />
      <Layout title="Layout3 title" descr={lorem} urlBg={img2} colorBg="" />
      <Footer />
    </div>
  );
}

export default App;
