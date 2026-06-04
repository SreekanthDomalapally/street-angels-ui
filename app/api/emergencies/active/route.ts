import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";
import { getActiveEmergency } from "@/lib/mock-store";

export async function GET() {
  const result = await requireUser();
  if ("error" in result) return result.error;
  const emergency = getActiveEmergency(result.userId);
  return NextResponse.json({ emergency });
}
