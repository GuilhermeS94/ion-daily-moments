import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from "../auto";
import { customAuth } from "../cus.firebase";

const Login: React.FC = () => {
  const { usuarioLogado } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [statusReq, setSstatusReq] = useState({carregando: false, temErro: false});

  if(usuarioLogado){
    return <Redirect to="/meu/itens" />;
  }

  const logar = async () => {
    try{
      setSstatusReq({carregando: true, temErro:false});
      //const credenciais = await customAuth.signInWithEmailAndPassword("usuario1@email.com", "usuario1");
      const credenciais = await customAuth.signInWithEmailAndPassword(email, senha);
      console.log("cred: ", credenciais);
      setSstatusReq({carregando: false, temErro:false});
    }catch(erro){
      setSstatusReq({carregando: false, temErro:true});
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} 
              onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Senha</IonLabel>
            <IonInput type="password" value={senha} 
              onIonChange={(event) => setSenha(event.detail.value)}/>
          </IonItem>
        </IonList>
        { statusReq.temErro &&  
          <IonText color="danger">Email ou senha inválidos!</IonText>}
        <IonButton expand="block" onClick={logar}>Login</IonButton>
        <IonLoading isOpen={statusReq.carregando} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
