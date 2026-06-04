import { NextResponse } from "next/server";
import { getSessionUserId } from "./session";
import { getUser } from "./mock-store";

export async function requireUser() {
  const userId = await getSessionUserId();
  if (!userId) {
    return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  const user = getUser(userId);
  if (!user) {
    return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  return { user, userId };
}
