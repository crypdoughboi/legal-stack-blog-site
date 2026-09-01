import { NextResponse } from "next/server";
import { STATE_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { env, isAuthConfigured } from "@/lib/env";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-dynamic";

/** Starts the GitHub authorization-code flow. */
export async function GET(request: Request) {
  if (!isAuthConfigured) {
    return NextResponse.json(
      { error: "Sign-in is not configured on this deployment." },
      { status: 503 },
    );
  }

  const origin = siteOrigin(request);
  const state = crypto.randomUUID();

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.githubClientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/auth/callback`);
  authorize.searchParams.set("scope", "read:user");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("allow_signup", "false");

  const response = NextResponse.redirect(authorize.toString());

  // Bound to ten minutes: long enough to sign in, short enough to be useless
  // if it leaks. Compared against the state GitHub echoes back.
  response.cookies.set(STATE_COOKIE, state, sessionCookieOptions(600));

  return response;
}
