import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { createEmergency } from "@/lib/mock-store";

export async function POST() {
  const result = await requireUser();
  if ("error" in result) return result.error;
  const emergency = createEmergency(result.userId);
  return NextResponse.json(emergency, { status: 201 });
}
