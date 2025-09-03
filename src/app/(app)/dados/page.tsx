"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// Você precisará definir o tipo para os dados do usuário.
// Adapte isso para corresponder à estrutura do seu banco de dados.
interface UserData {
  nome: string;
  email: string;
  telefone?: string; // Opcional
  endereco?: string; // Opcional
  // Adicione outros campos do usuário aqui.
}

const MeusDadosPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/usuarios/me");
        if (!res.ok) {
          throw new Error("Não foi possível carregar os dados do usuário.");
        }
        const data: UserData = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className={styles.container}>Carregando seus dados...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Dados</h1>
      

      {userData && (
        <div className={styles.dataCard}>
          <div className={styles.dataRow}>
            <FaUser size={20} className={styles.icon} />
            <div className={styles.dataText}>
              <span className={styles.label}>Nome:</span>
              <p>{userData.nome}</p>
            </div>
          </div>
          <div className={styles.dataRow}>
            <FaEnvelope size={20} className={styles.icon} />
            <div className={styles.dataText}>
              <span className={styles.label}>Email:</span>
              <p>{userData.email}</p>
            </div>
          </div>
          {userData.telefone && (
            <div className={styles.dataRow}>
              <FaPhone size={20} className={styles.icon} />
              <div className={styles.dataText}>
                <span className={styles.label}>Telefone:</span>
                <p>{userData.telefone}</p>
              </div>
            </div>
          )}
          {userData.endereco && (
            <div className={styles.dataRow}>
              <FaMapMarkerAlt size={20} className={styles.icon} />
              <div className={styles.dataText}>
                <span className={styles.label}>Endereço:</span>
                <p>{userData.endereco}</p>
              </div>
            </div>
          )}
          {/* Adicione mais campos aqui, seguindo o mesmo padrão */}
        </div>
      )}
    </div>
  );
};

export default MeusDadosPage;