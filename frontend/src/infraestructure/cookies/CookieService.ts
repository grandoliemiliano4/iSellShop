"use server";

import { cookies } from "next/headers";
import { CookieEnum } from "../enums/cookieEnum";
import encryptedService from "../../utils/encrypted/encryptedService";
import { redirect } from "next/navigation";

export async function getCookie<T>(cookieName: string): Promise<T | undefined> {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(cookieName);

  console.log(`[getCookie] Leyendo cookie: ${cookieName}`, cookie ? "EXISTE" : "NO EXISTE");

  if (!cookie) return undefined;

  const decrypted = encryptedService.decrypt<T>(cookie.value);
  console.log(`[getCookie] Desencriptado de ${cookieName}:`, decrypted ? "EXITO" : "FALLO (NULL)");

  return decrypted ?? undefined;
}

export async function setCookie(cookieName: string, value: unknown, minutesExpire?: number, encrypt = true): Promise<void> {
  const finalValue = encrypt ? encryptedService.encrypt(value) : JSON.stringify(value);

  const cookieStore = await cookies();
  cookieStore.set(cookieName, finalValue, {
    maxAge: minutesExpire ? minutesExpire * 60 : 3600 * 24 * 7, // 1 week default
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export async function deleteCookie(cookieName: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function deleteSessionCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CookieEnum.Token);
  cookieStore.delete(CookieEnum.Usuario);
  cookieStore.delete(CookieEnum.Role);
}

export async function logoutAndRedirect(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CookieEnum.Token);
  cookieStore.delete(CookieEnum.Usuario);
  cookieStore.delete(CookieEnum.Role);
  redirect("/");
}
