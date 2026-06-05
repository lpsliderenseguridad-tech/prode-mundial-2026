import { useState } from "react"
import { PARTIDOS, FASES } from "../fixture"

export default function AdminPanel({ isAdmin, adminPass, onAuth, partidos, resultados, onGuardarResultado }) {
  const [pass, setPass] = useState("")
  const [faseAdmin, setFaseAdmin] = useState("grupos")
  const [local, setLocal] = useState({})
  const [guardando, setGuardando] = useState(null)

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <div className="login-card" style={{ maxWidth: 340 }}>
          <div className="login-icon">⚙️</div>
          <h2 className="login-title" style={{ fontSize: 18 }}>Acceso admin</h2>
          <p className="login-sub">Solo para cargar resultados reales</p>
          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Contraseña admin"
              onKeyDown={e => { if (e.key === "Enter" && pass === adminPass) onAuth() }}
            />
          </div>
          <button
            className="btn-primary"
            onClick={() => { if (pass === adminPass) onAuth(); else alert("Contraseña incorrecta") }}
          >
            Ingresar
          </button>
        </div>
      </div>
    )
  }

  const faseParts = PARTIDOS.filter(p => p.fase === faseAdmin)
  const grupos = {}
  faseParts.forEach(p => {
    if (!grupos[p.subfase]) grupos[p.subfase] = []
    grupos[p.subfase].push(p)
  })

  const upd = (pid, side, val) => {
    setLocal(prev => ({ ...prev, [pid]: { ...prev[pid] || {}, [side]: val } }))
  }

  const getVal = (pid, side) => {
    if (local[pid]?.[side] !== undefined) return local[pid][side]
    if (resultados[pid]?.[side === "l" ? "l" : "v"] !== undefined) return resultados[pid][side]
    return ""
  }

  const guardar = async (pid) => {
    const l = getVal(pid, "l")
    const v = getVal(pid, "v")
    if (l === "" || v === "") { alert("Completá ambos scores"); return }
    setGuardando(pid)
    await onGuardarResultado(pid, parseInt(l), parseInt(v))
    setGuardando(null)
    alert("✅ Resultado guardado y ranking actualizado")
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <h2 className="ranking-title">⚙️ Panel admin — Resultados reales</h2>
        <p className="ranking-sub">Al guardar cada resultado el ranking se recalcula automáticamente</p>
      </div>
      <div className="fase-tabs">
        {FASES.map(f => (
          <button key={f.id} className={`fase-tab${faseAdmin === f.id ? " active" : ""}`}
            onClick={() => setFaseAdmin(f.id)}>{f.label}</button>
        ))}
      </div>
      <div className={faseAdmin === "grupos" ? "grupos-grid" : "partidos-list"}>
        {Object.entries(grupos).map(([subfase, ps]) => (
          <div key={subfase} className="grupo-card">
            <div className="grupo-header">{subfase}</div>
            {ps.map(p => {
              const cargado = resultados[p.id]
              return (
                <div key={p.id} className={`partido-row admin-row${cargado ? " jugado" : ""}`}>
                  <div className="team local small">{p.local}</div>
                  <div className="score-center">
                    <input type="number" min="0" max="20" value={getVal(p.id, "l")}
                      onChange={e => upd(p.id, "l", e.target.value)}
                      className="score-inp" placeholder="-" />
                    <span className="score-sep">:</span>
                    <input type="number" min="0" max="20" value={getVal(p.id, "v")}
                      onChange={e => upd(p.id, "v", e.target.value)}
                      className="score-inp" placeholder="-" />
                    <button className="btn-mini" onClick={() => guardar(p.id)} disabled={guardando === p.id}>
                      {guardando === p.id ? "..." : cargado ? "✏️" : "💾"}
                    </button>
                  </div>
                  <div className="team visita small">{p.visita}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
