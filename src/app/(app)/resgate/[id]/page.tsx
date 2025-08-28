"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../styles.module.css";
import Image from "next/image";
import { recompensasMock, RecompensaMock } from "../../data/mocks/recompensas";
//icons
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const DetalheBeneficioContent = () => {
  const params = useParams();
  const router = useRouter();
  const [beneficio, setBeneficio] = useState<RecompensaMock | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saldo, setSaldo] = useState(25); // mock do saldo do usuário
  const idUsuario = 1;

  useEffect(() => {
    if (params?.id) {
      const found = recompensasMock.find(
        (item) => item.id === Number(params.id)
      );
      if (found) setBeneficio(found);
    }
  }, [params]);

  const handleResgateConfirmado = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setSaldo((prev) => prev - (beneficio?.custo || 0));
  };

  if (!beneficio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.detalheContainer}>
      <div className={styles.backContainer}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FaArrowLeft size={17} />
        </button>
        <p>{beneficio.nome}</p>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.detalheGrid}>
          <div className={styles.images}>
            <div className={styles.thumbnailRow}>
              {beneficio.imagens.slice(2).map((img, idx) => (
                <div className={styles.smallImageWrapper} key={idx}>
                  <Image
                    key={idx}
                    src={img}
                    alt={`${beneficio.nome} foto ${idx + 1}`}
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.detailImageWrapper}>
              <Image
                src={beneficio.imagens[0] || "/placeholder.png"}
                alt={beneficio.nome}
                fill
                style={{
                  objectFit: "contain",
                  borderRadius: "var(--radius-sm)",
                }}
              />
            </div>
          </div>

          <div className={styles.detalheInfo}>
            <div className={styles.topPart}>
              <p>Recompensa</p>
              <h1>{beneficio.nome}</h1>
              <p>{beneficio.descricao}</p>
            </div>
            <div className={styles.bottomPart}>
              <div className={styles.detalhePoints}>
                <Image
                  src="/icon.svg"
                  alt="Real Points"
                  width={20}
                  height={20}
                />
                <span>{beneficio.custo} Real Points</span>
              </div>
              <button
                onClick={() => setShowConfirmModal(true)}
                className={styles.detalheResgatarButton}
                disabled={saldo < beneficio.custo}
              >
                {saldo < beneficio.custo ? "Saldo Insuficiente" : "Resgatar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              onClick={() => setShowConfirmModal(false)}
              className={styles.closeModalButton}
            >
              <IoClose />
            </button>
            <h2>Resgatar Recompensa</h2>
            <p>
              Essa recompensa custa{" "}
              <strong>{beneficio.custo} Real Points</strong> . Seu novo saldo
              será de:
            </p>
            <div className={styles.saldoInfo}>
              <div>
                <p>Antigo</p>
                <span>{saldo} rp</span>
              </div>
              <span>
                <FaArrowRight />
              </span>
              <div>
                <p>Novo Saldo</p>
                <span>{saldo - beneficio.custo} rp</span>
              </div>
            </div>
            <button
              onClick={handleResgateConfirmado}
              className={styles.confirmResgateButton}
            >
              Confirmar Resgate
            </button>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Recompensa resgatada com sucesso!</h2>
            <div className={styles.successIcon}>
              <FaCheck />
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/resgate");
              }}
              className={styles.confirmResgateButton}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DetalheBeneficioPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DetalheBeneficioContent />
    </Suspense>
  );
};

export default DetalheBeneficioPage;
