import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trash as lixoIcone } from "ionicons/icons";
import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { useAuth } from '../auto';
import { firestoredb } from "../cus.firebase";
import { ItemModel, toItemModel } from "../modelos";
import { formatarDataParaView } from "../utilitarios";

interface ParametrosEsperados {
  id: string;
}

const Item: React.FC = () => {
  const { usuarioId } = useAuth();
  const testar = useRouteMatch<ParametrosEsperados>();
  const { id } = testar.params;
  const [item, setItem] = useState<ItemModel>();
  const historico = useHistory();
  useEffect(() => {
    const itemRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista").doc(id);
    itemRef.get().then((doc) => setItem(toItemModel(doc)));
  }, [usuarioId, id]);

  const handleDeletar = async () => {
    const itemRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista").doc(id);
    await itemRef.delete();
    historico.goBack();
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatarDataParaView(item?.dia)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDeletar}>
              <IonIcon icon={lixoIcone} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{item?.titulo}</h2>
        <img src={item?.fotoUrl} alt={item?.titulo} />
        <p>{item?.descricao}</p>
      </IonContent>
    </IonPage>
  );
};

export default Item;