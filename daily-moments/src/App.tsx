import {
  IonApp
} from '@ionic/react';
import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Home from "./paginas/Home";
import Configs from "./paginas/Configs";

const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/configs">
          <Configs />
        </Route>
        <Redirect exact path="/" to="/home" />
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
