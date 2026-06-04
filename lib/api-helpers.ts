import { NextResponse } from "next/server";
import { destroySession, getUser, getUserIdFromSession } from "./mock-store";
import { clearSessionCookieOptions, getSessionId } from "./session";

function unauthenticated() {
  const response = NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  response.cookies.set(clearSessionCookieOptions());
  return { error: response };
}

export async function requireUser() {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return unauthenticated();
  }

  const userId = getUserIdFromSession(sessionId);
  if (!userId) {
    return unauthenticated();
  }

  const user = getUser(userId);
  if (!user) {
    destroySession(sessionId);
    return unauthenticated();
  }

  return { user, userId };
}
