alter table public.properties
  add column if not exists availability text,
  add column if not exists hot_water text,
  add column if not exists heating text,
  add column if not exists condition text,
  add column if not exists property_age text,
  add column if not exists garage text,
  add column if not exists elevator text,
  add column if not exists furnished text,
  add column if not exists energy_rating text,
  add column if not exists energy_value double precision,
  add column if not exists emissions_rating text,
  add column if not exists emissions_value double precision;

