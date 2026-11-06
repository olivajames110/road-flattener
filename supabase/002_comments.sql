-- Smoother Roads: comments, region status and admin rights.
-- Paste into the Supabase SQL Editor and run once, after 001_votes.sql.

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security; -- No policies: visitors can't read or change it

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table public.area_comments (
  id         uuid primary key default gen_random_uuid(),
  area_id    text not null check (area_id ~ '^[a-z0-9-]{1,80}$'),
  author_id  uuid references auth.users (id) on delete set null,
  author     text not null check (char_length(btrim(author)) between 1 and 40),
  dev        boolean not null default false,
  type       text not null check (type in ('feedback', 'issue', 'question')),
  body       text not null check (char_length(btrim(body)) between 1 and 2000),
  pin_lat    double precision check (pin_lat between -90 and 90),
  pin_lon    double precision check (pin_lon between -180 and 180),
  hidden     boolean not null default false,
  created_at timestamptz not null default now(),
  check ((pin_lat is null) = (pin_lon is null))
);
create index area_comments_area on public.area_comments (area_id, created_at);
create index area_comments_author on public.area_comments (author_id, created_at);

alter table public.area_comments enable row level security;

-- Who posted stays private: author_id isn't readable
revoke all on public.area_comments from anon, authenticated;
grant select (id, area_id, author, dev, type, body, pin_lat, pin_lon, hidden, created_at)
  on public.area_comments to anon, authenticated;
grant insert (area_id, author, type, body, pin_lat, pin_lon) on public.area_comments to authenticated;
grant update (hidden) on public.area_comments to authenticated;
grant delete on public.area_comments to authenticated;

create policy "read visible comments" on public.area_comments
  for select to anon, authenticated using (not hidden or public.is_admin());

create policy "post own comments" on public.area_comments
  for insert to authenticated with check (true); -- The trigger below sets who posted

create policy "admin hides comments" on public.area_comments
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin deletes comments" on public.area_comments
  for delete to authenticated using (public.is_admin());

-- Sets the fields a visitor must not choose, and limits how fast one browser can post
create function public.before_comment()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  admin boolean := public.is_admin();
begin
  new.author_id := auth.uid();
  new.dev := admin;
  new.hidden := false;
  new.created_at := now();
  if new.author_id is null then
    raise exception 'sign-in required';
  end if;
  if not admin and (
    (select count(*) from public.area_comments
      where author_id = new.author_id and created_at > now() - interval '10 minutes') >= 5
    or (select count(*) from public.area_comments
      where author_id = new.author_id and created_at > now() - interval '1 day') >= 20
  ) then
    raise exception 'rate_limited';
  end if;
  return new;
end;
$$;

create trigger before_comment_insert
  before insert on public.area_comments
  for each row execute function public.before_comment();

-- Status set from the admin page; replaces the status in areas.json
create table public.area_status (
  area_id    text primary key check (area_id ~ '^[a-z0-9-]{1,80}$'),
  status     text not null check (status in ('requested', 'progress', 'released')),
  updated_at timestamptz not null default now()
);
alter table public.area_status enable row level security;

create policy "read status" on public.area_status for select to anon, authenticated using (true);
create policy "admin sets status" on public.area_status
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
