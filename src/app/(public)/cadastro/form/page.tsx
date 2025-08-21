"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../styles.module.css";
import toast from "react-hot-toast";
import axios from "axios";

export default function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cpfParam = searchParams?.get("cpf");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    nome: "",
    nascimento: "",
    email: "",
    telefone: "",
    estado: "",
    cidade: "",
    senha: "",
    confirmarSenha: "",
  });

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    nascimento: "",
    email: "",
    telefone: "",
    estado: "",
    cidade: "",
    senha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    if (cpfParam) {
      setFormData((prev) => ({ ...prev, cpf: cpfParam }));
    }
  }, [cpfParam]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNascimento = (data: string) =>
    /^\d{2}\/\d{2}\/\d{4}$/.test(data);
  const validateTelefone = (telefone: string) =>
    /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "nascimento") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1");
    }

    if (name === "telefone") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      nome: "",
      nascimento: "",
      email: "",
      telefone: "",
      estado: "",
      cidade: "",
      senha: "",
      confirmarSenha: "",
    };
    let hasError = false;

    if (!formData.nome.trim()) {
      newErrors.nome = "Por favor, preencha seu nome completo.";
      hasError = true;
    }
    if (!validateNascimento(formData.nascimento)) {
      newErrors.nascimento = "Formato de data inválido. Use dd/mm/aaaa.";
      hasError = true;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Formato de e-mail inválido.";
      hasError = true;
    }
    if (!validateTelefone(formData.telefone)) {
      newErrors.telefone = "Formato de telefone inválido. Use (XX) XXXXX-XXXX.";
      hasError = true;
    }
    if (!formData.estado.trim()) {
      newErrors.estado = "Por favor, preencha seu estado.";
      hasError = true;
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = "Por favor, preencha sua cidade.";
      hasError = true;
    }
    if (!formData.senha) {
      newErrors.senha = "Por favor, crie uma senha.";
      hasError = true;
    } else if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
      hasError = true;
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
      hasError = true;
    }

    setErrors(newErrors);
    setIsLoading(true);

    const dataToSubmit = {
      nome: formData.nome,
      nascimento: formData.nascimento,
      email: formData.email,
      telefone: formData.telefone,
      estado: formData.estado,
      cidade: formData.cidade,
      tipoDocumento: "CPF",
      numeroDocumento: formData.cpf.replace(/\D/g, ""),
      senha: formData.senha,
      senhaConfirmada: formData.confirmarSenha,
    };

    axios
      .post("/api/usuarios", dataToSubmit)
      .then(() => {
        toast.success("Conta criada com sucesso!");
        router.push("/resgate");
      })
      .catch((error) => {
        toast.error("Algo deu errado. Tente novamente.");
        console.error("Erro no cadastro:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const ErrorMessage = ({ message }: { message: string }) => {
    return message ? (
      <p
        style={{
          color: "red",
          fontSize: "0.8rem",
          marginTop: "-0.5rem",
          marginBottom: "1rem",
          textAlign: "left",
        }}
      >
        {message}
      </p>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Cadastre-se</h1>
        <p className={styles.subtitle}>
          Preencha seus dados para concluir o cadastro.
        </p>

        <input
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.nome} />

        <input
          name="cpf"
          value={formData.cpf}
          disabled
          className={styles.input}
        />

        <input
          name="nascimento"
          placeholder="Nascimento (dd/mm/aaaa)"
          value={formData.nascimento}
          onChange={handleChange}
          className={styles.input}
          maxLength={10}
        />
        <ErrorMessage message={errors.nascimento} />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.email} />

        <input
          name="telefone"
          placeholder="Telefone ((XX) XXXXX-XXXX)"
          value={formData.telefone}
          onChange={handleChange}
          className={styles.input}
          maxLength={15}
        />
        <ErrorMessage message={errors.telefone} />

        <input
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.estado} />

        <input
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.cidade} />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.senha} />

        <input
          name="confirmarSenha"
          type="password"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          className={styles.input}
        />
        <ErrorMessage message={errors.confirmarSenha} />

        <button
          className={styles.buttonPrimary}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
}
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
