import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { deleteContact, updateContact } from "@/lib/mock-store";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const result = await requireUser();
  if ("error" in result) return result.error;

  const { id } = await params;
  const body = await request.json();
  const data: { priority?: number; name?: string; phone?: string } = {};
  if (typeof body.priority === "number") data.priority = body.priority;
  if (typeof body.name === "string") data.name = body.name;
  if (typeof body.phone === "string") data.phone = body.phone;

  const contact = updateContact(result.userId, id, data);
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json(contact);
}

export async function DELETE(_request: Request, { params }: Params) {
  const result = await requireUser();
  if ("error" in result) return result.error;

  const { id } = await params;
  const ok = deleteContact(result.userId, id);
  if (!ok) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
