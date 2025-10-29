import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const PATHS_TO_REVALIDATE = ["/", "/slotpeiling", "/coalitie"] as const;

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths: PATHS_TO_REVALIDATE });
}
