"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Recompensa } from "@/generated/prisma";
import Image from "next/image";
//icons
import { FaArrowRight } from "react-icons/fa6";

const ResgatePage = () => {
  const router = useRouter();
  const [beneficios, setBeneficios] = useState<Recompensa[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    // Aqui você deve buscar o usuário logado para obter o nome e o saldo
    // Por enquanto, vamos simular a busca
    const fetchUserData = async () => {
        // Simulação de busca de usuário (substituir pela lógica real)
        // const res = await fetch('/api/me');
        // const user = await res.json();
        // setNomeUsuario(user.nome);
        // setSaldo(user.saldo);
        setNomeUsuario("Guilherme"); // Mocado
        setSaldo(25); // Mocado
    };

    const fetchBeneficios = async () => {
      const res = await fetch('/api/recompensas');
      const data = await res.json();
      setBeneficios(data);
    };

    fetchUserData();
    fetchBeneficios();
  }, []);


  const handleResgatarAgora = (beneficio: Recompensa) => {
    router.push(`/resgate/${beneficio.id}`);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Olá {nomeUsuario}!</h1>
      <p className={styles.subTitle}>
        Confira os benefícios disponíveis para você.
      </p>
      <div className={styles.header}>
        <div className={styles.pointsCard}>
          <p>Total de Pontos</p>
          <div className={styles.pointsValue}>
            <span>{saldo} Real Points</span>
          </div>
        </div>
        <button className={styles.conferirButton}>
          Conferir Benefícios
          <FaArrowRight size={17} />
        </button>
      </div>
      <div className={styles.beneficiosContainer}>
        <h1 className={styles.title}>Benefícios</h1>
        <div className={styles.grid}>
          {beneficios.map((beneficio) => (
            <div key={beneficio.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={beneficio.imagem || "/placeholder.png"}
                  alt={beneficio.nome}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </div>
              <h3>{beneficio.nome}</h3>
              <p className={styles.cardPoints}>
                <Image
                  src="/icon.svg"
                  alt="Real Points"
                  width={16}
                  height={16}
                />
                {beneficio.custo} Real Points
              </p>
              <button
                onClick={() => handleResgatarAgora(beneficio)}
                className={styles.resgatarButton}
              >
                Resgatar Agora
                <FaArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResgatePage;