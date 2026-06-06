import { createClient } from "@supabase/supabase-js"

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(URL, KEY)

export async function upsertJugador(nombre, empresa, fotoUrl = null) {
  const key = `${nombre.toLowerCase().trim()}_${empresa.toLowerCase().trim()}`
  const { data, error } = await supabase
    .from("prode_jugadores")
    .upsert({ nombre, empresa, clave: key, foto_url: fotoUrl }, { onConflict: "clave" })
    .select().single()
  return { data, error }
}

export async function subirFoto(file, nombre, empresa) {
  const ext = file.name.split(".").pop()
  const key = `${nombre}_${empresa}`.toLowerCase().replace(/[^a-z0-9]/g,"_")
  const path = `${key}_${Date.now()}.${ext}`
  const { error } = await supabase.storage.from("fotos-prode").upload(path, file, { upsert: true })
  if (error) return null
  const { data } = supabase.storage.from("fotos-prode").getPublicUrl(path)
  return data.publicUrl
}

export async function getPronosticos(jugadorId) {
  return supabase.from("prode_pronosticos").select("*").eq("jugador_id", jugadorId)
}

export async function guardarFase(jugadorId, pronosticos) {
  const rows = Object.entries(pronosticos)
    .filter(([, v]) => v.l !== "" && v.v !== "")
    .map(([pid, v]) => ({
      jugador_id: jugadorId,
      partido_id: parseInt(pid),
      goles_local: parseInt(v.l),
      goles_visita: parseInt(v.v),
      ganador_supl: v.supl || null,
      ganador_pen: v.pen || null,
    }))
  if (!rows.length) return
  return supabase.from("prode_pronosticos").upsert(rows, { onConflict: "jugador_id,partido_id" })
}

export async function getAllJugadores() {
  return supabase.from("prode_jugadores").select("*").order("puntos", { ascending: false })
}

export async function getResultados() {
  return supabase.from("prode_resultados").select("*")
}

export async function upsertResultado(partido_id, goles_local, goles_visita, ganador_supl, ganador_pen) {
  return supabase.from("prode_resultados").upsert(
    { partido_id, goles_local, goles_visita, ganador_supl, ganador_pen },
    { onConflict: "partido_id" }
  )
}

export async function recalcularPuntos() {
  return supabase.rpc("recalcular_puntos")
}
