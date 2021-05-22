import firebase from 'firebase/app';

export interface ItemModel{
    id: string;
    dia: string;
    fotoUrl: string;
    titulo: string;
    descricao: string;
}

export function toItemModel(doc: firebase.firestore.DocumentSnapshot): ItemModel{
    return { id: doc.id, ...doc.data() } as ItemModel;
}