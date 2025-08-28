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
import { Usuario } from "../resgate/page";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function PainelAdministrativo() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario[]>();
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(
    null
  );
  const [pontosAdicionar, setPontosAdicionar] = useState(20);

  const router = useRouter();

  useEffect(() => {
    fetchUsuarios();
    fetchUsuario();
  }, [search]);

  const fetchUsuario = async () => {
    const res = await fetch("/api/usuarios/me");
    if (res.ok) {
      const data = await res.json();
      setUsuario(data);
    }
  };

  const fetchUsuarios = async () => {
    const res = await fetch(`/api/usuarios?search=${search}`);
    const data = await res.json();
    setUsuarios(data);
  };

  const handleOpenModal = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setOpenModal(true);
  };

  const handleAdicionarPontos = async () => {
    if (!usuarioSelecionado) return;
    await fetch(`/api/usuarios/${usuarioSelecionado.id}/pontos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pontos: pontosAdicionar }),
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
      valueFormatter: (params: any) => `${params?.value}`,
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
          Adicionar
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backContainer}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FaArrowLeft size={17} />
        </button>
        <p>Painel Administrativo</p>
      </div>

      {usuario?.hierarquia === "admin" ? (
        <>
          <TextField
            placeholder="Buscar usuário (Nome, CPF, Email, ou Telefone)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            className={styles.searchBar}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />

          <div className={styles.tableContainer}>
            <DataGrid
              rows={usuarios}
              columns={columns}
              rowHeight={70}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
            />
          </div>
        </>
      ) : (
        <>
          <span>Você não possui permissão para visualizar esta tela.</span>
        </>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.modal}>
          <Typography variant="h6" className={styles.modalTitle}>
            Adicionar Ponto
          </Typography>
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
                label="Quanto de saldo deseja adicionar?"
                type="number"
                value={pontosAdicionar}
                onChange={(e) => setPontosAdicionar(Number(e.target.value))}
                fullWidth
                className={styles.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">💰</InputAdornment>
                  ),
                }}
              />

              <Button
                className={styles.addButton}
                onClick={handleAdicionarPontos}
                fullWidth
              >
                Adicionar
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
