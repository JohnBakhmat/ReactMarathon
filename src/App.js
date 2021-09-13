import { useState } from "react";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";

const App = ()=>{
  const [route, setRoute] = useState('home')
  
  const handleRedirect = (path)=>{
    setRoute(path)
  }
  
  switch (route) {
    case 'game':
      return (
        <GamePage onRedirect={handleRedirect} />
      )
    case 'home':
      return (
        <HomePage onRedirect={handleRedirect} />
      )
    default: {
      console.log('Error')
    }
  }
}

export default App;
