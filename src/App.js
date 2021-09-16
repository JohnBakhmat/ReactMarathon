import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
import s from './styles.module.css'

import cn from 'classnames'
import { useState } from "react";
import { useRouteMatch, Route, Switch , Redirect } from "react-router-dom";

const App = () => {
  const match = useRouteMatch('/')

  return (
      <Switch>
        <Route path="/404" render={() => <h1>404 NotFound</h1>} />
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact} />
            <div className={cn(s.wrap,{[s.isHomePage]:match.isExact})}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                {/* <Route path="/home" component={HomePage} /> */}
                <Route path="/game" component={GamePage} />
                <Route path="/about" render={() => <h1>This is about page</h1>} />
                <Route render={()=>(
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
  );
};

export default App;
