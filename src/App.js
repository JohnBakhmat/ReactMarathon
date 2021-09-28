import HomePage from './routes/HomePage';
// import StartPage from "./routes/Game/routes/Start";
import NotFound from './routes/NotFound';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import s from './styles.module.css';

import cn from 'classnames';

import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import GamePage from './routes/Game';

const App = () => {
  const location = useLocation('/');
  const paddingActive =
    location.pathname === '/' || location.pathname === '/game/board';

  return (
    <Switch>
      <Route path="/404" component={NotFound} />
      <Route>
        <>
          <MenuHeader bgActive={!paddingActive} />
          <div className={cn(s.wrap, { [s.isHomePage]: paddingActive })}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              {/* <Route path="/home" component={HomePage} /> */}
              <Route path="/game" component={GamePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
  );
};

export default App;
