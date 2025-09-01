"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "../types/usuario";


type UserContextType = {
  usuario: Usuario | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  usuario: null,
  loading: true,
  refetch: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/usuarios/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUsuario(data);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, loading, refetch: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
