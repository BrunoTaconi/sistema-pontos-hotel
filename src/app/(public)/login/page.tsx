"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";
import Cookies from "js-cookie";
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: "", senha: "" });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    setError("");
    const payload = {
      identifier: formData.identifier.includes("@")
        ? formData.identifier.trim()
        : formData.identifier.replace(/\D/g, ""),
      senha: formData.senha,
    };
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const { token } = await res.json();
        Cookies.set("token", token, { expires: 1 });
        router.push("/inicio");
      } else {
        const errorData = await res.json();
        setError(errorData.error || errorData.message || "Falha no login.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    }
  };
  return (
    <div className={styles.container}>
      {" "}
      <img src="/logo.png" alt="Logo" className={styles.logo} />{" "}
      <div className={styles.card}>
        {" "}
        <h1 className={styles.title}>Bem-vindo de volta!</h1>{" "}
        <input
          name="identifier"
          placeholder="Digite o email ou CPF"
          value={formData.identifier}
          onChange={handleChange}
          className={styles.input}
        />{" "}
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className={styles.input}
        />{" "}
        {error && (
          <p style={{ color: "red", fontSize: "0.8rem", marginBottom: "1rem" }}>
            {" "}
            {error}{" "}
          </p>
        )}{" "}
        <button className={styles.buttonPrimary} onClick={handleLogin}>
          {" "}
          Entrar{" "}
        </button>{" "}
      </div>{" "}
      <div className={styles.bottomDiv}>
        {" "}
        <p>Ainda não possui uma conta?</p>{" "}
        <button
          className={styles.buttonSecondary}
          onClick={() => router.push("/cadastro")}
        >
          {" "}
          Criar conta{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
