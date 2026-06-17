import "./globals.css";

import Link from "next/link";

import styles from "./layout.module.css";

export const metadata = {
  title: "Clinica MG",
};

export default function RootLayout({ children }) {

  return (

    <html lang="pt-BR">

      <body>

        <nav className={styles.navbar}>

          <div className={styles.container}>

            <h1 className={styles.logo}>
              Escola de Ensino Médio Jagam
            </h1>

            <div className={styles.links}>

              <Link href="/">
                Início
              </Link>

              <Link href="/cadastro">
                Cadastro
              </Link>

              <Link href="/clientes">
                Usuarios
              </Link>

              <Link href="/dashboard">
                Dashboard
              </Link>

              <Link href="/login">
                Login
              </Link>

            </div>

          </div>

        </nav>

        <main className={styles.main}>
          {children}
        </main>

        <footer className={styles.footer}>
          © 2026 EDEM Jagam
        </footer>

      </body>

    </html>

  );

}