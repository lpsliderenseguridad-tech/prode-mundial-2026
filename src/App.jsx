import { useState, useEffect, useCallback } from "react"
import { PARTIDOS, FASES } from "./fixture"
import {
  upsertJugador, getPronosticos, guardarFase,
  getAllJugadores, getResultados, upsertResultado, recalcularPuntos
} from "./supabase"
import Login from "./components/Login"
import FasePartidos from "./components/FasePartidos"
import RankingGeneral from "./components/RankingGeneral"
import RankingEmpresas from "./components/RankingEmpresas"
import AdminPanel from "./components/AdminPanel"

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "lps2026"

export default function App() {
  const [jugador, setJugador] = useState(null)
  const [pronosticos, setPronosticos] = useState({}) // { partidoId: {l,v} }
  const [resultados, setResultados] = useState({})   // { partidoId: {l,v} }
  const [jugadores, setJugadores] = useState([])
  const [faseActiva, setFaseActiva] = useState("grupos")
  const [vista, setVista] = useState("pronosticos") // pronosticos | ranking | empresas | admin
  const [loading, setLoading] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Cargar resultados y jugadores globales
  const cargarGlobales = useCallback(async () => {
    const [{ data: resList }, { data: jugList }] = await Promise.all([
      getResultados(),
      getAllJugadores(),
    ])
    if (resList) {
      const map = {}
      resList.forEach(r => { map[r.partido_id] = { l: r.goles_local, v: r.goles_visita } })
      setResultados(map)
    }
    if (jugList) setJugadores(jugList)
  }, [])

  useEffect(() => { cargarGlobales() }, [cargarGlobales])

  // Login
  const handleLogin = async (nombre, empresa) => {
    setLoading(true)
    const { data, error } = await upsertJugador(nombre, empresa)
    if (error || !data) { alert("Error al registrarse. Intentá de nuevo."); setLoading(false); return }

    const { data: pros } = await getPronosticos(data.id)
    const map = {}
    if (pros) pros.forEach(p => { map[p.partido_id] = { l: p.goles_local ?? "", v: p.goles_visita ?? "" } })
    setPronosticos(map)
    setJugador(data)
    setLoading(false)
  }

  // Guardar fase
  const handleGuardar = async (nuevos) => {
    if (!jugador) return
    setGuardando(true)
    const merged = { ...pronosticos, ...nuevos }
    await guardarFase(jugador.id, merged)
    setPronosticos(merged)
    await cargarGlobales()
    setGuardando(false)
    alert("✅ ¡Pronósticos guardados!")
  }

  // Calcular puntos localmente para mostrar feedback inmediato
  const calcPts = (pid, pro) => {
    const r = resultados[pid]
    if (!r || pro.l === "" || pro.v === "") return 0
    if (+pro.l === r.l && +pro.v === r.v) return 3
    const rs = r.l > r.v ? 1 : r.l < r.v ? -1 : 0
    const ps = +pro.l > +pro.v ? 1 : +pro.l < +pro.v ? -1 : 0
    return rs === ps ? 1 : 0
  }

  const totalPuntos = PARTIDOS.reduce((acc, p) => acc + calcPts(p.id, pronosticos[p.id] || { l: "", v: "" }), 0)

  if (!jugador) return <Login onLogin={handleLogin} loading={loading} />

  return (
    <div className="app-wrap">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            ⚽ <span>Prode Mundial 2026</span>
            <span className="header-by">por <strong>LPS Seguridad</strong></span>
          </div>
          <div className="header-user">
            <span className="user-name">{jugador.nombre}</span>
            <span className="user-empresa">{jugador.empresa}</span>
            <span className="pts-badge">{totalPuntos} pts</span>
          </div>
        </div>
        <nav className="main-nav">
          {[
            { id: "pronosticos", label: "Mis pronósticos" },
            { id: "ranking", label: "🏅 Ranking general" },
            { id: "empresas", label: "🏢 Ranking empresas" },
            { id: "admin", label: "⚙️ Admin" },
          ].map(v => (
            <button key={v.id} className={`nav-btn${vista === v.id ? " active" : ""}`}
              onClick={() => setVista(v.id)}>{v.label}</button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        {vista === "pronosticos" && (
          <div>
            {/* Tabs de fases */}
            <div className="fase-tabs">
              {FASES.map(f => (
                <button key={f.id} className={`fase-tab${faseActiva === f.id ? " active" : ""}`}
                  onClick={() => setFaseActiva(f.id)}>{f.label}</button>
              ))}
            </div>
            <FasePartidos
              fase={faseActiva}
              partidos={PARTIDOS.filter(p => p.fase === faseActiva)}
              pronosticos={pronosticos}
              resultados={resultados}
              calcPts={calcPts}
              onGuardar={handleGuardar}
              guardando={guardando}
            />
          </div>
        )}
        {vista === "ranking" && <RankingGeneral jugadores={jugadores} jugadorActual={jugador} />}
        {vista === "empresas" && <RankingEmpresas jugadores={jugadores} />}
        {vista === "admin" && (
          <AdminPanel
            isAdmin={isAdmin}
            adminPass={ADMIN_PASS}
            onAuth={() => setIsAdmin(true)}
            partidos={PARTIDOS}
            resultados={resultados}
            onGuardarResultado={async (pid, l, v) => {
              await upsertResultado(pid, l, v)
              await recalcularPuntos()
              await cargarGlobales()
            }}
          />
        )}
      </main>
      <footer className="lps-footer">
        <span>⚽ Prode organizado por</span>
        <strong>🔥 LPS Seguridad</strong>
        <span>·</span>
        <a href="https://wa.me/5493584602508" target="_blank" rel="noreferrer">📲 3584602508</a>
        <span>·</span>
        <a href="https://lpsseguridad.com.ar" target="_blank" rel="noreferrer">lpsseguridad.com.ar</a>
      </footer>
    </div>
  )
}
