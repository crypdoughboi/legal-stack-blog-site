import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { env, isAuthConfigured } from "./env";

export const SESSION_COOKIE = "ls_session";
export const STATE_COOKIE = "ls_oauth_state";

const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // fourteen days

export type Session = { login: string; name: string | null };

function secretKey() {
  return new TextEncoder().encode(env.authSecret);
}

export async function createSessionToken(session: Session) {
  return new SignJWT({ login: session.login, name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<Session | null> {
  if (!isAuthConfigured) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    const login = typeof payload.login === "string" ? payload.login : "";

    // The allowlist is re-checked on every read, so revoking access is a
    // matter of changing the env var — old tokens stop working immediately.
    if (!login || login.toLowerCase() !== env.authorGithubLogin) return null;

    return {
      login,
      name: typeof payload.name === "string" ? payload.name : null,
    };
  } catch {
    return null;
  }
}

/** The signed-in author, or null. Safe to call from any server component. */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export { SESSION_MAX_AGE };
