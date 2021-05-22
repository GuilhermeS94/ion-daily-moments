import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add as addIcone } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auto';
import { firestoredb } from "../cus.firebase";
import { ItemModel, toItemModel } from "../modelos";
import { formatarDataParaView } from "../utilitarios";

const Home: React.FC = () => {
  const { usuarioId } = useAuth();
  const [lista, setLista] = useState<ItemModel[]>([]);
  useEffect(() => {
    const listaRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista");
    return listaRef.orderBy("dia", "desc").onSnapshot(({docs}) => setLista(docs.map(toItemModel)));
  }, [usuarioId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Momentos do dia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {
            lista.map(item => 
              <IonItem key={item.id} button routerLink={`/meu/itens/tela/${item.id}`}>
                <IonThumbnail slot="end">
                  <IonImg src={item.fotoUrl} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{formatarDataParaView(item.dia)}</h2>
                  <h3>{item.titulo}</h3>
                </IonLabel>
              </IonItem>
            )
          }  
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/meu/itens/add">
            <IonIcon icon={addIcone} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
