"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  //const [loginMethod, setLoginMethod] = useState<"email" | "cpf">("email");
  const [formData, setFormData] = useState({ identifier: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(formData);
    Cookies.set("token", "fake-token-do-usuario", { expires: 1 }); // Expira em 1 dia
    router.push("/inicio");
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo de volta!</h1>
        {/* <div style={{ marginBottom: "1rem" }}>
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
        </div> */}

        {/* {loginMethod === "email" ? (
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
        )} */}

        <input
          name="identifier"
          placeholder="Digite o email ou CPF"
          value={formData.identifier}
          onChange={handleChange}
          className={styles.input}
        />

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
      <div className={styles.bottomDiv}>
        <p>Ainda não possui uma conta?</p>
        <button
          className={styles.buttonSecondary}
          onClick={() => router.push("/cadastro")}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
