"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Recompensa } from "@prisma/client";
import Image from "next/image";
import { recompensasMock, RecompensaMock } from "../data/mocks/recompensas";

//icons
import { FaArrowRight } from "react-icons/fa6";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  papel: string;
  numeroDocumento: string;
  telefone: string;
  saldoPontos: number;
  hierarquia: string;
};

const ResgatePage = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>();
  const [beneficios] = useState<RecompensaMock[]>(recompensasMock);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/usuarios/me");
      if (res.ok) {
        const data = await res.json();
        setUsuario(data);
      }
    };
    fetchUserData();
  }, []);
  console.log("Usuario:", usuario);
  const handleResgatarAgora = (beneficio: RecompensaMock) => {
    router.push(`/resgate/${beneficio.id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Olá {usuario?.nome}!</h1>
      <p className={styles.subTitle}>
        Confira os benefícios disponíveis para você.
      </p>
      <div className={styles.header}>
        <div className={styles.pointsCard}>
          <p>Total de Pontos</p>
          <div className={styles.pointsValue}>
            <span>{usuario?.saldoPontos} Real Points</span>
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
                  src={beneficio.imagens[0] || "/placeholder.png"}
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
                onClick={() => {
                  if (usuario?.saldoPontos >= beneficio.custo) {
                    handleResgatarAgora(beneficio);
                  } else {
                    alert("Você não tem pontos suficientes!");
                  }
                }}
                className={styles.resgatarButton}
                disabled={usuario?.saldoPontos < beneficio.custo}
              >
                {usuario?.saldoPontos < beneficio.custo
                  ? "Pontos insuficientes"
                  : "Resgatar Agora"}
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
