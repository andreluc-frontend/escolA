import styles from "./page.module.css";

import db from "../lib/db";

export default async function Home() {

  const result = await db.query(
    "SELECT COUNT(*) AS total FROM usuarios"
  );

  const totalPacientes =
    result.rows[0].total;

  return (

    <main className={styles.container}>

      <header className={styles.header}>

        <h1 className={styles.logo}>
          Escola de Ensino Médio Jagam
        </h1>

      </header>

      <section className={styles.hero}>

        <div className={styles.content}>

          <h2 className={styles.title}>
            Sistema de ensino
            <br />
            e cadastro profissional
          </h2>

          <p className={styles.description}>

            Organize suas tarefas,
            atividades e materiais didaticos
            em uma plataforma moderna
            e intuitiva.

          </p>

          <div className={styles.buttons}>

            <a
              href="/cadastro"
              className={styles.primaryButton}
            >
              Cadastrar-se
            </a>

            <a
              href="/clientes"
              className={styles.secondaryButton}
            >
              Ver Usuarios
            </a>

          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.cardTop}>
            Usuarios cadastrados
          </div>

          <div className={styles.cardContent}>

            <h3>{totalPacientes}</h3>

            <p>
              Total de Usuarios
            </p>

          </div>

        </div>

      </section>

    </main>

  );

}