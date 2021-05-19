import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auto';
import { firestoredb } from "../cus.firebase";

const AddItem: React.FC = () => {
  const { usuarioId } = useAuth();
  const historico = useHistory();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSalvar = async () => {
    const listaRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista");
    const body = { titulo, descricao };
    const newItem = await listaRef.add(body);
    historico.goBack();
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Titulo</IonLabel>
            <IonInput value={titulo} onIonChange={(event) => setTitulo(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descrição</IonLabel>
            <IonTextarea value={descricao} onIonChange={(event) => setDescricao(event.detail.value)} />
          </IonItem>
          <IonButton expand="block" onClick={handleSalvar}>Salvar</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddItem;