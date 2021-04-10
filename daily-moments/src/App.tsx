import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom";

import Login from "./paginas/Login";
import AppTabs from "./AppTabs";
import { IonReactRouter } from '@ionic/react-router';

const App: React.FC = () => {

  const [usuarioLogado, setUsuarioLogado] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
        <Route exact path="/login">
              <Login 
                usuarioLogado={usuarioLogado}
                onLogin={()=> setUsuarioLogado(true)} 
              />
          </Route>
          <Route path="/meu">
            <AppTabs usuarioLogado={usuarioLogado} />
          </Route>
          <Redirect exact path="/" to="/meu/itens" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
