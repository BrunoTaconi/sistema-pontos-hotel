"use client";
import { useEffect, useState } from "react";
import { administracaoService } from "../../app/(app)/administracao/service";
import { Usuario } from "@/app/types/usuario";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useAdministracaoViewModel() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [pontosAdicionar, setPontosAdicionar] = useState(0);

  const backFuntion = () => {
    router.back();
  };

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await administracaoService.getUsuarios();
      setUsuarios(data);
    } catch (err) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setOpenModal(true);
  };

  const handleAdicionarPontos = async () => {
    if (!usuarioSelecionado) return;

    if (pontosAdicionar <= 0) {
      toast.error("Quantidade inválida", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (pontosAdicionar > 4) {
      toast.error("Você não pode adicionar mais de 4 pontos por vez!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await administracaoService.adicionarPontos(
        usuarioSelecionado.id,
        pontosAdicionar
      );
      fetchUsuarios();
      setOpenModal(false);
    } catch {
      toast.error("Erro ao adicionar pontos");
    }
  };

  const handleRemoverPontos = async () => {
    if (!usuarioSelecionado) return;
    if (pontosAdicionar <= 0) {
      toast.error("Quantidade inválida");
      return;
    }
    try {
      await administracaoService.removerPontos(
        usuarioSelecionado.id,
        pontosAdicionar
      );
      fetchUsuarios();
      setOpenModal(false);
    } catch {
      toast.error("Erro ao remover pontos");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filteredUsuarios = usuarios.filter((u) =>
    [u.nome, u.numeroDocumento, u.email, u.telefone].some((f) =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return {
    usuarios: filteredUsuarios,
    search,
    setSearch,
    usuarioSelecionado,
    openModal,
    setOpenModal,
    pontosAdicionar,
    setPontosAdicionar,
    handleOpenModal,
    handleAdicionarPontos,
    handleRemoverPontos,
    loading,
    backFuntion,
  };
}
