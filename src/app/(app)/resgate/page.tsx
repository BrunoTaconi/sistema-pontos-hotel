"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Recompensa } from "@/generated/prisma";
import Image from "next/image";
//icons
import { FaArrowRight } from "react-icons/fa6";

// Dados mockados de benefícios
const mockBeneficios: Recompensa[] = [
  {
    id: 1,
    nome: "30% OFF em Itens de Decoração",
    descricao:
      "Transforme a decoração da sua casa com elegância e sofisticação com este Kit de Vasos Decorativos em Cerâmica. Composto por peças artesanais em tons de verde e bege com acabamento esmaltado e texturas onduladas, este conjunto é ideal para compor estantes, racks, aparadores e mesas de centro.",
    custo: 10,
    ativo: true,
    criadoEm: new Date(),
    imagem: "/decoracao/capa.jpg",
  },
  {
    id: 2,
    nome: "Luminária relógio com carregador",
    descricao: "",
    custo: 20,
    ativo: true,
    criadoEm: new Date(),
    imagem: "/luminaria/capa.jpg",
  },
  {
    id: 3,
    nome: "Máquina de café expresso",
    descricao: "",
    custo: 40,
    ativo: true,
    criadoEm: new Date(),
    imagem: "/maquina_cafe/capa.jpg",
  },
  {
    id: 4,
    nome: "Iphone 13",
    descricao: "",
    custo: 40,
    ativo: true,
    criadoEm: new Date(),
    imagem: "/iphone/capa.jpg",
  },
];

const ResgatePage = () => {
  const router = useRouter();

  const handleResgatarAgora = (beneficio: Recompensa) => {
    router.push(`/resgate/${beneficio.id}`);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Olá Guilherme!</h1>
      <p className={styles.subTitle}>
        Confira os benefícios disponíveis para você.
      </p>
      <div className={styles.header}>
        <div className={styles.pointsCard}>
          <p>Total de Pontos</p>
          <div className={styles.pointsValue}>
            <span>25 Real Points</span>
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
          {mockBeneficios.map((beneficio) => (
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
