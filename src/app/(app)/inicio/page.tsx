"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";
import { recompensasMock, RecompensaMock } from "../data/mocks/recompensas";
import { useUser } from "@/app/contexts/UserContext";

//icons
import { FaArrowRight } from "react-icons/fa6";
import { TbCopy, TbCopyCheck } from "react-icons/tb";

const InicioPage = () => {
  const router = useRouter();

  const { usuario, loading } = useUser();
  const [beneficios] = useState<RecompensaMock[]>(recompensasMock);

  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!usuario && !loading) {
      if (!usuario && !loading) {
        router.push("/login");
      }
    }
  }, [usuario, loading, router]);

  if (loading || !usuario) {
    return <p>Carregando...</p>;
  }

  const handleResgatarAgora = (beneficio: RecompensaMock) => {
    router.push(`/inicio/${beneficio.id}`);
  };

  const copiarCodigoConvite = () => {
    if (usuario.codigoConvite) {
      navigator.clipboard
        .writeText(usuario.codigoConvite)
        .then(() => {
          setCopiado(true);

          setTimeout(() => {
            setCopiado(false);
          }, 3000);
        })
        .catch((err) => {
          console.error("Erro ao copiar: ", err);
        });
    }
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
          <div className={styles.totalPontos}>
            <Image
              alt="Real point Coin"
              src={"/rp_coin.png"}
              width={22}
              height={22}
            />
            <div className={styles.pointsValue}>
              <span>{usuario?.saldoPontos} Real Points</span>
            </div>
          </div>
        </div>
        <div className={styles.codigoConvite}>
          <p>
            {" "}
            <strong>{usuario.limiteConvites - usuario.usosConvite}</strong>{" "}
            convites restantes
          </p>
          <p>Seu código de convite:</p>
          <div className={styles.copiarCodigo}>
            <span>{usuario.codigoConvite}</span>
            <button
              onClick={copiarCodigoConvite}
              className={`${styles.copiarBtn} ${copiado ? styles.copiado : ""}`}
              disabled={copiado}
            >
              {copiado ? (
                <>
                  <TbCopyCheck size={18} className={styles.icon}/>
                  <span className={styles.feedbackText}>Copiado!</span>
                </>
              ) : (
                <TbCopy size={18} className={styles.icon}/>
              )}
            </button>
          </div>
        </div>
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
              {/* <button
                onClick={() => {
                  if (usuario!.saldoPontos >= beneficio.custo) {
                    handleResgatarAgora(beneficio);
                  } else {
                    alert("Você não tem pontos suficientes!");
                  }
                }}
                className={styles.resgatarButton}
                disabled={usuario!.saldoPontos < beneficio.custo}
              >
                {usuario!.saldoPontos < beneficio.custo
                  ? "Pontos insuficientes"
                  : "Detalhes"}
                <FaArrowRight size={18} />
              </button> */}
              <button
                onClick={() => {
                  handleResgatarAgora(beneficio);
                }}
                className={styles.resgatarButton}
              >
                Detalhes
                <FaArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InicioPage;
