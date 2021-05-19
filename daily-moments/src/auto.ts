import React, { useContext, useEffect, useState } from "react";
import { customAuth as firebaseAuth } from "./cus.firebase";

interface Autorizar{
    usuarioLogado: boolean;
    usuarioId?: string;
}

interface InitAutorizar{
    carregando: boolean;
    autorizado?: Autorizar;
}

export const AuthContext = React.createContext<Autorizar>({ usuarioLogado: false });

export function useAuth():Autorizar{
    return useContext(AuthContext);
}

export function InitAuth():InitAutorizar{
    const [authInit, SetAuthInit] = useState<InitAutorizar>({carregando: true});

    useEffect(()=> {
        return firebaseAuth.onAuthStateChanged((usuarioFirebase) =>{
            const autorizado = usuarioFirebase ? 
            { usuarioLogado: true, usuarioId: usuarioFirebase.uid } :
            { usuarioLogado: false };
            SetAuthInit({ carregando:false, autorizado});
        });
    }, []);

    return authInit;
}