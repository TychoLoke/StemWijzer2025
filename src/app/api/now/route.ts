import { NextResponse } from "next/server";
import { SITE_TZ } from "@/lib/constants";

export async function GET() {
  const now = new Date().toISOString();
  return NextResponse.json({ now, tz: SITE_TZ });
}
