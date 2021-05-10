import {
  IonApp, IonLoading,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "./paginas/Login";
import AppTabs from "./AppTabs";
import { AuthContext } from "./auto";
import { IonReactRouter } from '@ionic/react-router';
import Page404 from './paginas/Page404';
import { customAuth } from "./cus.firebase";


const App: React.FC = () => {

  const [statusAuth, setStatusAuth] = useState({carregando: true, usuarioLogado: false});

  useEffect(()=> {
    customAuth.onAuthStateChanged((usuario) =>{
      setStatusAuth({carregando: false, usuarioLogado: Boolean(usuario)});
    });
  }, []);

  if(statusAuth.carregando){
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={{ usuarioLogado: statusAuth.usuarioLogado }}>
        <IonReactRouter>
          <Switch>
          <Route exact path="/login">
                <Login />
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
