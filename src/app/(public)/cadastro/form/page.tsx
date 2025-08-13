"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../styles.module.css";

export default function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cpfParam = searchParams.get("cpf");

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    nascimento: "",
    email: "",
    celular: "",
    estado: "",
    cidade: "",
    senha: "",
    confirmarSenha: ""
  });

  useEffect(() => {
    if (cpfParam) {
      setFormData((prev) => ({ ...prev, cpf: cpfParam }));
    }
  }, [cpfParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Cadastre-se</h1>
        <p className={styles.subtitle}>
          Digite seu nome e sua data de nascimento para continuar seu cadastro
        </p>

        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className={styles.input} />
        <input name="cpf" value={formData.cpf} disabled className={styles.input} />
        <input name="nascimento" placeholder="Nascimento" value={formData.nascimento} onChange={handleChange} className={styles.input} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} />
        <input name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} className={styles.input} />
        <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} className={styles.input} />
        <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} className={styles.input} />
        <input name="senha" type="password" placeholder="Senha" value={formData.senha} onChange={handleChange} className={styles.input} />
        <input name="confirmarSenha" type="password" placeholder="Confirmar Senha" value={formData.confirmarSenha} onChange={handleChange} className={styles.input} />

        <button className={styles.buttonPrimary} onClick={handleSubmit}>
          Continuar
        </button>
      </div>
    </div>
  );
}
