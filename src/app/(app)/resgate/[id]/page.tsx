"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import styles from "../styles.module.css";
import { Recompensa } from "@/generated/prisma";
import Image from "next/image";

const mockBeneficios: Recompensa[] = [
  { id: 1, nome: "30% OFF em Itens de Decoração", descricao: "Transforme sua casa...", custo: 10, ativo: true, criadoEm: new Date(), imagem: "/decoracao/capa.jpg" },
  { id: 2, nome: "Luminária relógio com carregador", descricao: "Luminária multifuncional...", custo: 20, ativo: true, criadoEm: new Date(), imagem: "/luminaria/capa.jpg" },
  { id: 3, nome: "Máquina de café expresso", descricao: "Prepare espressos encorpados...", custo: 40, ativo: true, criadoEm: new Date(), imagem: "/maquina_cafe/capa.jpg" },
  { id: 4, nome: "Iphone 13", descricao: "iPhone 13 com tela Super Retina...", custo: 40, ativo: true, criadoEm: new Date(), imagem: "/iphone/capa.jpg" },
];

const DetalheBeneficioContent = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const [beneficio, setBeneficio] = useState<Recompensa | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saldo, setSaldo] = useState(25); // Saldo mockado

  useEffect(() => {
    if (params?.id) {
      const found = mockBeneficios.find((b) => b.id === Number(params.id));
      setBeneficio(found || null);
    }
  }, [params.id]);

  const handleResgateConfirmado = () => {
    if (beneficio) {
      setSaldo(saldo - beneficio.custo);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
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
          <p>Itens de Decoração</p>
          <h1>{beneficio.nome}</h1>
          <p>{beneficio.descricao}</p>
          <div className={styles.detalhePoints}>
            <Image src="/logo.png" alt="Real Points" width={20} height={20} />
            <span>{beneficio.custo} Real Points</span>
          </div>
          <button
            onClick={() => setShowConfirmModal(true)}
            className={styles.detalheResgatarButton}
          >
            Resgatar
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
              Resgatar
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
