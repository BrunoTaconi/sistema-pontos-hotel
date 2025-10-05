import { LoginForm, LoginResponse } from "@/components/login/use-login-model";

const API_URL = "/api/login";

export const loginService = {
  async login(payload: LoginForm): Promise<LoginResponse> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || errorData.message || "Falha no login."
      );
    }

    return res.json();
  },
};
