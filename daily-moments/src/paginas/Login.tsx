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
import { useAuth } from "../auto";
import { customAuth } from "../cus.firebase";

interface TelaProps {
  onLogin: ()=>void;
}

const Login: React.FC<TelaProps> = ({ onLogin }) => {
  const { usuarioLogado } = useAuth();
  if(usuarioLogado){
    return <Redirect to="/meu/itens" />;
  }

  const logar = async () => {
    const credenciais = await customAuth.signInWithEmailAndPassword("usuario1@email.com", "usuario1");
    console.log("cred: ", credenciais);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={logar}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
