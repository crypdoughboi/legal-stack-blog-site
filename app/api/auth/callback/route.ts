import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  STATE_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";
import { env, isAuthConfigured } from "@/lib/env";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-dynamic";

function deny(origin: string, reason: string) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", reason);
  const response = NextResponse.redirect(url.toString());
  response.cookies.delete(STATE_COOKIE);
  return response;
}

export async function GET(request: Request) {
  const origin = siteOrigin(request);

  if (!isAuthConfigured) return deny(origin, "unconfigured");

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const expectedState = request.headers
    .get("cookie")
    ?.split("; ")
    .find((part) => part.startsWith(`${STATE_COOKIE}=`))
    ?.slice(STATE_COOKIE.length + 1);

  // Both halves of the CSRF check: the state must exist and must match the
  // one this browser was issued when the flow started.
  if (!code || !state || !expectedState || state !== expectedState) {
    return deny(origin, "state");
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({
        client_id: env.githubClientId,
        client_secret: env.githubClientSecret,
        code,
        redirect_uri: `${origin}/api/auth/callback`,
      }),
      cache: "no-store",
    },
  );

  if (!tokenResponse.ok) return deny(origin, "exchange");

  const tokenBody = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
  };

  if (!tokenBody.access_token) return deny(origin, "exchange");

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${tokenBody.access_token}`,
      "user-agent": "the-legal-stack",
    },
    cache: "no-store",
  });

  if (!userResponse.ok) return deny(origin, "profile");

  const profile = (await userResponse.json()) as {
    login?: string;
    name?: string | null;
  };

  const login = profile.login ?? "";

  // Single-author site: exactly one GitHub account may sign in.
  if (!login || login.toLowerCase() !== env.authorGithubLogin) {
    return deny(origin, "forbidden");
  }

  const token = await createSessionToken({
    login,
    name: profile.name ?? null,
  });

  const response = NextResponse.redirect(new URL("/admin", origin).toString());
  response.cookies.set(
    SESSION_COOKIE,
    token,
    sessionCookieOptions(SESSION_MAX_AGE),
  );
  response.cookies.delete(STATE_COOKIE);

  return response;
}
