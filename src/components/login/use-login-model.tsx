"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginService } from "@/app/(public)/login/service";

export interface LoginForm {
  identifier: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export function useLoginViewModel() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    identifier: "",
    senha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setError("");
    const payload: LoginForm = {
      identifier: formData.identifier.includes("@")
        ? formData.identifier.trim()
        : formData.identifier.replace(/\D/g, ""),
      senha: formData.senha,
    };

    try {
      const { token } = await loginService.login(payload);
      Cookies.set("token", token, { expires: 1 });
      router.push("/inicio");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    }
  };

  const backFunction = () => router.back();
  const pushCadastro = () => router.push("/cadastro");

  return {
    formData,
    error,
    handleChange,
    handleLogin,
    backFunction,
    pushCadastro,
  };
}
