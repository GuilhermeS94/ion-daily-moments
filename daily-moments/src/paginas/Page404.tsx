import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from "../auto";


const Page404: React.FC = () => {
  const { usuarioLogado } = useAuth();
  if(usuarioLogado){
    return <Redirect to="/meu/itens" />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        Página nāo encontrada.
      </IonContent>
    </IonPage>
  );
};

export default Page404;
