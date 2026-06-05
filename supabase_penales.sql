-- ============================================================
-- ACTUALIZACIÓN: Suplementario y Penales
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Columnas en pronósticos
alter table prode_pronosticos 
  add column if not exists ganador_supl text check (ganador_supl in ('l','v','empate'));
alter table prode_pronosticos 
  add column if not exists ganador_pen text check (ganador_pen in ('l','v'));

-- 2. Columnas en resultados reales
alter table prode_resultados 
  add column if not exists ganador_supl text check (ganador_supl in ('l','v','empate'));
alter table prode_resultados 
  add column if not exists ganador_pen text check (ganador_pen in ('l','v'));

-- 3. Políticas upsert para nuevas columnas (ya cubiertas por las existentes)

-- 4. Función recalcular_puntos actualizada
create or replace function recalcular_puntos()
returns void as $$
declare
  res record;
  pro record;
  pts integer;
  es_empate_90_real boolean;
  es_empate_90_pro boolean;
  exacto_90 boolean;
  rs_gan text;
  ps_gan text;
begin
  for res in select * from prode_resultados loop
    es_empate_90_real := (res.goles_local = res.goles_visita);

    for pro in select * from prode_pronosticos where partido_id = res.partido_id loop
      if pro.goles_local is null or pro.goles_visita is null then
        pts := 0;
      else
        exacto_90 := (pro.goles_local = res.goles_local and pro.goles_visita = res.goles_visita);
        es_empate_90_pro := (pro.goles_local = pro.goles_visita);

        -- Puntaje base 90 min
        if exacto_90 then
          pts := 4;
        elsif es_empate_90_real and es_empate_90_pro then
          pts := 1;
        else
          rs_gan := case when res.goles_local > res.goles_visita then 'l'
                         when res.goles_local < res.goles_visita then 'v'
                         else null end;
          ps_gan := case when pro.goles_local > pro.goles_visita then 'l'
                         when pro.goles_local < pro.goles_visita then 'v'
                         else null end;
          if rs_gan is not null and ps_gan is not null and rs_gan = ps_gan then
            pts := 3;
          else
            pts := 0;
          end if;
        end if;

        -- Bonus suplementario
        if es_empate_90_real and res.ganador_supl is not null and pro.ganador_supl is not null then
          if pro.ganador_supl = res.ganador_supl then
            pts := pts + 1;
          end if;
        end if;

        -- Bonus penales
        if es_empate_90_real and res.ganador_supl = 'empate' and res.ganador_pen is not null and pro.ganador_pen is not null then
          if pro.ganador_pen = res.ganador_pen then
            pts := pts + 1;
          end if;
        end if;

      end if;

      update prode_pronosticos set puntos_obtenidos = pts, updated_at = now()
        where id = pro.id;
    end loop;
  end loop;

  update prode_jugadores j
    set puntos = (
      select coalesce(sum(p.puntos_obtenidos), 0)
      from prode_pronosticos p
      where p.jugador_id = j.id
    );
end;
$$ language plpgsql;
