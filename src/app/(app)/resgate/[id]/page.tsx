"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../styles.module.css";
import { Recompensa } from "@/generated/prisma";
import Image from "next/image";

const DetalheBeneficioContent = () => {
  const params = useParams();
  const router = useRouter();
  const [beneficio, setBeneficio] = useState<Recompensa | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saldo, setSaldo] = useState(25);
  const idUsuario = 1;

  useEffect(() => {
    const fetchBeneficio = async () => {
      if (params?.id) {
        const res = await fetch(`/api/recompensas/${params.id}`);
        const data = await res.json();
        setBeneficio(data);
      }
    };
    fetchBeneficio();
  }, [params.id]);

  const handleResgateConfirmado = async () => {
    if (beneficio) {
      try {
        const res = await fetch("/api/resgate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUsuario, idRecompensa: beneficio.id }),
        });

        if (res.ok) {
          setSaldo(saldo - beneficio.custo);
          setShowConfirmModal(false);
          setShowSuccessModal(true);
        } else {
          // Tratar erro de saldo insuficiente ou outro erro
          const errorData = await res.json();
          alert(errorData.error || "Não foi possível resgatar a recompensa.");
          setShowConfirmModal(false);
        }
      } catch (error) {
        alert("Erro de conexão ao tentar resgatar.");
      }
    }
  };

  if (!beneficio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.detalheContainer}>
      <button onClick={() => router.back()} className={styles.backButton}>
        &larr; Voltar
      </button>
      <div className={styles.detalheGrid}>
        <div className={styles.imageGallery}>
          <Image
            src={beneficio.imagem || "/placeholder.png"}
            alt={beneficio.nome}
            width={500}
            height={400}
            className={styles.mainImage}
          />
          {/* Imagens da galeria aqui, se houver */}
        </div>
        <div className={styles.detalheInfo}>
          <p>Recompensa</p>
          <h1>{beneficio.nome}</h1>
          <p>{beneficio.descricao}</p>
          <div className={styles.detalhePoints}>
            <Image src="/logo.png" alt="Real Points" width={20} height={20} />
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

      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              onClick={() => setShowConfirmModal(false)}
              className={styles.closeModalButton}
            >
              X
            </button>
            <h2>Resgatar Recompensa</h2>
            <p>
              Essa recompensa custa {beneficio.custo} Real Points. Seu novo
              saldo será de:
            </p>
            <div className={styles.saldoInfo}>
              <div>
                <p>Antigo</p>
                <span>{saldo} rp</span>
              </div>
              <span>&darr;</span>
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

      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.successIcon}>✓</div>
            <h2>Recompensa resgatada com sucesso!</h2>
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
