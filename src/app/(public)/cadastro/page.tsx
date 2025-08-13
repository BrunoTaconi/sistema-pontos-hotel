"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles.module.css";

export default function CadastroStep1() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  };

  const handleContinue = () => {
    if (validateCPF(cpf)) {
      setError("");
      //const unmaskedCpf = cpf.replace(/[^\d]/g, "");
      router.push(`/cadastro/form?cpf=${cpf}`);
    } else {
      setError("Formato de CPF inválido. Use o formato 000.000.000-00");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.card}>
        <h1 className={styles.title}>Bem vindo ao Clube de Vantagens!</h1>
        <p className={styles.subtitle}>Para continuar, digite seu CPF</p>

        <input
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className={styles.input}
          maxLength={14}
        />

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginTop: "-0.5rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

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
