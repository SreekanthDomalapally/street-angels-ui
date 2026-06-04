import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-helpers";

export async function GET() {
  const result = await requireUser();
  if ("error" in result) return result.error;
  return NextResponse.json(result.user);
}
