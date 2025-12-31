-- Database Schema for Growth360

-- 1. Profiles Table (Linked to Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Business Data Table
CREATE TABLE IF NOT EXISTS public.business_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  fantasy_name TEXT,
  google_maps_url TEXT,
  instagram_url TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  rubro TEXT,
  client_type TEXT CHECK (client_type IN ('mayorista', 'minorista', 'ambos')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Daily Records Table
CREATE TABLE IF NOT EXISTS public.daily_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  record_date DATE NOT NULL,
  sales DECIMAL DEFAULT 0,
  expenses DECIMAL DEFAULT 0,
  fixed_costs DECIMAL DEFAULT 0,
  category TEXT,
  is_inventory BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Competitors Table (For Scraping results)
CREATE TABLE IF NOT EXISTS public.competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  details JSONB,
  active_ads BOOLEAN DEFAULT FALSE,
  ad_library_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;

-- Profiles: Admin sees all, Client sees own
CREATE POLICY "Profiles access" ON public.profiles
  FOR ALL
  USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Business Data: Admin sees all, Client sees own
CREATE POLICY "Business data access" ON public.business_data
  FOR ALL
  USING (
    client_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Daily Records: Admin sees all, Client sees own
CREATE POLICY "Daily records access" ON public.daily_records
  FOR ALL
  USING (
    client_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Competitors: Admin sees all, Client sees own
CREATE POLICY "Competitors access" ON public.competitors
  FOR ALL
  USING (
    client_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
