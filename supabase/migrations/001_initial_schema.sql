create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  url text not null,
  title text not null,
  description text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.link_tags (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.links (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade
);

create unique index if not exists tags_user_id_lower_name_key
  on public.tags (user_id, lower(name));

create unique index if not exists link_tags_link_id_tag_id_key
  on public.link_tags (link_id, tag_id);

create index if not exists links_user_id_created_at_idx
  on public.links (user_id, created_at desc);

create index if not exists tags_user_id_name_idx
  on public.tags (user_id, name);

create index if not exists link_tags_link_id_idx
  on public.link_tags (link_id);

create index if not exists link_tags_tag_id_idx
  on public.link_tags (tag_id);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_links_updated_at on public.links;

create trigger set_links_updated_at
before update on public.links
for each row
execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.links enable row level security;
alter table public.tags enable row level security;
alter table public.link_tags enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "links_select_own" on public.links;
create policy "links_select_own"
on public.links
for select
using (auth.uid() = user_id);

drop policy if exists "links_insert_own" on public.links;
create policy "links_insert_own"
on public.links
for insert
with check (auth.uid() = user_id);

drop policy if exists "links_update_own" on public.links;
create policy "links_update_own"
on public.links
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "links_delete_own" on public.links;
create policy "links_delete_own"
on public.links
for delete
using (auth.uid() = user_id);

drop policy if exists "tags_select_own" on public.tags;
create policy "tags_select_own"
on public.tags
for select
using (auth.uid() = user_id);

drop policy if exists "tags_insert_own" on public.tags;
create policy "tags_insert_own"
on public.tags
for insert
with check (auth.uid() = user_id);

drop policy if exists "tags_update_own" on public.tags;
create policy "tags_update_own"
on public.tags
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "tags_delete_own" on public.tags;
create policy "tags_delete_own"
on public.tags
for delete
using (auth.uid() = user_id);

drop policy if exists "link_tags_select_own" on public.link_tags;
create policy "link_tags_select_own"
on public.link_tags
for select
using (
  exists (
    select 1
    from public.links
    where links.id = link_tags.link_id
      and links.user_id = auth.uid()
  )
  and exists (
    select 1
    from public.tags
    where tags.id = link_tags.tag_id
      and tags.user_id = auth.uid()
  )
);

drop policy if exists "link_tags_insert_own" on public.link_tags;
create policy "link_tags_insert_own"
on public.link_tags
for insert
with check (
  exists (
    select 1
    from public.links
    where links.id = link_tags.link_id
      and links.user_id = auth.uid()
  )
  and exists (
    select 1
    from public.tags
    where tags.id = link_tags.tag_id
      and tags.user_id = auth.uid()
  )
);

drop policy if exists "link_tags_delete_own" on public.link_tags;
create policy "link_tags_delete_own"
on public.link_tags
for delete
using (
  exists (
    select 1
    from public.links
    where links.id = link_tags.link_id
      and links.user_id = auth.uid()
  )
  and exists (
    select 1
    from public.tags
    where tags.id = link_tags.tag_id
      and tags.user_id = auth.uid()
  )
);
