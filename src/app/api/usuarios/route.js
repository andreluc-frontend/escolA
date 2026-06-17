import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { obterUsuarioDaRequisicao, usuarioEhAdmin } from "@/lib/auth";

// CREATE
export async function POST(req) {

  try {

    const body = await req.json();

    const {
      nome,
      email,
      senha,
      perfil,
    } = body;

    const senhaHash = await bcrypt.hash(
      senha,
      10
    );

    const result = await pool.query(
      `
      INSERT INTO usuarios
      (nome,email,senha,perfil)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        nome,
        email,
        senhaHash,
        perfil,
      ]
    );

    return Response.json(
      result.rows[0]
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Erro ao cadastrar",
      },
      {
        status: 500,
      }
    );

  }

}

// READ
export async function GET(req) {
  const result = await pool.query(
    "SELECT id, nome, email, perfil FROM usuarios ORDER BY id DESC"
  );

  return Response.json(
    result.rows
  );

}
