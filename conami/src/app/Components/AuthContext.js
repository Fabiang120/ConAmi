"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    
    const login = (accessToken, user) => {
        setToken(accessToken);
        setUsername(user);
    }
    const logout = () => {
        setToken(null);
        setUsername(null);
    };
    return (
        <AuthContext.Provider value={{ token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}