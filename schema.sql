
-- Enable extensions (usually already enabled in Supabase)
create extension if not exists pgcrypto;

-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  legacy_number int,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Can read/update only own profile
create policy if not exists "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy if not exists "profiles_upsert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy if not exists "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- COLLECTIONS
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  niche text,
  created_at timestamptz default now()
);

alter table public.collections enable row level security;

create policy if not exists "collections_select_own" on public.collections
  for select using (auth.uid() = user_id);
create policy if not exists "collections_insert_own" on public.collections
  for insert with check (auth.uid() = user_id);
create policy if not exists "collections_update_own" on public.collections
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "collections_delete_own" on public.collections
  for delete using (auth.uid() = user_id);

-- ITEMS
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  collection_id uuid references public.collections(id) on delete set null,
  title text not null,
  description text,
  category text,
  photo_url text,
  created_at timestamptz default now()
);

alter table public.items enable row level security;

create policy if not exists "items_select_own" on public.items
  for select using (auth.uid() = user_id);
create policy if not exists "items_insert_own" on public.items
  for insert with check (auth.uid() = user_id);
create policy if not exists "items_update_own" on public.items
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "items_delete_own" on public.items
  for delete using (auth.uid() = user_id);

-- STORAGE
-- Create bucket in Dashboard called "item-photos"
-- Then apply policies below

-- Allow public read of item images (optional). Remove if you want private-only.
create policy if not exists "bucket_item_photos_read" on storage.objects
  for select using (bucket_id = 'item-photos');

-- Allow a user to upload/update/delete only in their own folder: `${auth.uid()}/...`
create policy if not exists "bucket_item_photos_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'item-photos' and split_part(name,'/',1) = auth.uid()::text
  );
create policy if not exists "bucket_item_photos_update_own" on storage.objects
  for update using (
    bucket_id = 'item-photos' and split_part(name,'/',1) = auth.uid()::text
  ) with check (
    bucket_id = 'item-photos' and split_part(name,'/',1) = auth.uid()::text
  );
create policy if not exists "bucket_item_photos_delete_own" on storage.objects
  for delete using (
    bucket_id = 'item-photos' and split_part(name,'/',1) = auth.uid()::text
  );
