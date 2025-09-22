"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";
import { FaArrowLeft, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

interface UserData {
  nome: string;
  email: string;
  telefone?: string;
  numeroDocumento?: string;
  saldoPontos: number; 
}

const MyDataPage = () => {
  const router = useRouter();
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
    return (
      <div className={styles.container}>
        <div className={styles.pageContent}>
          <p>Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.pageContent}>
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        {/* Este é o cabeçalho com o botão e o título */}
        <div className={styles.backContainer}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FaArrowLeft size={17} />
          </button>
          <p>Meus Dados</p>
        </div>

        {userData && (
          <div className={styles.cardsWrapper}>
            {/* Card de Perfil (vertical) */}
            <div className={`${styles.card} ${styles.profileCard}`}>
              { <Image
                src={"/standard_profilepic.png"}
                alt="Foto de Perfil"
                width={100}
                height={100}
                className={styles.profileImage}
              /> }
              <h2>{userData.nome}</h2>
              {/* Adicionando o total de pontos */}
              <div className={styles.pointsTotal}>
                <span>Total de Pontos:</span>
                <p>{userData.saldoPontos} Real Points</p>
              </div>
              
            </div>

            {/* Card de Dados (vertical) */}
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
                  <FaPhone style={{ transform: "rotate(90deg)" }} size={20} className={styles.icon} />
                  <div className={styles.dataText}>
                    <span className={styles.label}>Telefone:</span>
                    <p>{userData.telefone}</p>
                  </div>
                </div>
              )}
              {userData.numeroDocumento && (
                <div className={styles.dataRow}>
                  <FaIdCard size={20} className={styles.icon} />
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
    </div>
  );
};

export default MyDataPage;