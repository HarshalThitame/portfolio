-- Portfolio CMS schema for Supabase.
-- Run this in Supabase SQL editor after creating the project.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin',
  status text not null default 'active' check (status in ('invited', 'active', 'disabled')),
  permissions jsonb not null default '{}'::jsonb,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and status = 'active'
  );
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text,
  bio text,
  location text,
  avatar_url text,
  website_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  slug text unique not null,
  short_description text,
  long_description text,
  cover_image_url text,
  project_logo_url text,
  live_url text,
  github_url text,
  technology_stack text[] not null default '{}'::text[],
  project_category text,
  project_status text not null default 'draft' check (project_status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  display_order integer not null default 0,
  seo_metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text,
  image_url text not null,
  alt_text text,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  device_type text not null default 'desktop' check (device_type in ('desktop', 'tablet', 'mobile', 'dashboard', 'mockup')),
  display_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  overview text,
  challenge text,
  solution text,
  features jsonb not null default '[]'::jsonb,
  architecture text,
  results jsonb not null default '[]'::jsonb,
  screenshots jsonb not null default '[]'::jsonb,
  videos jsonb not null default '[]'::jsonb,
  testimonials jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  technology_stack text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  features text[] not null default '{}'::text[],
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Tools',
  level integer not null default 80 check (level >= 0 and level <= 100),
  icon text,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category_id uuid references public.blog_categories(id) on delete set null,
  tags text[] not null default '{}'::text[],
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'archived')),
  featured boolean not null default false,
  published_at timestamptz,
  scheduled_at timestamptz,
  seo_metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_post_tags (
  post_id uuid references public.blog_posts(id) on delete cascade,
  tag_id uuid references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company_name text,
  project_type text,
  budget_range text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  source text not null default 'portfolio-contact-form',
  ip text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  contact_message_id uuid references public.contact_messages(id) on delete set null,
  full_name text not null,
  email text not null,
  company_name text,
  project_type text,
  budget_range text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'interested', 'proposal_sent', 'closed_won', 'closed_lost')),
  notes text,
  follow_up_date date,
  value_estimate numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  position text,
  photo_url text,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  review text not null,
  featured boolean not null default false,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  icon text,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_settings (
  id uuid primary key default gen_random_uuid(),
  page_path text unique not null,
  meta_title text,
  meta_description text,
  keywords text[] not null default '{}'::text[],
  open_graph_image_url text,
  twitter_card text not null default 'summary_large_image',
  canonical_url text,
  structured_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'portfolio-media',
  path text not null,
  public_url text,
  file_name text not null,
  file_type text,
  file_size bigint,
  folder text,
  alt_text text,
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  page_path text,
  visitor_id text,
  session_id text,
  source text,
  device_type text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  scope text not null default 'global',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_table text,
  entity_id uuid,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.content_versions (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  version_number integer not null,
  snapshot jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (entity_table, entity_id, version_number)
);

create index if not exists projects_status_featured_idx on public.projects(project_status, featured, display_order);
create index if not exists blog_posts_status_idx on public.blog_posts(status, published_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages(status, created_at desc);
create index if not exists leads_status_idx on public.leads(status, follow_up_date);
create index if not exists analytics_events_name_created_idx on public.analytics_events(event_name, created_at desc);
create index if not exists media_files_folder_idx on public.media_files(folder, created_at desc);

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at before update on public.admin_users for each row execute function public.set_updated_at();
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists set_project_gallery_updated_at on public.project_gallery;
create trigger set_project_gallery_updated_at before update on public.project_gallery for each row execute function public.set_updated_at();
drop trigger if exists set_case_studies_updated_at on public.case_studies;
create trigger set_case_studies_updated_at before update on public.case_studies for each row execute function public.set_updated_at();
drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();
drop trigger if exists set_skills_updated_at on public.skills;
create trigger set_skills_updated_at before update on public.skills for each row execute function public.set_updated_at();
drop trigger if exists set_blog_categories_updated_at on public.blog_categories;
create trigger set_blog_categories_updated_at before update on public.blog_categories for each row execute function public.set_updated_at();
drop trigger if exists set_blog_tags_updated_at on public.blog_tags;
create trigger set_blog_tags_updated_at before update on public.blog_tags for each row execute function public.set_updated_at();
drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
drop trigger if exists set_social_links_updated_at on public.social_links;
create trigger set_social_links_updated_at before update on public.social_links for each row execute function public.set_updated_at();
drop trigger if exists set_seo_settings_updated_at on public.seo_settings;
create trigger set_seo_settings_updated_at before update on public.seo_settings for each row execute function public.set_updated_at();
drop trigger if exists set_media_files_updated_at on public.media_files;
create trigger set_media_files_updated_at before update on public.media_files for each row execute function public.set_updated_at();
drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_gallery enable row level security;
alter table public.case_studies enable row level security;
alter table public.services enable row level security;
alter table public.skills enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.contact_messages enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;
alter table public.social_links enable row level security;
alter table public.seo_settings enable row level security;
alter table public.media_files enable row level security;
alter table public.analytics_events enable row level security;
alter table public.site_settings enable row level security;
alter table public.activity_logs enable row level security;
alter table public.content_versions enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'projects', 'project_gallery', 'case_studies', 'services', 'skills',
    'blog_categories', 'blog_tags', 'blog_posts', 'blog_post_tags', 'contact_messages',
    'leads', 'testimonials', 'social_links', 'seo_settings', 'media_files',
    'analytics_events', 'site_settings', 'activity_logs', 'content_versions'
  ]
  loop
    execute format('drop policy if exists "Admins can manage %I" on public.%I', table_name, table_name);
    execute format('create policy "Admins can manage %I" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', table_name, table_name);
  end loop;
end $$;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
on public.admin_users
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (project_status = 'published');

drop policy if exists "Public can read visible services" on public.services;
create policy "Public can read visible services"
on public.services
for select
to anon, authenticated
using (is_visible = true);

drop policy if exists "Public can read visible skills" on public.skills;
create policy "Public can read visible skills"
on public.skills
for select
to anon, authenticated
using (is_visible = true);

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Public can read visible testimonials" on public.testimonials;
create policy "Public can read visible testimonials"
on public.testimonials
for select
to anon, authenticated
using (is_visible = true);

drop policy if exists "Public can read visible social links" on public.social_links;
create policy "Public can read visible social links"
on public.social_links
for select
to anon, authenticated
using (is_visible = true);

drop policy if exists "Anonymous analytics insert" on public.analytics_events;
create policy "Anonymous analytics insert"
on public.analytics_events
for insert
to anon, authenticated
with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'video/mp4']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can manage portfolio media" on storage.objects;
create policy "Admins can manage portfolio media"
on storage.objects
for all
to authenticated
using (bucket_id = 'portfolio-media' and public.is_admin())
with check (bucket_id = 'portfolio-media' and public.is_admin());

insert into public.site_settings (key, scope, value)
values
  ('hero', 'content', '{"badge":"AVAILABLE FOR FREELANCE PROJECTS","headline":"BUILDING DIGITAL\nPRODUCTS THAT\nPEOPLE LOVE TO USE","subheadline":"Full Stack Developer focused on building modern web applications, AI-powered solutions and exceptional user experiences.","primaryCtaText":"View My Work","primaryCtaUrl":"#featured-projects","secondaryCtaText":"Let''s Talk","secondaryCtaUrl":"#contact-form","visible":true}'::jsonb),
  ('about', 'content', '{"name":"Harshal","role":"Full Stack Developer","location":"India / Available Remotely","biography":"I design and develop modern web applications that combine beautiful user experiences with scalable engineering.","experience":"2+ years learning and building","skills":["React","Next.js","TypeScript","Tailwind CSS"],"statistics":[{"label":"Projects Built","value":"20+"},{"label":"Responsive Experiences","value":"100%"}],"visible":true}'::jsonb),
  ('settings', 'global', '{"portfolioName":"Harshal","contactEmail":"harshal.dev.work@gmail.com","whatsappNumber":"919623023477","theme":"dark","animations":"balanced"}'::jsonb)
on conflict (key) do nothing;
