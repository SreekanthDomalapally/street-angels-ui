import { cookies } from "next/headers";
import { getUserIdFromSession } from "./mock-store";

export const SESSION_COOKIE = "sa_session";

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function getSessionUserId(): Promise<string | null> {
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  return getUserIdFromSession(sessionId);
}

export function sessionCookieOptions(sessionId: string) {
  return {
    name: SESSION_COOKIE,
    value: sessionId,
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    maxAge: 0,
  };
}
