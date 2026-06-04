import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { addContact, listContacts } from "@/lib/mock-store";

export async function GET() {
  const result = await requireUser();
  if ("error" in result) return result.error;
  return NextResponse.json(listContacts(result.userId));
}

export async function POST(request: Request) {
  const result = await requireUser();
  if ("error" in result) return result.error;

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const priority =
    typeof body.priority === "number" ? body.priority : listContacts(result.userId).length + 1;

  if (!name.trim() || !phone.trim()) {
    return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
  }

  const contact = addContact(result.userId, { name, phone, priority });
  return NextResponse.json(contact, { status: 201 });
}
