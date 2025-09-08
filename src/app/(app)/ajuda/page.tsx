"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";

const AjudaPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        <div className={styles.backContainer}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FaArrowLeft size={17} />
          </button>
          <p>Ajuda</p>
        </div>

        <div className={styles.ajudaContainer}>
          <div className={styles.ajudaCard}>
            <h1 className={styles.title}>Como Ganhar Pontos?</h1>
            <p className={styles.subTitle}>
              Confira abaixo as formas de acumular seus Real Points (rp).
            </p>
            <div className={styles.section}>
              <h2>Criação de Conta</h2>
              <p>
                Ao se cadastrar no nosso programa, você já recebe uma
                recompensa de boas-vindas!
              </p>
              <div className={styles.pointsInfo}>
                <p>3 RP</p>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Reservas de Quartos</h2>
              <p>
                A cada diária reservada, você acumula pontos de acordo com a
                categoria do quarto!
              </p>
              <ul className={styles.pointsList}>
                <li>
                  <p>Luxo: <span>2 RP</span></p>
                </li>
                <li>
                  <p>Master: <span>3 RP</span></p>
                </li>
                <li>
                  <p>Dupla: <span>3 RP</span></p>
                </li>
                <li>
                  <p>Real: <span>4 RP</span></p>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Indicações</h2>
              <p>
                Ganhe pontos extras a cada nova reserva de um amigo que usar seu
                cupom de indicação! (Máximo de 5 indicações por CPF)
              </p>
              <div className={styles.pointsInfo}>
                <p>1 RP</p>
              </div>
            </div>
          </div>

          <div className={styles.ajudaCard}>
            <h1 className={styles.title}>Prêmios Disponíveis</h1>
            <p className={styles.subTitle}>
              Resgate seus pontos por prêmios incríveis!
            </p>
            <ul className={styles.pointsList}>
              <li>
                <p><span>10 rp</span> - 30% off em decoração de quarto</p>
              </li>
              <li>
                <p><span>20 rp</span> - Uma luminária relógio com carregador para celular embutido</p>
              </li>
              <li>
                <p><span>40 rp</span> - Máquina de café expresso</p>
              </li>
              <li>
                <p><span>100 rp</span> - iPhone 13 (único por CPF)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjudaPage;