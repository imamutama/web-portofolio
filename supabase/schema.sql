-- Contact form storage for the portfolio (Supabase).
-- Run this in: Supabase dashboard → SQL Editor → New query → Run.

-- gen_random_uuid() ships with Supabase by default; ensure it's available just in case.
create extension if not exists "pgcrypto";

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

-- Row-level security: allow anonymous INSERT only.
-- No SELECT policy means messages are NOT readable via the public API.
alter table public.contacts enable row level security;

drop policy if exists "allow_anon_insert" on public.contacts;
create policy "allow_anon_insert"
  on public.contacts
  for insert
  to anon
  with check (true);
