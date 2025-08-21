"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./styles.module.css";
import { Recompensa, Usuario } from "@prisma/client";

// Este tipo é para o objeto que vem da server action
type CurrentUser = (Omit<Usuario, "criadoEm"> & { createdAt: string }) | null;

interface ResgateClientPageProps {
  currentUser: CurrentUser;
  beneficios: Recompensa[];
}

export default function ResgateClientPage({ currentUser, beneficios }: ResgateClientPageProps) {
  const router = useRouter();

  const handleResgatarAgora = (beneficio: Recompensa) => {
    router.push(`/resgate/${beneficio.id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentUser ? `Olá, ${currentUser.nome}!` : 'Carregando...'}</h1>
      <p className={styles.subTitle}>
        Confira os benefícios disponíveis para você.
      </p>
      <div className={styles.header}>
        <div className={styles.pointsCard}>
          <p>Total de Pontos</p>
          <div className={styles.pointsValue}>
            <span>{currentUser?.saldoPontos ?? 0} Real Points</span>
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
}