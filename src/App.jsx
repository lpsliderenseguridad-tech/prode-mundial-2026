import { useState, useEffect, useCallback } from "react"
import { PARTIDOS, FASES } from "./fixture"
import {
  upsertJugador, getPronosticos, guardarFase,
  getAllJugadores, getResultados, upsertResultado, recalcularPuntos, subirFoto
} from "./supabase"
import Login from "./components/Login"
import FasePartidos from "./components/FasePartidos"
import RankingGeneral from "./components/RankingGeneral"
import RankingEmpresas from "./components/RankingEmpresas"
import AdminPanel from "./components/AdminPanel"
import Figurita from "./components/Figurita"

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "lps2026"
const ES_ELIMINATORIA = (fase) => ["r32","r16","r8","semi","3ro","final"].includes(fase)

export default function App() {
  const [jugador, setJugador] = useState(null)
  const [pronosticos, setPronosticos] = useState({})
  const [resultados, setResultados] = useState({})
  const [jugadores, setJugadores] = useState([])
  const [faseActiva, setFaseActiva] = useState("grupos")
  const [vista, setVista] = useState("pronosticos")
  const [loading, setLoading] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [verFigurita, setVerFigurita] = useState(false)

  const cargarGlobales = useCallback(async () => {
    const [{ data: resList }, { data: jugList }] = await Promise.all([
      getResultados(),
      getAllJugadores(),
    ])
    if (resList) {
      const map = {}
      resList.forEach(r => { map[r.partido_id] = { l: r.goles_local, v: r.goles_visita, supl: r.ganador_supl, pen: r.ganador_pen } })
      setResultados(map)
    }
    if (jugList) setJugadores(jugList)
  }, [])

  useEffect(() => { cargarGlobales() }, [cargarGlobales])

  const handleLogin = async (nombre, empresa, foto) => {
    setLoading(true)
    console.log("foto recibida:", foto)
    let fotoUrl = null
    if (foto) {
      console.log("subiendo foto...")
      fotoUrl = await subirFoto(foto, nombre, empresa)
      console.log("fotoUrl resultado:", fotoUrl)
    }
    const { data, error } = await upsertJugador(nombre, empresa, fotoUrl)
    if (error || !data) { alert("Error al registrarse. Intentá de nuevo."); setLoading(false); return }
    const { data: pros } = await getPronosticos(data.id)
    const map = {}
    if (pros) pros.forEach(p => { map[p.partido_id] = { l: p.goles_local ?? "", v: p.goles_visita ?? "", supl: p.ganador_supl || "", pen: p.ganador_pen || "" } })
    setPronosticos(map)
    setJugador(data)
    setLoading(false)
  }

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

  const calcPts = (pid, pro) => {
    const r = resultados[pid]
    if (!r || pro.l === "" || pro.v === "") return 0
    const fase = PARTIDOS.find(p => p.id === pid)?.fase
    const esElim = ES_ELIMINATORIA(fase)

    const esEmpate90Real = r.l === r.v
    const esEmpate90Pro = parseInt(pro.l) === parseInt(pro.v)
    const exacto90 = parseInt(pro.l) === r.l && parseInt(pro.v) === r.v

    if (!esElim) {
      if (exacto90) return 3
      const rs = r.l > r.v ? 1 : r.l < r.v ? -1 : 0
      const ps = parseInt(pro.l) > parseInt(pro.v) ? 1 : parseInt(pro.l) < parseInt(pro.v) ? -1 : 0
      return rs === ps ? 1 : 0
    }

    let pts = 0
    if (exacto90) {
      pts += 4
    } else if (esEmpate90Real && esEmpate90Pro) {
      pts += 1
    } else {
      const rsGan = r.l > r.v ? "l" : r.l < r.v ? "v" : null
      const psGan = parseInt(pro.l) > parseInt(pro.v) ? "l" : parseInt(pro.l) < parseInt(pro.v) ? "v" : null
      if (rsGan && psGan && rsGan === psGan) pts += 3
    }

    if (esEmpate90Real && r.supl && pro.supl) {
      if (pro.supl === r.supl) pts += 1
    }
    if (esEmpate90Real && r.supl === "empate" && r.pen && pro.pen) {
      if (pro.pen === r.pen) pts += 1
    }

    return pts
  }

  const totalPuntos = PARTIDOS.reduce((acc, p) => acc + calcPts(p.id, pronosticos[p.id] || { l: "", v: "" }), 0)

  if (!jugador) return <Login onLogin={handleLogin} loading={loading} />

  return (
    <div className="app-wrap">
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <img src="/logo.png" alt="LPS" className="header-logo-img" />
            <span>Prode Mundial 2026</span>
          </div>
          <div className="header-user">
            <span className="user-name">{jugador.nombre}</span>
            <span className="user-empresa">{jugador.empresa}</span>
            <span className="pts-badge">{totalPuntos} pts</span>
            <button className="btn-figurita" onClick={() => setVerFigurita(true)}>⭐ Mi figurita</button>
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
            onGuardarResultado={async (pid, l, v, supl, pen) => {
              await upsertResultado(pid, l, v, supl, pen)
              await recalcularPuntos()
              await cargarGlobales()
            }}
          />
        )}
      </main>

      {verFigurita && <Figurita jugador={jugador} puntos={totalPuntos} onCerrar={() => setVerFigurita(false)} />}
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
