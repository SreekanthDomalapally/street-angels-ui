import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { updateUser } from "@/lib/mock-store";

export async function PATCH(request: Request) {
  const result = await requireUser();
  if ("error" in result) return result.error;

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name : undefined;
  const emergencyPhrase =
    body.emergencyPhrase === null || typeof body.emergencyPhrase === "string"
      ? body.emergencyPhrase
      : undefined;

  const user = updateUser(result.userId, { name, emergencyPhrase });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
