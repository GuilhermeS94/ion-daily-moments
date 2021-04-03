import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Configs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configurações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      Ir para <Link to="/home">Home</Link>
      </IonContent>
    </IonPage>
  );
};

export default Configs;
