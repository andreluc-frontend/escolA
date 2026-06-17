import { ADMIN_CODE_COOKIE, ADMIN_VERIFIED_COOKIE, AUTH_COOKIE } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
  });

  response.cookies.delete(AUTH_COOKIE);
  response.cookies.delete(ADMIN_CODE_COOKIE);
  response.cookies.delete(ADMIN_VERIFIED_COOKIE);

  return response;
}
