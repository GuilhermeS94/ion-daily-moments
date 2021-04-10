import {
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
import Item from "./paginas/Item";

interface TelaProps {
  usuarioLogado: boolean;
}

const AppTabs: React.FC<TelaProps> = ({usuarioLogado}) => {
  if(!usuarioLogado){
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/meu/itens">
          <Home />
        </Route>
        <Route exact path="/meu/itens/:id">
          <Item />
        </Route>
        <Route exact path="/meu/configs">
          <Configs />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tbHome" href="/meu/itens">
          <IonIcon icon={homeIC} />
          <IonLabel>
            Home
          </IonLabel>
        </IonTabButton>
        <IonTabButton tab="tbConfigs" href="/meu/configs">
        <IonIcon icon={configsIC} />
          <IonLabel>
            Configs
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
