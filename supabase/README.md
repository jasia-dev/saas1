# Supabase Setup

## Apply the initial schema

- Open the Supabase project dashboard
- Go to `SQL Editor`
- Create a new query
- Paste the contents of `supabase/migrations/001_initial_schema.sql`
- Run the query once

## What this migration creates

- `profiles` linked to `auth.users`
- `links` for saved URLs
- `tags` for per-user tag names
- `link_tags` for many-to-many link/tag relations
- `updated_at` trigger for `links`
- `profiles` auto-create trigger on new auth users
- RLS policies for all four tables

## Notes

- New users get a `profiles` row automatically after sign-up
- `plan` defaults to `free`
- Tag names are unique per user without case sensitivity
- `link_tags` blocks duplicate link/tag pairs
