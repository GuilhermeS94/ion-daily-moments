import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';

interface TelaProps {
  usuarioLogado: boolean;
  onLogin: ()=>void;
}

const Login: React.FC<TelaProps> = ({ usuarioLogado, onLogin }) => {
  
  if(usuarioLogado){
    return <Redirect to="/meu/itens" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
