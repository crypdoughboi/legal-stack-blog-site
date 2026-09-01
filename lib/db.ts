import postgres from "postgres";
import { env, isDatabaseConfigured } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

/**
 * One pooled client per process. Supabase's transaction pooler does not
 * support prepared statements, so they are disabled.
 */
export function getSql() {
  if (!isDatabaseConfigured) return null;

  if (!global.__sql) {
    global.__sql = postgres(env.databaseUrl, {
      prepare: false,
      idle_timeout: 20,
      max: 5,
    });
  }

  return global.__sql;
}
