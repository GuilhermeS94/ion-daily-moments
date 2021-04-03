import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { home as homeIC, settings as configsIC } from  "ionicons/icons";
import React from 'react';
import { Route, Redirect } from "react-router-dom";

import Home from "./paginas/Home";
import Configs from "./paginas/Configs";
import { IonReactRouter } from '@ionic/react-router';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/configs">
              <Configs />
            </Route>
            <Redirect exact path="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tbHome" href="/home">
              <IonIcon icon={homeIC} />
              <IonLabel>
                Home
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="tbConfigs" href="/configs">
            <IonIcon icon={configsIC} />
              <IonLabel>
                Configs
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
