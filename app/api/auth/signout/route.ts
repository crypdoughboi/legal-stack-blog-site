import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-dynamic";

/** POST only, so a stray link or prefetch cannot sign the author out. */
export async function POST(request: Request) {
  const response = NextResponse.redirect(
    new URL("/", siteOrigin(request)).toString(),
    { status: 303 },
  );
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return response;
}
