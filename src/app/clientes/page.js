"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [perfilLogado] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("perfil");
  });
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nome: "",
    email: "",
    perfil: "",
  });

  async function carregarUsuarios() {
    const response = await fetch("/api/usuarios");
    const data = await response.json();
    setUsuarios(data);
  }

  useEffect(() => {
    let componenteAtivo = true;

    async function buscarUsuarios() {
      const response = await fetch("/api/usuarios");
      const data = await response.json();

      if (componenteAtivo) {
        setUsuarios(data);
      }
    }

    buscarUsuarios();

    return () => {
      componenteAtivo = false;
    };
  }, []);

  async function deletarUsuario(id) {
    const confirmar = window.confirm("Deseja deletar este usuário?");
    if (!confirmar) return;

    await fetch(`/api/usuarios/${id}`, {
      method: "DELETE",
    });

    carregarUsuarios();
  }

  async function salvarAtualizacao(usuario) {
    await fetch(`/api/usuarios/${usuario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formEdit),
    });

    setEditandoId(null);
    carregarUsuarios();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Usuários Cadastrados</h1>

      <div className={styles.grid}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} className={styles.card}>
            {editandoId === usuario.id ? (
              <div className={styles.formEdicao}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={formEdit.nome}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, nome: e.target.value })
                  }
                />
                <select
                  name="perfil"
                  value={formEdit.perfil}
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, perfil: e.target.value })
                  }
                  className={styles.input}
                >
                  <option value="">Selecione o perfil</option>
                  <option value="Admin">Admin</option>
                  <option value="Professor">Professor</option>
                  <option value="Aluno">Aluno</option>
                </select>

              </div>
            ) : (
              <>
                <h2 className={styles.nome}>{usuario.nome}</h2>
                <p>
                  <strong>Email:</strong> {usuario.email}
                </p>
                <p>
                  <strong>Perfil:</strong> {usuario.perfil}
                </p>
              </>
            )}

            <div className={styles.botoes}>
              {editandoId === usuario.id ? (
                <>
                  <button
                    className={styles.editar}
                    onClick={() => salvarAtualizacao(usuario)}
                  >
                    Salvar
                  </button>
                  <button
                    className={styles.cancelar}
                    onClick={() => setEditandoId(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {perfilLogado === "Admin" && (
                    <button
                      className={styles.deletar}
                      onClick={() => deletarUsuario(usuario.id)}
                    >
                      Deletar
                    </button>
                  )}

                  {perfilLogado === "Admin" && (
                    <button
                      className={styles.editar}
                      onClick={() => {
                        setEditandoId(usuario.id);
                        setFormEdit({
                          nome: usuario.nome,
                          email: usuario.email,
                          perfil: usuario.perfil,
                        });
                      }}
                    >
                      Atualizar
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
