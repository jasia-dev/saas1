# LinkBox MVP Plan

## Service Overview

- Service name: `LinkBox`
- One-line intro: Personal SaaS for organizing saved links with tags and search

## Goal

Help users save web links, organize them with tags, and find them quickly through search. The MVP focuses on core link management plus AI tag recommendations.

## Tech Stack

### Frontend
- `Next.js`
  - UI screens
  - Routing
  - Server Actions / API Routes
  - Easy deployment

### Backend / DB / Auth
- `Supabase`
  - PostgreSQL database
  - Email sign-up / login
  - Row Level Security
  - Good fit for a simple SaaS backend

### AI
- `Google Gemini API`
  - AI tag recommendation

### Styling
- `Tailwind CSS`

### Form / Validation
- `React Hook Form`
- `Zod`

### Billing
- `Stripe`
  - Planned for later
  - Excluded from current MVP scope

## MVP Features

- Email sign-up / login
- Add links
- View link list
- Edit / delete links
- Add tags
- Search
- AI tag recommendation

## Feature Details

### 1. Email sign-up / login
- Use Supabase Auth
- Email / password authentication
- Only authenticated users can access their own data

### 2. Add links
- Save a URL
- Add title and memo
- Add tags during creation

### 3. View link list
- Show saved links
- Display title, URL, tags, and created date
- Default sort: newest first

### 4. Edit / delete links
- Edit title, memo, and tags
- Delete saved links

### 5. Add tags
- Enter tags while creating or editing a link
- Use tags to organize saved links

### 6. Search
- Search by title, memo, and tags
- Quickly find saved links

### 7. AI tag recommendation
- Recommend tags from the URL, title, and memo
- Let the user select recommended tags before saving

## Out of Scope for MVP

- Stripe billing integration
- Real paid subscriptions
- Team features
- Link sharing
- AI summaries
- AI category classification
- Browser extension

## Draft Data Model

### profiles
- `id`
- `email`
- `name`
- `created_at`

### links
- `id`
- `user_id`
- `url`
- `title`
- `memo`
- `created_at`
- `updated_at`

### tags
- `id`
- `user_id`
- `name`

### link_tags
- `id`
- `link_id`
- `tag_id`

### ai_usage_logs
- `id`
- `user_id`
- `feature_type`
- `used_at`

## Core Screens

- Landing page
- Sign-up page
- Login page
- Dashboard (link list)
- Add / edit link form
- Search results view

## Development Order

1. Initial project setup
2. Supabase Auth integration
3. Database schema design
4. RLS policy setup
5. Link CRUD implementation
6. Tag feature implementation
7. Search implementation
8. Gemini AI tag recommendation implementation
9. UI polish and edge-case handling

## Local Setup

### 1. Install dependencies
- `npm install`

### 2. Connect environment variables
- Copy values into `.env.local`
- Required for auth:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Required later for AI:
  - `GEMINI_API_KEY`

### 3. Create a Supabase project
- Create a new project in Supabase
- In the project dashboard, open `Settings > API`
- Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`
- Copy the `anon` key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configure email auth
- Open `Authentication > Providers > Email`
- Enable email/password sign-in
- If you want email confirmation, keep confirmation enabled
- Set the site URL to your local app URL, for example `http://localhost:3000`

### 5. Run the app
- `npm run dev`

If Supabase env values are missing, the auth UI stays visible but sign-up and login requests will return a setup error message.

### 6. Apply the database schema
- Open `supabase/migrations/001_initial_schema.sql`
- Paste it into the Supabase `SQL Editor`
- Run it once to create the initial tables, triggers, indexes, and RLS policies

## Security / Access Control

- Use Supabase RLS
- Users can only read, update, and delete their own links and tags
- Unauthenticated users cannot access private data

## Future Expansion

- Free / paid plans
- Stripe billing integration
- AI summaries
- AI category classification
- Browser extension
- Link sharing
