-- NCar: схема БД под модель "доверенный список публикующих" (см. CLAUDE.md)
--
-- Модель доступа:
--   * Публичный клиент читает напрямую через anon key (RLS ниже разрешает
--     только опубликованные записи).
--   * Публикация/редактирование/удаление идёт ТОЛЬКО через серверные API-роуты
--     Next.js, которые сами проверяют Telegram initData и членство в
--     allowed_publishers, а затем пишут через supabaseAdmin (service role,
--     обходит RLS). Поэтому у anon/authenticated ролей ниже нет write-политик.

create extension if not exists "pgcrypto";

-- === allowed_publishers ===================================================
-- Список людей, которым разрешено публиковать. Управляется вручную владельцем
-- проекта (через service role), самостоятельная регистрация не предусмотрена.

create table if not exists allowed_publishers (
  telegram_id bigint primary key,
  name text not null,
  is_active boolean not null default true,
  added_at timestamptz not null default now()
);

alter table allowed_publishers enable row level security;
-- Намеренно без policy для anon/authenticated: таблица целиком закрыта от
-- прямого клиентского доступа, читается только серверным кодом (service role).

-- === cars ===================================================================

create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  owner_telegram_id bigint not null references allowed_publishers(telegram_id),
  brand text not null,
  model text not null,
  price numeric(12, 2) not null,
  year int not null,
  mileage int,
  fuel_type text,
  transmission text,
  body_type text,
  engine_volume numeric(3, 1),
  engine_power int,
  color text,
  description text,
  features text[] not null default '{}',
  photos text[] not null default '{}', -- URL-ы в Supabase Storage, первый элемент — главное фото
  vin text, -- приватное поле, наружу через API никогда не отдаётся обычным пользователям
  status text not null default 'draft'
    check (status in ('draft', 'available', 'reserved', 'sold', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cars_owner_idx on cars(owner_telegram_id);
create index if not exists cars_status_idx on cars(status);

alter table cars enable row level security;

create policy "public can read published cars"
  on cars for select
  to anon, authenticated
  using (status in ('available', 'reserved', 'sold'));

-- === services ================================================================

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  owner_telegram_id bigint not null references allowed_publishers(telegram_id),
  title text not null,
  description text,
  price numeric(12, 2), -- null = "цена по запросу"
  duration text,
  photo text,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_owner_idx on services(owner_telegram_id);
create index if not exists services_status_idx on services(status);

alter table services enable row level security;

create policy "public can read active services"
  on services for select
  to anon, authenticated
  using (status = 'active');

-- === updated_at триггер ======================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cars_set_updated_at
  before update on cars
  for each row execute function set_updated_at();

create trigger services_set_updated_at
  before update on services
  for each row execute function set_updated_at();
