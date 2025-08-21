"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleLogin = async () => {
  //   setError("");
  //   const payload = {
  //     identifier: formData.identifier.includes("@")
  //       ? formData.identifier.trim()
  //       : formData.identifier.replace(/\D/g, ""),
  //     senha: formData.senha,
  //   };
  //   try {
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     if (res.ok) {
  //       const { token } = await res.json();
  //       Cookies.set("token", token, { expires: 1 });
  //       router.push("/resgate");
  //     } else {
  //       const errorData = await res.json();
  //       setError(errorData.error || errorData.message || "Falha no login.");
  //     }
  //   } catch (err) {
  //     setError("Erro de conexão. Tente novamente.");
  //   }
  // };

  const handleLogin = async () => {
    setIsLoading(true);

    signIn("credentials", {
      email: identifier,
      password: senha,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Login bem-sucedido!");
        router.push("/resgate");
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo de volta!</h1>
        <input
          name="identifier"
          placeholder="Digite o email ou CPF"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
          disabled={isLoading}
        />
        <button
          className={styles.buttonPrimary}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
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
