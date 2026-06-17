import pool from "@/lib/db";
import { obterUsuarioDaRequisicao, usuarioEhAdmin } from "@/lib/auth";

// UPDATE
export async function PUT(req, context) {
  const usuarioLogado = obterUsuarioDaRequisicao(req);

  if (!usuarioEhAdmin(usuarioLogado)) {
    return Response.json(
      { error: "Acesso permitido apenas para administradores" },
      { status: 403 }
    );
  }

  const { id } = await context.params;

  const body = await req.json();

  const {
    nome,
    email,
    perfil,
  } = body;

  await pool.query(
    `
    UPDATE usuarios
    SET nome=$1,
        email=$2,
        perfil=$3
    WHERE id=$4
    `,
    [
      nome,
      email,
      perfil,
      Number(id),
    ]
  );

  return Response.json({
    ok: true,
  });

}

// DELETE
export async function DELETE(req, context) {
  const usuarioLogado = obterUsuarioDaRequisicao(req);

  if (!usuarioEhAdmin(usuarioLogado)) {
    return Response.json(
      { error: "Acesso permitido apenas para administradores" },
      { status: 403 }
    );
  }

  const { id } = await context.params;

  await pool.query(
    `
    DELETE FROM usuarios
    WHERE id=$1
    `,
    [Number(id)]
  );

  return Response.json({
    ok: true,
  });

}
