"use client";

import { useState } from "react";
import styles from "../styles.module.css";

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<"email" | "cpf">("email");
  const [formData, setFormData] = useState({ email: "", cpf: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(formData);
   
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Login</h1>

        <div style={{ marginBottom: "1rem" }}>
          <button
            className={styles.buttonSecondary}
            onClick={() => setLoginMethod("email")}
          >
            Usar Email
          </button>
          <button
            className={styles.buttonSecondary}
            onClick={() => setLoginMethod("cpf")}
          >
            Usar CPF
          </button>
        </div>

        {loginMethod === "email" ? (
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        ) : (
          <input
            name="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
            className={styles.input}
          />
        )}

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className={styles.input}
        />

        <button className={styles.buttonPrimary} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
