import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { firestoredb } from "../cus.firebase";
import { ItemModel, toItemModel } from "../modelos";

interface ParametrosEsperados {
  id: string;
}

const Item: React.FC = () => {
  const { id } = useParams<ParametrosEsperados>();
  const [item, setItem] = useState<ItemModel>();
  useEffect(() => {
    const aux = firestoredb.collection("lista").doc(id);
    aux.get().then((doc) => setItem(toItemModel(doc)));
  }, [id]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{item?.titulo}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {item?.descricao}
      </IonContent>
    </IonPage>
  );
};

export default Item;