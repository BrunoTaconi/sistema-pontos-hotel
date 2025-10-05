import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, TextField, Button, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";
import { useAdministracaoViewModel } from "./use-administracao-model";

export function AdministracaoView(
  props: ReturnType<typeof useAdministracaoViewModel>
) {
  const {
    usuarios,
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
  } = props;

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "hierarquia", headerName: "Papel", flex: 0.7 },
    { field: "numeroDocumento", headerName: "Identificação", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 0.8 },
    { field: "saldoPontos", headerName: "Saldo", flex: 0.5 },
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

  if (loading) return <div className={styles.container}>Carregando...</div>;

  return (
    <>
      <ToastContainer />

      <div className={styles.container}>
        <div className={styles.backContainer}>
          <button className={styles.backButton} onClick={backFuntion}>
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
            rows={usuarios}
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
                  value={pontosAdicionar}
                  onChange={(e) => setPontosAdicionar(Number(e.target.value))}
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
