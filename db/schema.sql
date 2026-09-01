-- The Legal Stack — schema.
-- Run once in the Supabase SQL editor (Database → SQL Editor → New query).

-- gen_random_uuid() is built into Postgres 13+, so no extension is needed.

create table if not exists posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  dek              text not null default '',
  body             text not null default '',
  status           text not null default 'draft' check (status in ('draft', 'published')),
  featured         boolean not null default false,
  tags             text[] not null default '{}',
  reading_minutes  integer,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists posts_published_idx
  on posts (published_at desc)
  where status = 'published';

create index if not exists posts_tags_idx on posts using gin (tags);

-- Keep updated_at honest.
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- The site reads through a server-side connection that bypasses RLS, and
-- nothing client-side ever touches this table. RLS is enabled anyway so that
-- a leaked anon key cannot read drafts.
alter table posts enable row level security;

drop policy if exists "published posts are public" on posts;
create policy "published posts are public"
  on posts for select
  using (status = 'published');
