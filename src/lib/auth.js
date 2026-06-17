import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo123";
export const AUTH_COOKIE = "auth_token";
export const ADMIN_CODE_COOKIE = "admin_code";
export const ADMIN_VERIFIED_COOKIE = "admin_verified";

export function gerarToken(user){
    return jwt.sign(user, SECRET, { expiresIn: "1d"});
}

export function verificarToken(token){
    try{
        return jwt.verify(token, SECRET);
    } catch{
        return null;
    }
}

export function obterUsuarioDaRequisicao(req) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;

    if (!token) {
        return null;
    }

    return verificarToken(token);
}

export function gerarCodigoAdmin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function usuarioEhAdmin(usuario) {
    return usuario?.perfil === "Admin";
}
