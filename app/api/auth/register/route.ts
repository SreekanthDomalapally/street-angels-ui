import { NextResponse } from "next/server";
import { createSession, registerUser } from "@/lib/mock-store";
import { sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";

  if (!name.trim() || !email.trim()) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const user = registerUser({ name, email });
  const sessionId = createSession(user.id);
  const response = NextResponse.json(user);
  response.cookies.set(sessionCookieOptions(sessionId));
  return response;
}
