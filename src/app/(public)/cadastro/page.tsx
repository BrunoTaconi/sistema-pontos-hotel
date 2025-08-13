"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles.module.css";

export default function CadastroStep1() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");

  const handleContinue = () => {
    if (cpf.trim()) {
      router.push(`/cadastro/form?cpf=${encodeURIComponent(cpf)}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Bem vindo ao Clube de Vantagens!</h1>
        <p className={styles.subtitle}>Para continuar, digite seu CPF</p>

        <input
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className={styles.input}
        />

        <button className={styles.buttonPrimary} onClick={handleContinue}>
          Continuar
        </button>

        <button
          className={styles.buttonSecondary}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
