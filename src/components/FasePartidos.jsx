import { useState, useEffect } from "react"

const ES_ELIMINATORIA = (fase) => ["r32","r16","r8","semi","3ro","final"].includes(fase)

// Extract short name from "🇦🇷 Argentina" → "Argentina"
function shortName(label) {
  return label.replace(/^[\p{Emoji}\s]+/u, "").trim()
}

export default function FasePartidos({ fase, partidos, pronosticos, resultados, calcPts, onGuardar, guardando }) {
  const [local, setLocal] = useState({})

  useEffect(() => {
    const map = {}
    partidos.forEach(p => {
      map[p.id] = pronosticos[p.id] || { l: "", v: "", supl: "", pen: "" }
    })
    setLocal(map)
  }, [fase, partidos, pronosticos])

  const upd = (pid, side, val) => {
    setLocal(prev => {
      const cur = prev[pid] || { l: "", v: "", supl: "", pen: "" }
      const updated = { ...cur, [side]: val }
      if (side === "l" || side === "v") {
        const l = side === "l" ? val : cur.l
        const v = side === "v" ? val : cur.v
        if (l !== "" && v !== "" && parseInt(l) !== parseInt(v)) {
          updated.supl = ""
          updated.pen = ""
        }
      }
      if (side === "supl" && val !== "empate") {
        updated.pen = ""
      }
      return { ...prev, [pid]: updated }
    })
  }

  const guardar = () => onGuardar(local)

  const grupos = {}
  partidos.forEach(p => {
    if (!grupos[p.subfase]) grupos[p.subfase] = []
    grupos[p.subfase].push(p)
  })

  const esElim = ES_ELIMINATORIA(fase)
  const esGrupos = fase === "grupos"

  return (
    <div className="fase-wrap">
      {esElim && (
        <div className="info-elim">
          ⚽ <strong>Puntaje eliminatorias:</strong> Ganador 90min = 3pts · Exacto 90min = 4pts · Empate 90min = 1pt · Suplementario = +1pt · Penales = +1pt
        </div>
      )}
      <div className={esGrupos ? "grupos-grid" : "partidos-list"}>
        {Object.entries(grupos).map(([subfase, ps]) => (
          <div key={subfase} className="grupo-card">
            <div className="grupo-header">{subfase}</div>
            {ps.map(p => {
              const pro = local[p.id] || { l: "", v: "", supl: "", pen: "" }
              const pts = calcPts(p.id, pro)
              const resReal = resultados[p.id]
              const esEmpate90 = pro.l !== "" && pro.v !== "" && parseInt(pro.l) === parseInt(pro.v)
              const hayEmpateSupl = pro.supl === "empate"

              return (
                <div key={p.id} className={`partido-row${resReal ? " jugado" : ""}`}>
                  {(p.fecha || p.estadio) && (
                    <div className="partido-meta">
                      {p.fecha && <span className="meta-fecha">📅 {p.fecha}{p.hora && p.hora !== "00:00" ? ` · ${p.hora} hs` : ""}</span>}
                      {p.estadio && <span className="meta-estadio">📍 {p.estadio}</span>}
                    </div>
                  )}

                  <div className="team local">{p.local}</div>
                  <div className="score-center">
                    <input type="number" min="0" max="20" value={pro.l}
                      onChange={e => upd(p.id, "l", e.target.value)}
                      className="score-inp" placeholder="-" />
                    <span className="score-sep">:</span>
                    <input type="number" min="0" max="20" value={pro.v}
                      onChange={e => upd(p.id, "v", e.target.value)}
                      className="score-inp" placeholder="-" />
                    {pts > 0 && <span className="pts-ok">+{pts}</span>}
                  </div>
                  <div className="team visita">{p.visita}</div>

                  {esElim && esEmpate90 && (
                    <div className="ganador-row">
                      <span className="ganador-label">⏱ Suplementario — ¿quién gana?</span>
                      <div className="ganador-btns">
                        <button className={`btn-ganador${pro.supl === "l" ? " active" : ""}`}
                          onClick={() => upd(p.id, "supl", pro.supl === "l" ? "" : "l")}>
                          {shortName(p.local)} 🏆
                        </button>
                        <button className={`btn-ganador btn-empate${pro.supl === "empate" ? " active" : ""}`}
                          onClick={() => upd(p.id, "supl", pro.supl === "empate" ? "" : "empate")}>
                          Empate → Pen.
                        </button>
                        <button className={`btn-ganador${pro.supl === "v" ? " active" : ""}`}
                          onClick={() => upd(p.id, "supl", pro.supl === "v" ? "" : "v")}>
                          🏆 {shortName(p.visita)}
                        </button>
                      </div>
                    </div>
                  )}

                  {esElim && esEmpate90 && hayEmpateSupl && (
                    <div className="ganador-row">
                      <span className="ganador-label">🎯 Penales — ¿quién gana?</span>
                      <div className="ganador-btns">
                        <button className={`btn-ganador${pro.pen === "l" ? " active" : ""}`}
                          onClick={() => upd(p.id, "pen", pro.pen === "l" ? "" : "l")}>
                          {shortName(p.local)} 🏆
                        </button>
                        <button className={`btn-ganador${pro.pen === "v" ? " active" : ""}`}
                          onClick={() => upd(p.id, "pen", pro.pen === "v" ? "" : "v")}>
                          🏆 {shortName(p.visita)}
                        </button>
                      </div>
                    </div>
                  )}

                  {resReal && (
                    <div className="res-real">
                      Real 90min: {resReal.l}-{resReal.v}
                      {resReal.supl && resReal.supl !== "empate" && ` · Supl: ganó ${resReal.supl === "l" ? shortName(p.local) : shortName(p.visita)}`}
                      {resReal.supl === "empate" && resReal.pen && ` · Pen: ganó ${resReal.pen === "l" ? shortName(p.local) : shortName(p.visita)}`}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="guardar-wrap">
        <button className="btn-guardar" onClick={guardar} disabled={guardando}>
          {guardando ? "Guardando..." : "💾 Guardar pronósticos"}
        </button>
      </div>
    </div>
  )
}
