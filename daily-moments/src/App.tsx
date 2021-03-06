import {
  IonApp, IonLoading,
} from '@ionic/react';
import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "./paginas/Login";
import AppTabs from "./AppTabs";
import { AuthContext, InitAuth } from "./auto";
import { IonReactRouter } from '@ionic/react-router';
import Page404 from './paginas/Page404';
import Registrarse from './paginas/Registrarse';


const App: React.FC = () => {

  const { carregando, autorizado } = InitAuth();

  if(carregando){
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={autorizado}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/registrarse">
                <Registrarse />
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
