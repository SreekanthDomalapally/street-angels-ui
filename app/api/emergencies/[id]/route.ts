import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { updateEmergency } from "@/lib/mock-store";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const result = await requireUser();
  if ("error" in result) return result.error;

  const { id } = await params;
  const body = await request.json();
  const status = body.status === "resolved" || body.status === "cancelled" ? body.status : undefined;

  const emergency = updateEmergency(result.userId, id, { status });
  if (!emergency) {
    return NextResponse.json({ error: "Emergency not found" }, { status: 404 });
  }
  return NextResponse.json(emergency);
}
