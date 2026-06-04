import { NextResponse } from "next/server";
import { destroySession } from "@/lib/mock-store";
import { clearSessionCookieOptions, getSessionId } from "@/lib/session";

export async function POST() {
  const sessionId = await getSessionId();
  if (sessionId) {
    destroySession(sessionId);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}
