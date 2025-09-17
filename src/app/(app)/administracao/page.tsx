"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Modal,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Usuario } from "@/app/types/usuario";
import { useUser } from "@/app/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PainelAdministrativo() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(
    null
  );
  const [pontosAdicionar, setPontosAdicionar] = useState(0);
  const { usuario, loading } = useUser();

  useEffect(() => {
    if (usuario?.hierarquia !== "admin") return;

    const delayDebounce = setTimeout(() => {
      fetchUsuarios();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [usuario, search]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(
        `/api/usuarios?search=${encodeURIComponent(search)}`
      );
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    [
      usuario.nome,
      usuario.numeroDocumento,
      usuario.email,
      usuario.telefone,
    ].some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenModal = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setOpenModal(true);
  };

  const handleAdicionarPontos = async () => {
    if (!usuarioSelecionado) return;

    if (pontosAdicionar > 4) {
      toast.error("Você não pode adicionar mais de 4 pontos por vez!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    await fetch(`/api/usuarios/${usuarioSelecionado.id}/pontos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pontos: Math.abs(pontosAdicionar) }),
    });

    setOpenModal(false);
    fetchUsuarios();
  };

  const handleRemoverPontos = async () => {
    if (!usuarioSelecionado) return;

    await fetch(`/api/usuarios/${usuarioSelecionado.id}/pontos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pontos: -Math.abs(pontosAdicionar) }),
    });

    setOpenModal(false);
    fetchUsuarios();
  };

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "hierarquia", headerName: "Papel", flex: 0.7 },
    { field: "numeroDocumento", headerName: "Identificação", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 0.8 },
    {
      field: "saldoPontos",
      headerName: "Saldo",
      flex: 0.5,
    },
    {
      field: "acao",
      headerName: "Ação",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          className={styles.addButton}
          onClick={() => handleOpenModal(params.row)}
        >
          Alterar pontuação
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!usuario || usuario.hierarquia !== "admin") {
    return (
      <div className={styles.container}>
        <div className={styles.backContainer}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FaArrowLeft size={17} />
          </button>
          <p>Painel Administrativo</p>
        </div>
        <span>Você não possui permissão para visualizar esta tela.</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <div className={styles.container}>
        <div className={styles.backContainer}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FaArrowLeft size={17} />
          </button>
          <p>Painel Administrativo</p>
        </div>

        <TextField
          placeholder="Buscar usuário..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--bg-primary)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              transition: "all 0.2s ease",

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },

              "&:hover": {
                backgroundColor: "#fcfcfc",
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.3)",
              },
            },
            "& input": {
              padding: "12px",
              fontSize: "0.95rem",
              fontFamily: "Poppins",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />

        <div className={styles.tableContainer}>
          <DataGrid
            rows={filteredUsuarios}
            columns={columns}
            rowHeight={70}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            sx={{
              border: "none",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--bg-primary)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              fontFamily: "Poppins",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid var(--bg-secondary)",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid var(--bg-secondary)",
                backgroundColor: "var(--bg-secondary)",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "var(--bg-secondary)",
                transition: "background-color 0.2s ease",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid var(--bg-secondary)",
              },
            }}
          />
        </div>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className={styles.modal}>
            <p className={styles.modalTitle}>Adicionar/Remover Pontos</p>
            {usuarioSelecionado && (
              <>
                <TextField
                  label="Usuário"
                  value={usuarioSelecionado.nome}
                  fullWidth
                  disabled
                  className={styles.input}
                />
                <TextField
                  label="Email"
                  value={usuarioSelecionado.email}
                  fullWidth
                  disabled
                  className={styles.input}
                />
                <TextField
                  label="Identificação"
                  value={usuarioSelecionado.numeroDocumento}
                  fullWidth
                  disabled
                  className={styles.input}
                />
                <TextField
                  label="Telefone"
                  value={usuarioSelecionado.telefone}
                  fullWidth
                  disabled
                  className={styles.input}
                />
                <TextField
                  label="Saldo Atual"
                  value={`${usuarioSelecionado.saldoPontos} rp`}
                  fullWidth
                  disabled
                  className={styles.input}
                />

                <TextField
                  label="Quantidade de pontos adicionar/remover"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={pontosAdicionar}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPontosAdicionar(val < 0 ? 0 : val);
                  }}
                  fullWidth
                  className={styles.input}
                />

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "1rem" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdicionarPontos}
                    fullWidth
                  >
                    Adicionar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleRemoverPontos}
                    fullWidth
                  >
                    Remover
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}
