-- ============================================================
-- HUSTLE MANIA — Supabase Database Schema
-- Execute this entire file in the Supabase SQL Editor.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. HELPER: Admin check function
--    An "admin" is any user whose email is in the admin list.
--    Update the array below with your admin email(s).
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
      AND email = ANY(ARRAY[
        'hustlemaniaworld@gmail.com'   -- ← replace / extend with your admin emails
      ])
  );
$$;


-- ────────────────────────────────────────────────────────────
-- 1. USERS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read only their own row
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update only their own row
CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own row (on sign-up)
CREATE POLICY "users_insert_own"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);


-- ────────────────────────────────────────────────────────────
-- 2. TEES TABLE (Products)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tees (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT NOT NULL DEFAULT '',
  stock       JSONB NOT NULL DEFAULT '{"S":0,"M":0,"L":0,"XL":0,"XXL":0}'::jsonb,
  is_limited  BOOLEAN NOT NULL DEFAULT false,
  image_url   TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tees ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (including anon) can read tees
CREATE POLICY "tees_public_read"
  ON public.tees
  FOR SELECT
  USING (true);

-- Policy: Only admins can insert
CREATE POLICY "tees_admin_insert"
  ON public.tees
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Policy: Only admins can update
CREATE POLICY "tees_admin_update"
  ON public.tees
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Policy: Only admins can delete
CREATE POLICY "tees_admin_delete"
  ON public.tees
  FOR DELETE
  USING (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 3. DROPS TABLE (Launch Events)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.drops (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_name        TEXT NOT NULL,
  launch_timestamp TIMESTAMPTZ NOT NULL,
  is_active        BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.drops ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (including anon) can read drops
CREATE POLICY "drops_public_read"
  ON public.drops
  FOR SELECT
  USING (true);

-- Policy: Only admins can insert
CREATE POLICY "drops_admin_insert"
  ON public.drops
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Policy: Only admins can update
CREATE POLICY "drops_admin_update"
  ON public.drops
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Policy: Only admins can delete
CREATE POLICY "drops_admin_delete"
  ON public.drops
  FOR DELETE
  USING (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 4. ORDERS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
  status       TEXT NOT NULL DEFAULT 'processing',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read only their own orders
CREATE POLICY "orders_select_own"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their own orders
CREATE POLICY "orders_insert_own"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can read all orders
CREATE POLICY "orders_admin_select"
  ON public.orders
  FOR SELECT
  USING (public.is_admin());

-- Policy: Admins can update any order (e.g. change status)
CREATE POLICY "orders_admin_update"
  ON public.orders
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Index for fast user order lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);


-- ────────────────────────────────────────────────────────────
-- 5. ENABLE REALTIME on orders table
-- ────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;


-- ============================================================
-- DONE. All tables, RLS policies, and Realtime are configured.
-- ============================================================
