"use client";
import { useLoginViewModel } from "./use-login-model";
import styles from "./styles.module.css";
import Image from "next/image";

export function LoginView(props: ReturnType<typeof useLoginViewModel>) {
  const { formData, error, handleChange, handleLogin, pushCadastro } = props;

  return (
    <div className={styles.container}>
      <Image
        src="/logo.png"
        alt="Logo"
        width={302.88}
        height={70}
        className={styles.logo}
      />
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo de volta!</h1>
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
        {error && (
          <p style={{ color: "red", fontSize: "0.8rem", marginBottom: "1rem" }}>
            {error}
          </p>
        )}
        <button className={styles.buttonPrimary} onClick={handleLogin}>
          Entrar
        </button>
      </div>
      <div className={styles.bottomDiv}>
        <p>Ainda não possui uma conta?</p>
        <button className={styles.buttonSecondary} onClick={pushCadastro}>
          Criar conta
        </button>
      </div>
    </div>
  );
}
