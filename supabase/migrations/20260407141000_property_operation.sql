alter table public.properties
  add column if not exists operation text not null default 'venta';

