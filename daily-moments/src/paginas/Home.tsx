import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { lista } from "../mock-dados/mock-lista";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {
            lista.map(item => 
              <IonItem key={item.id}
              button
              routerLink={`/meu/itens/${item.id}`}
              >{item.titulo}</IonItem>
            )
          }  
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
