-- Run once in Supabase SQL Editor. Public clients cannot read visitor data.
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  telegram_id bigint not null,
  first_name text not null,
  username text,
  session_id uuid not null,
  event text not null check (event in ('visit','page','click','request_review','contact')),
  path text not null,
  label text not null default '',
  target text not null default ''
);
alter table public.analytics_events enable row level security;
revoke all on public.analytics_events from anon, authenticated;
create index if not exists analytics_events_time_idx on public.analytics_events(created_at desc);
create index if not exists analytics_events_user_idx on public.analytics_events(telegram_id, created_at desc);
