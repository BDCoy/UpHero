-- User roles
create type user_role as enum ('admin','brand','creator');

-- Transaction types for wallet
create type transaction_type as enum ('pack_purchase','spend','refund');

-- Brief status types
create type brief_status as enum ('open','in_progress','completed','disputed','cancelled');

-- Dispute status types
create type dispute_status as enum ('open','resolved','rejected');

-- Invitation status
create type invitation_status as enum ('pending','accepted','declined','cancelled');

-- Define enum type for invitations direction
create type invitation_direction as enum ('brand_to_creator', 'creator_to_brand');

-- Task status enum
create type task_status as enum ('pending', 'in_progress', 'completed', 'cancelled');

-- Shipment status enum
create type shipment_status as enum ('due_to_ship', 'shipped', 'delivered', 'cancelled');

-- Pricing types for Stripe-like prices
create type pricing_type as enum ('one_time', 'recurring');

create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');

-- Subscription statuses for Stripe-like subscriptions
create type subscription_status as enum (
  'trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired',
  'past_due', 'unpaid', 'paused'
);

-- USERS table
create table users (
  id uuid primary key references auth.users,
  full_name text,
  email text unique not null,
  role user_role not null default 'brand',
  avatar_url text,
  created_at timestamp default current_timestamp
);

create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- WALLETS table
create table wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  balance numeric(12,2) default 0,
  updated_at timestamp default current_timestamp
);

-- WALLET_TRANSACTIONS table
create table wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references wallets(id),
  type transaction_type,
  amount numeric(12,2) not null,
  bonus_amount numeric(12,2) default 0,
  created_at timestamp default current_timestamp,
  expires_at timestamp,
  metadata jsonb
);

-- PRODUCTS (packs) table
create table products (
  id text primary key,
  name text not null,
  description text,
  price numeric(12,2) not null,
  bonus_amount numeric(12,2) default 0,
  max_videos int,
  max_invites int,
  active boolean default true,
  created_at timestamp default current_timestamp
);

-- PRICES table (Stripe style)
create table prices (
  id text primary key,
  product_id text references products(id),
  active boolean default true,
  description text,
  unit_amount bigint not null,
  currency text check (char_length(currency) = 3),
  type pricing_type not null,
  interval pricing_plan_interval,
  interval_count integer default 1,
  trial_period_days integer,
  metadata jsonb,
  created_at timestamp default current_timestamp
);

create table customers (
  -- UUID from auth.users
  id uuid references users(id) not null primary key,
  -- The user's customer ID in Stripe. User must not be able to update this.
  stripe_customer_id text
);

-- SUBSCRIPTIONS table (Stripe style)
create table subscriptions (
  id text primary key,
  user_id uuid references users(id) not null,
  status subscription_status not null,
  metadata jsonb,
  price_id text references prices(id),
  quantity integer default 1,
  cancel_at_period_end boolean default false,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone
);

-- CREATORS table (extended)
create table creators (
  user_id uuid primary key references users(id),
  bio text,
  education text,
  rating numeric(2,1) default 0,
  portfolio_urls text[],
  price_per_video numeric(12,2),
  ethnicity text,
  language text,
  appearance text,
  alternative_style text,
  lifestyle text,
  relationship_status text,
  vehicle_owner boolean,
  interests text[],
  videos_on_time_percent numeric(5,2),
  delivered_videos_count int,
  location_country text,
  location_region text,
  created_at timestamp default current_timestamp
);

-- CREATOR REVIEWS table
create table creator_reviews (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references creators(user_id),
  brand_id uuid references users(id),
  rating numeric(2,1) check (rating >= 0 and rating <= 5),
  comment text,
  created_at timestamp default current_timestamp
);

-- BRIEFS table
create table briefs (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references users(id),
  creator_id uuid references users(id),
  title text,
  description text,
  status brief_status default 'open',
  budget numeric(12,2),
  video_details jsonb,
  additional_services jsonb,
  creator_preferences jsonb,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- MESSAGES table
create table messages (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references briefs(id),
  sender_id uuid references users(id),
  message text,
  created_at timestamp default current_timestamp
);

-- DISPUTES table
create table disputes (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references briefs(id),
  raised_by uuid references users(id),
  reason text,
  status dispute_status default 'open',
  resolution_notes text,
  created_at timestamp default current_timestamp,
  resolved_at timestamp
);

-- INVITATIONS table
create table invitations (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references users(id),
  receiver_id uuid references users(id),
  brief_id uuid references briefs(id) null,
  direction invitation_direction,
  status invitation_status default 'pending',
  message text,
  created_at timestamp default current_timestamp,
  responded_at timestamp
);

-- TASKS table
create table tasks (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references briefs(id),
  creator_id uuid references users(id),
  title text,
  description text,
  status task_status default 'pending',
  due_date timestamp,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- SHIPMENTS table
create table shipments (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references users(id),
  creator_id uuid references users(id),
  brief_id uuid references briefs(id) null,
  tracking_number text,
  carrier text,
  status shipment_status default 'due_to_ship',
  shipped_at timestamp,
  delivered_at timestamp,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);


-- Realtime publication for products and prices
drop publication if exists supabase_realtime;
create publication supabase_realtime for table products, prices;
