"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Login() {

  const [form, setForm] = useState({
    nome: "",
    email: "",
    perfil: "",
    senha: "",
  });

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await fetch(
        "/api/login",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(form),

        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        alert(data.error);

        return;

      }

      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "perfil",
      form.perfil
    );
      alert("Login realizado!");

      window.location.href =
        "/dashboard";

    } catch (error) {

      console.log(error);

      alert("Erro no login");

    }

  }

  return (

    <div className={styles.container}>

      <div className={styles.card}>

        <h1 className={styles.title}>

          Login

        </h1>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="text"
            name="perfil"
            placeholder="Perfil ( Admin, Professor, Aluno )"
            value={form.perfil}
            onChange={handleChange}
            className={styles.input}
          />
          <button className={styles.button}>

            Entrar

          </button>

        </form>

      </div>

    </div>
  );
}