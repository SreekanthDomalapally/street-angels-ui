import { NextResponse } from "next/server";
import { createSession, loginUser, registerUser } from "@/lib/mock-store";
import { sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email : "";
  const name =
    typeof body.name === "string" ? body.name : email.split("@")[0] || "User";

  if (!email.trim()) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  let user = loginUser(email);
  if (!user) {
    user = registerUser({ name, email });
  }

  const sessionId = createSession(user.id);
  const response = NextResponse.json(user);
  response.cookies.set(sessionCookieOptions(sessionId));
  return response;
}
