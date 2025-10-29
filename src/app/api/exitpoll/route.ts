import { NextResponse } from "next/server";
import { exitPollSnapshot } from "@/data/exitpoll";

export async function GET() {
  return NextResponse.json(exitPollSnapshot);
}
