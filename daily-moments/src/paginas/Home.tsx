import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auto';
import { firestoredb } from "../cus.firebase";
import { ItemModel, toItemModel } from "../modelos";

const Home: React.FC = () => {
  const { usuarioId } = useAuth();
  const [lista, setLista] = useState<ItemModel[]>([]);
  useEffect(() => {
    const listaRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista");
    listaRef.get().then(({docs}) => {
      setLista(docs.map(toItemModel));
    });
  }, [usuarioId]);

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
