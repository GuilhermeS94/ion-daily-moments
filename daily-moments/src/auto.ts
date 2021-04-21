import React, { useContext } from "react";

export const AuthContext = React.createContext({ usuarioLogado: false });

export function useAuth(){
    return useContext(AuthContext);
}