"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
    const refreshUser = async () => {
        try {
            const res = await fetch(`${API_BASE}/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                setUsername(null);
                return false;
            }

            const data = await res.json();
            setUsername(data.username);
            return true;
        } catch {
            setUsername(null);
            return false;
        }
    };

    const login = async (formData) => {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
        const res = await fetch(`${API_BASE}/token`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!res.ok) {
            setUsername(null);
            return false;
        }

        return await refreshUser();
    };

    const logout = async () => {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
        try {
            await fetch(`${API_BASE}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
        }

        setUsername(null);
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ username, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}