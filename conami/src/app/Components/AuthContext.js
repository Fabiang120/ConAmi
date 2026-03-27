"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const res = await fetch("http://localhost:8000/auth/me", {
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
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData) => {
        const res = await fetch("http://localhost:8000/token", {
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
        try {
            await fetch("http://localhost:8000/logout", {
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
        <AuthContext.Provider value={{ username, loading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}