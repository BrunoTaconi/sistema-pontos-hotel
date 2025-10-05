import { Usuario } from "@/app/types/usuario";

const API_URL = "/api/usuarios";

export const administracaoService = {
  async getUsuarios(): Promise<Usuario[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Erro ao buscar usuários");
    return res.json();
  },

  async adicionarPontos(usuarioId: any, pontos: number) {
    const res = await fetch(`${API_URL}/${usuarioId}/pontos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pontos }),
    });
    if (!res.ok) throw new Error("Erro ao adicionar pontos");
    return res.json();
  },

  async removerPontos(usuarioId: any, pontos: number) {
    const res = await fetch(`${API_URL}/${usuarioId}/pontos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pontos: -pontos }),
    });
    if (!res.ok) throw new Error("Erro ao remover pontos");
    return res.json();
  },
};
