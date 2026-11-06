-- Smoother Roads: upvotes. Paste into the Supabase SQL Editor and run once.
-- Areas stay in public/areas.json; votes point at their id.
-- Visitors use anonymous sign-in, so each browser has its own auth.uid().

create table public.area_votes (
  area_id    text not null check (area_id ~ '^[a-z0-9-]{1,80}$'),
  voter      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (area_id, voter)
);

create index area_votes_area on public.area_votes (area_id);

alter table public.area_votes enable row level security;

-- Each visitor sees and changes only their own votes
create policy "read own votes" on public.area_votes
  for select to authenticated using (voter = auth.uid());

create policy "add own vote" on public.area_votes
  for insert to authenticated with check (voter = auth.uid());

create policy "remove own vote" on public.area_votes
  for delete to authenticated using (voter = auth.uid());

-- Totals for everyone, without showing who voted
create function public.vote_counts()
returns table (area_id text, votes bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select area_id, count(*) from public.area_votes group by area_id;
$$;

revoke all on function public.vote_counts() from public;
grant execute on function public.vote_counts() to anon, authenticated;
