import { useState } from "react"
import { PARTIDOS, FASES } from "../fixture"

const ES_ELIMINATORIA = (fase) => ["r32","r16","r8","semi","3ro","final"].includes(fase)

function shortName(label) {
  return label.replace(/^[\p{Emoji}\s]+/u, "").trim()
}

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
    const r = resultados[pid]
    if (r) {
      if (side === "l") return r.l ?? ""
      if (side === "v") return r.v ?? ""
      if (side === "supl") return r.supl ?? ""
      if (side === "pen") return r.pen ?? ""
    }
    return ""
  }

  const guardar = async (pid, p) => {
    const l = getVal(pid, "l")
    const v = getVal(pid, "v")
    if (l === "" || v === "") { alert("Completá ambos scores"); return }
    const esElim = ES_ELIMINATORIA(p.fase)
    const esEmpate = parseInt(l) === parseInt(v)
    const supl = esElim && esEmpate ? (getVal(pid, "supl") || null) : null
    const pen = supl === "empate" ? (getVal(pid, "pen") || null) : null
    setGuardando(pid)
    await onGuardarResultado(pid, parseInt(l), parseInt(v), supl, pen)
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
              const lVal = getVal(p.id, "l")
              const vVal = getVal(p.id, "v")
              const esEmpate = lVal !== "" && vVal !== "" && parseInt(lVal) === parseInt(vVal)
              const esElim = ES_ELIMINATORIA(p.fase)
              const suplVal = getVal(p.id, "supl")

              return (
                <div key={p.id} className={`partido-row admin-row${cargado ? " jugado" : ""}`}>
                  <div className="partido-meta" style={{fontSize:"0.7rem", color:"var(--text-muted)"}}>
                    {p.fecha && <span>📅 {p.fecha}</span>}
                    {p.estadio && <span> · 📍 {p.estadio}</span>}
                  </div>
                  <div className="team local small">{p.local}</div>
                  <div className="score-center">
                    <input type="number" min="0" max="20" value={lVal}
                      onChange={e => upd(p.id, "l", e.target.value)}
                      className="score-inp" placeholder="-" />
                    <span className="score-sep">:</span>
                    <input type="number" min="0" max="20" value={vVal}
                      onChange={e => upd(p.id, "v", e.target.value)}
                      className="score-inp" placeholder="-" />
                    <button className="btn-mini" onClick={() => guardar(p.id, p)} disabled={guardando === p.id}>
                      {guardando === p.id ? "..." : cargado ? "✏️" : "💾"}
                    </button>
                  </div>
                  <div className="team visita small">{p.visita}</div>

                  {/* Suplementario en eliminatorias con empate */}
                  {esElim && esEmpate && (
                    <div className="ganador-row" style={{marginTop:"6px"}}>
                      <span className="ganador-label" style={{fontSize:"0.7rem"}}>⏱ Suplementario</span>
                      <div className="ganador-btns">
                        {["l","empate","v"].map(opt => (
                          <button key={opt}
                            className={`btn-ganador${suplVal === opt ? " active" : ""}`}
                            style={{fontSize:"0.65rem", padding:"3px 7px"}}
                            onClick={() => upd(p.id, "supl", opt)}>
                            {opt === "l" ? shortName(p.local) : opt === "v" ? shortName(p.visita) : "Pen."}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Penales */}
                  {esElim && esEmpate && suplVal === "empate" && (
                    <div className="ganador-row" style={{marginTop:"4px"}}>
                      <span className="ganador-label" style={{fontSize:"0.7rem"}}>🎯 Penales</span>
                      <div className="ganador-btns">
                        {["l","v"].map(opt => (
                          <button key={opt}
                            className={`btn-ganador${getVal(p.id,"pen") === opt ? " active" : ""}`}
                            style={{fontSize:"0.65rem", padding:"3px 7px"}}
                            onClick={() => upd(p.id, "pen", opt)}>
                            {opt === "l" ? shortName(p.local) : shortName(p.visita)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
