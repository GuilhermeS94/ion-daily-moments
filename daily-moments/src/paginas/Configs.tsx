import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { customAuth } from "../cus.firebase";

const Configs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configurações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block"
          onClick={()=>customAuth.signOut()}>
          Sair
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Configs;
