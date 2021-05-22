import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { CameraResultType, Plugins } from "@capacitor/core";
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auto';
import { firestoredb, storage } from "../cus.firebase";
const { Camera } = Plugins;


async function salvarFoto(blobUrl, usuarioId){
  const fotoRef = storage.ref(`/usuarios/${usuarioId}/fotos/${Date.now()}`);
  const reqFromBlobUrl = await fetch(blobUrl);
  const blobObj = await reqFromBlobUrl.blob();
  const retorno = await fotoRef.put(blobObj);
  const urlFixa = await retorno.ref.getDownloadURL();
  return urlFixa;
}

const AddItem: React.FC = () => {
  const { usuarioId } = useAuth();
  const historico = useHistory();
  const [titulo, setTitulo] = useState("");
  const [dia, setDia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const arqInputRef = useRef<HTMLInputElement>();

  useEffect(() => () => {
    if(fotoUrl.startsWith("blob:")){
      URL.revokeObjectURL(fotoUrl);
    }
  }, [fotoUrl]);

  const handleSalvar = async () => {
    const listaRef = firestoredb.collection("usuarios").doc(usuarioId).collection("lista");
    const body = { dia, titulo, fotoUrl, descricao };
    if(fotoUrl.startsWith("/assets")){
      body.fotoUrl = await salvarFoto(fotoUrl, usuarioId);
    }
    const newItem = await listaRef.add(body);
    historico.goBack();
  };

  const tratarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if(evento.target.files.length > 0){
      const arq = evento.target.files.item(0);
      setFotoUrl(URL.createObjectURL(arq));
    }
  };

  const handleFotoClick = async () => {
    if(isPlatform("capacitor")){
      const foto = await Camera.getPhoto({
        resultType:CameraResultType.Uri,
        width:600
      });
      setFotoUrl(foto.webPath);
    }else{
      arqInputRef.current.click();
    }
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
            <IonLabel position="stacked">Dia</IonLabel>
            <IonDatetime value={dia} onIonChange={(event) => setDia(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Foto</IonLabel>
            <input type="file" accept="image/*" hidden onChange={tratarImagem} ref={arqInputRef} /><br />
            <img src={fotoUrl} alt="imgaem do usuario" style={{ cursor:"pointer" }} 
              onClick={handleFotoClick}
            />
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