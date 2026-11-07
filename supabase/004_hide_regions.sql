-- Smoother Roads: hide a region from the admin page.
-- Paste into the Supabase SQL Editor and run once, after 003_replies.sql.

alter table public.area_status
  alter column status drop not null,
  add column hidden boolean not null default false;
