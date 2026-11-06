-- Smoother Roads: link a reply to the comment it answers.
-- Paste into the Supabase SQL Editor and run once, after 002_comments.sql.

alter table public.area_comments
  add column reply_to uuid references public.area_comments (id) on delete set null;

grant select (reply_to) on public.area_comments to anon, authenticated;
grant insert (reply_to) on public.area_comments to authenticated;
