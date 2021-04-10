import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { lista } from "../mock-dados/mock-lista";

interface ParametrosEsperados {
  id: string;
}

const Item: React.FC = () => {
  const { id } = useParams<ParametrosEsperados>();
  const item = lista.find((procurar) => procurar.id === id);
  if(!item){
    throw new Error(`Nenhum registro encontrado com ID: ${id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{item.titulo}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {item.descricao}
      </IonContent>
    </IonPage>
  );
};

export default Item;