"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { RecompensaMock, recompensasMock } from "../data/mocks/recompensas";

const AjudaPage = () => {
  const router = useRouter();
  const [beneficios] = useState<RecompensaMock[]>(recompensasMock);

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
          {/* Card: Como Ganhar Pontos */}
          <div className={styles.ajudaCard}>
            <h1 className={styles.cardTitle}>Como Ganhar Pontos?</h1>
            <p className={styles.cardSubTitle}>
              Confira as formas de acumular seus Real Points (rp)!
            </p>

            <div className={styles.section}>
              <h2>Criação de Conta:</h2>
              <div className={styles.pointsBlock}>
                <p className={styles.pointValue}>
                  3 RP
                  <Image
                    src="/rp_coin.png"
                    width={16}
                    height={16}
                    alt="Real Points Coin"
                    className={styles.rpCoinIcon}
                  />
                </p>
                <p className={styles.pointDescription}>Ao criar sua conta.</p>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Reservas de Quartos: </h2>

              <p style={{ marginBottom: "1rem"}}> Minímo de 2 diárias para acumular pontos</p>
              <div className={styles.pointsGrid}>
                <div className={styles.pointItem}>
                  <p>Luxo</p>
                  <span>
                    2 RP
                    <Image
                      src="/rp_coin.png"
                      width={16}
                      height={16}
                      alt="Real Points Coin"
                      className={styles.rpCoinIcon}
                    />
                  </span>
                </div>
                <div className={styles.pointItem}>
                  <p>Master</p>
                  <span>
                    3 RP
                    <Image
                      src="/rp_coin.png"
                      width={16}
                      height={16}
                      alt="Real Points Coin"
                      className={styles.rpCoinIcon}
                    />
                  </span>
                </div>
                <div className={styles.pointItem}>
                  <p>Dupla</p>
                  <span>
                    3 RP
                    <Image
                      src="/rp_coin.png"
                      width={16}
                      height={16}
                      alt="Real Points Coin"
                      className={styles.rpCoinIcon}
                    />
                  </span>
                </div>
                <div className={styles.pointItem}>
                  <p>Real</p>
                  <span>
                    4 RP
                    <Image
                      src="/rp_coin.png"
                      width={16}
                      height={16}
                      alt="Real Points Coin"
                      className={styles.rpCoinIcon}
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Indicações:</h2>
              <div className={styles.pointsBlock}>
                <p className={styles.pointValue}>
                  1 RP
                  <Image
                    src="/rp_coin.png"
                    width={16}
                    height={16}
                    alt="Real Points Coin"
                    className={styles.rpCoinIcon}
                  />
                </p>
                <p className={styles.pointDescription}>
                  Por reserva com cupom de amigo (máx: 5 por CPF).
                </p>
              </div>
            </div>
          </div>

          {/* Card: Prêmios Disponíveis */}
          <div className={styles.ajudaCard}>
            <h1 className={styles.cardTitle}>Prêmios Disponíveis</h1>
            <p className={styles.cardSubTitle}>
              Troque seus pontos por prêmios incríveis!
            </p>

            <div className={styles.premiosGrid}>
              {beneficios.map((beneficio) => (
                <>
                  <div className={styles.premioItem}>
                    <p>{beneficio.nome}</p>
                    <span>{beneficio.custo} RP</span>
                    <Image
                      src="/rp_coin.png"
                      width={16}
                      height={16}
                      alt="Real Points Coin"
                      className={styles.rpCoinIcon}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjudaPage;
