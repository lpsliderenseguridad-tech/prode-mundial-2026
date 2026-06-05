import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Jugadores ──────────────────────────────────────────────
export async function upsertJugador(nombre, empresa) {
  // Buscar si ya existe
  const { data: existing } = await supabase
    .from('prode_jugadores')
    .select('*')
    .ilike('nombre', nombre)
    .ilike('empresa', empresa)
    .single()

  if (existing) return { data: existing, error: null }

  const { data, error } = await supabase
    .from('prode_jugadores')
    .insert({ nombre, empresa })
    .select()
    .single()

  return { data, error }
}

export async function getJugadoresByEmpresa(empresa) {
  return supabase
    .from('prode_jugadores')
    .select('*')
    .ilike('empresa', empresa)
    .order('puntos', { ascending: false })
}

export async function getAllJugadores() {
  return supabase
    .from('prode_jugadores')
    .select('*')
    .order('puntos', { ascending: false })
}

// ── Pronósticos ────────────────────────────────────────────
export async function getPronosticos(jugadorId) {
  return supabase
    .from('prode_pronosticos')
    .select('*')
    .eq('jugador_id', jugadorId)
}

export async function upsertPronostico(jugadorId, partidoId, golesLocal, golesVisita) {
  return supabase
    .from('prode_pronosticos')
    .upsert(
      { jugador_id: jugadorId, partido_id: partidoId, goles_local: golesLocal, goles_visita: golesVisita },
      { onConflict: 'jugador_id,partido_id' }
    )
}

export async function guardarFase(jugadorId, pronosticosMap) {
  const rows = Object.entries(pronosticosMap)
    .filter(([, v]) => v.l !== '' && v.v !== '')
    .map(([pid, v]) => ({
      jugador_id: jugadorId,
      partido_id: parseInt(pid),
      goles_local: parseInt(v.l),
      goles_visita: parseInt(v.v),
      ganador_supl: v.supl || null,
      ganador_pen: v.pen || null,
    }))

  if (rows.length === 0) return { error: null }

  return supabase
    .from('prode_pronosticos')
    .upsert(rows, { onConflict: 'jugador_id,partido_id' })
}

// ── Resultados ─────────────────────────────────────────────
export async function getResultados() {
  return supabase.from('prode_resultados').select('*')
}

export async function upsertResultado(partidoId, golesLocal, golesVisita) {
  return supabase
    .from('prode_resultados')
    .upsert(
      { partido_id: partidoId, goles_local: golesLocal, goles_visita: golesVisita },
      { onConflict: 'partido_id' }
    )
}

export async function recalcularPuntos() {
  return supabase.rpc('recalcular_puntos')
}
