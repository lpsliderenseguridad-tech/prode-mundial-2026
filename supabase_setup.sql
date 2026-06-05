-- ============================================
-- PRODE MUNDIAL 2026 - Setup Supabase
-- Ejecutar en: supabase.com > SQL Editor
-- Proyecto: gesujigrxpqvyuquitmz
-- ============================================

-- 1. Jugadores
create table if not exists prode_jugadores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  empresa text not null,
  puntos integer default 0,
  created_at timestamptz default now(),
  unique(nombre, empresa)
);

-- 2. Pronósticos (un registro por jugador por partido)
create table if not exists prode_pronosticos (
  id uuid primary key default gen_random_uuid(),
  jugador_id uuid references prode_jugadores(id) on delete cascade,
  partido_id integer not null,
  goles_local integer,
  goles_visita integer,
  puntos_obtenidos integer default 0,
  updated_at timestamptz default now(),
  unique(jugador_id, partido_id)
);

-- 3. Resultados reales (solo admin LPS los carga)
create table if not exists prode_resultados (
  id uuid primary key default gen_random_uuid(),
  partido_id integer not null unique,
  goles_local integer not null,
  goles_visita integer not null,
  updated_at timestamptz default now()
);

-- ============================================
-- RLS (Row Level Security)
-- ============================================
alter table prode_jugadores enable row level security;
alter table prode_pronosticos enable row level security;
alter table prode_resultados enable row level security;

-- Jugadores: cualquiera puede leer y crear
create policy "jugadores_select" on prode_jugadores for select using (true);
create policy "jugadores_insert" on prode_jugadores for insert with check (true);
create policy "jugadores_update" on prode_jugadores for update using (true);

-- Pronósticos: cualquiera puede leer, insertar y actualizar
create policy "pronosticos_select" on prode_pronosticos for select using (true);
create policy "pronosticos_insert" on prode_pronosticos for insert with check (true);
create policy "pronosticos_update" on prode_pronosticos for update using (true);

-- Resultados: cualquiera puede leer, solo admin inserta (el frontend valida con password)
create policy "resultados_select" on prode_resultados for select using (true);
create policy "resultados_insert" on prode_resultados for insert with check (true);
create policy "resultados_update" on prode_resultados for update using (true);

-- ============================================
-- Función para recalcular puntos automáticamente
-- Se llama desde el frontend al cargar resultados
-- ============================================
create or replace function recalcular_puntos()
returns void as $$
declare
  res record;
  pro record;
  pts integer;
  res_signo integer;
  pro_signo integer;
begin
  for res in select * from prode_resultados loop
    res_signo := case when res.goles_local > res.goles_visita then 1
                      when res.goles_local < res.goles_visita then -1
                      else 0 end;
    for pro in select * from prode_pronosticos where partido_id = res.partido_id loop
      if pro.goles_local is null or pro.goles_visita is null then
        pts := 0;
      elsif pro.goles_local = res.goles_local and pro.goles_visita = res.goles_visita then
        pts := 3;
      else
        pro_signo := case when pro.goles_local > pro.goles_visita then 1
                          when pro.goles_local < pro.goles_visita then -1
                          else 0 end;
        pts := case when pro_signo = res_signo then 1 else 0 end;
      end if;
      update prode_pronosticos set puntos_obtenidos = pts, updated_at = now()
        where id = pro.id;
    end loop;
  end loop;
  -- Actualizar total de puntos por jugador
  update prode_jugadores j
    set puntos = (
      select coalesce(sum(p.puntos_obtenidos), 0)
      from prode_pronosticos p
      where p.jugador_id = j.id
    );
end;
$$ language plpgsql;
