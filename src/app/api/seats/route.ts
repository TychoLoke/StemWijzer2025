import { NextRequest, NextResponse } from "next/server";
import { exitPollSnapshot } from "@/data/exitpoll";
import {
  combinedMunicipalityResults,
  combinedMunicipalitySeatProjection,
} from "@/data/municipal-results";
import { MAJORITY } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const dataset = request.nextUrl.searchParams.get("dataset");

  if (dataset === "live") {
    return NextResponse.json({
      parties: combinedMunicipalitySeatProjection,
      majority: MAJORITY,
      updatedAt: combinedMunicipalityResults.updatedAt,
      sourceLabel: "Live tellingen — Landelijk totaal",
    });
  }

  return NextResponse.json({
    parties: exitPollSnapshot.parties,
    majority: exitPollSnapshot.majority,
    updatedAt: exitPollSnapshot.updatedAt,
    sourceLabel: "exitpoll 22:15",
  });
}
