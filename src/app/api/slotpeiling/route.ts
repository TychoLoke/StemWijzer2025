import { NextResponse } from "next/server";
import { slotPeilingData } from "@/data/slotpeiling";

export async function GET() {
  return NextResponse.json(slotPeilingData);
}
