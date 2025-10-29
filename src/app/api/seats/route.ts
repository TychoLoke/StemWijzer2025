import { NextResponse } from "next/server";
import { exitPollSnapshot } from "@/data/exitpoll";

export async function GET() {
  return NextResponse.json({
    parties: exitPollSnapshot.parties,
    majority: exitPollSnapshot.majority,
    updatedAt: exitPollSnapshot.updatedAt,
    sourceLabel: "exitpoll 21:45",
  });
}
