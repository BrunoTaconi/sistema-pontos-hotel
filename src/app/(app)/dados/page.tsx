"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

interface UserData {
  nome: string;
  email: string;
  telefone?: string;
  numeroDocumento?: string;
  /* fotoPerfil?: string; // Add a property for the profile picture URL*/
}

const MyDataPage = () => {
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
        <div className={styles.cardsWrapper}>
          {/* Card 1: Profile Picture and Name */}
          <div className={`${styles.card} ${styles.profileCard}`}>
            <Image
              src={"/standard_profilepic.png"}
              alt="Foto de Perfil"
              width={100}
              height={100}
              className={styles.profileImage}
            />
            <h2>{userData.nome}</h2>
          </div>

          {/* Card 2: Other Information */}
          <div className={styles.card}>
            <div className={styles.dataRow}>
              <FaEnvelope size={20} className={styles.icon} />
              <div className={styles.dataText}>
                <span className={styles.label}>Email:</span>
                <p>{userData.email}</p>
              </div>
            </div>
            {userData.telefone && (
              <div className={styles.dataRow}>
                <FaPhone style={{ transform: "rotate(90deg)" }} size={20} fa-rotate-180 className={styles.icon} />
                <div className={styles.dataText}>
                  <span className={styles.label}>Telefone:</span>
                  <p>{userData.telefone}</p>
                </div>
              </div>
            )}
            {userData.numeroDocumento && (
              <div className={styles.dataRow}>
                <FaMapMarkerAlt size={20} className={styles.icon} />
                <div className={styles.dataText}>
                  <span className={styles.label}>Documento:</span>
                  <p>{userData.numeroDocumento}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDataPage;