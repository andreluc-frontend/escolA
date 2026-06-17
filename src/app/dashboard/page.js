'use client'; // Corrigido: Asas e ponto e vírgula

import { useEffect, useState } from 'react'; // Corrigido: Asas na importação

export default function Dashboard(){
  const [perfil]  = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("perfil") || "";
  });
  
  useEffect(() =>  {
    const token = localStorage.getItem("token");
  
    if(!token) {
      window.location.href = "/login";
    }
  }, []);

  if (perfil == "Admin") {
    return(
      <div>
        <h1>Dashboard do Administrador</h1>
        &nbsp;
        <p>Você pode gerenciar usuários, professores e alunos</p>
      </div>
    );
  }
    if (perfil == "Professor") {
    return(
      <div>
        <h1>Dashboard do Professor</h1>
        &nbsp;
        <p>Você pode acessar turmas, atividades e materiais</p>
      </div>
    );
  }
    if (perfil == "Aluno") {
    return(
      <div>
        <h1>Área do Aluno</h1>
        &nbsp;
        <p>Você pode visualizar atividades e ver informações escolares</p>
      </div>
    );
  }
    return <p>Carregando...</p>
}
