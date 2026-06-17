import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { ADMIN_CODE_COOKIE, ADMIN_VERIFIED_COOKIE, AUTH_COOKIE, gerarCodigoAdmin, gerarToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, perfil, senha } = await req.json();

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 AND perfil = $2",
      [email, perfil]
    );


    const user = result.rows[0];

    if (!user) return NextResponse.json({ error: "Usuario não encontrado"},
    {status: 404});

    const ok = await bcrypt.compare(senha, user.senha);

    if (!ok) return NextResponse.json({ error: "Senha inválida"},
    {status: 401});

    const token = gerarToken({
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
    });

    const adminCode = user.perfil === "Admin" ? gerarCodigoAdmin() : null;

    const response = NextResponse.json({
      ok: true,
      perfil: user.perfil,
      adminCode,
    });

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    response.cookies.delete(ADMIN_VERIFIED_COOKIE);

    if (adminCode) {
      response.cookies.set(ADMIN_CODE_COOKIE, adminCode, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
        path: "/",
      });
    } else {
      response.cookies.delete(ADMIN_CODE_COOKIE);
    }

    return response;
}
