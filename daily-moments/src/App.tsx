import {
  IonApp,
} from '@ionic/react';
import React, { useState } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "./paginas/Login";
import AppTabs from "./AppTabs";
import { AuthContext } from "./auto";
import { IonReactRouter } from '@ionic/react-router';
import Page404 from './paginas/Page404';

const App: React.FC = () => {

  const [usuarioLogado, setUsuarioLogado] = useState(false);

  return (
    <IonApp>
      <AuthContext.Provider value={{ usuarioLogado }}>
        <IonReactRouter>
          <Switch>
          <Route exact path="/login">
                <Login
                  onLogin={()=> setUsuarioLogado(true)} 
                />
            </Route>
            <Route path="/meu">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/meu/itens" />
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
