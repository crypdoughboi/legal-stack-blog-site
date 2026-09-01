/**
 * Every backing service is optional at build time. Missing configuration
 * degrades to "no posts yet" rather than breaking the build or the public
 * site, so the page renders on a fresh clone with no secrets.
 */

export const env = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  authSecret: process.env.AUTH_SECRET ?? "",
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  authorGithubLogin: (process.env.AUTHOR_GITHUB_LOGIN ?? "").toLowerCase(),
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  // Supabase renamed these: newer projects issue a secret key (sb_secret_…)
  // where older ones had a service_role JWT. Either works here.
  supabaseServiceKey:
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "",
  supabaseBucket: process.env.SUPABASE_BUCKET ?? "post-images",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
};

export const isDatabaseConfigured = env.databaseUrl.length > 0;

export const isAuthConfigured =
  env.authSecret.length > 0 &&
  env.githubClientId.length > 0 &&
  env.githubClientSecret.length > 0 &&
  env.authorGithubLogin.length > 0;

export const isStorageConfigured =
  env.supabaseUrl.length > 0 && env.supabaseServiceKey.length > 0;
