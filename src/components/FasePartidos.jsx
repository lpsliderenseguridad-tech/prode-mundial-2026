import { useState, useEffect } from "react"

export default function FasePartidos({ fase, partidos, pronosticos, resultados, calcPts, onGuardar, guardando }) {
  const [local, setLocal] = useState({})

  useEffect(() => {
    const map = {}
    partidos.forEach(p => {
      map[p.id] = pronosticos[p.id] || { l: "", v: "" }
    })
    setLocal(map)
  }, [fase, partidos, pronosticos])

  const upd = (pid, side, val) => {
    setLocal(prev => ({ ...prev, [pid]: { ...prev[pid], [side]: val } }))
  }

  const guardar = () => onGuardar(local)

  // Agrupar por subfase
  const grupos = {}
  partidos.forEach(p => {
    if (!grupos[p.subfase]) grupos[p.subfase] = []
    grupos[p.subfase].push(p)
  })

  const esGrupos = fase === "grupos"

  return (
    <div className="fase-wrap">
      <div className={esGrupos ? "grupos-grid" : "partidos-list"}>
        {Object.entries(grupos).map(([subfase, ps]) => (
          <div key={subfase} className="grupo-card">
            <div className="grupo-header">{subfase}</div>
            {ps.map(p => {
              const pro = local[p.id] || { l: "", v: "" }
              const pts = calcPts(p.id, pro)
              const resReal = resultados[p.id]
              return (
                <div key={p.id} className={`partido-row${resReal ? " jugado" : ""}`}>
                  {(p.fecha || p.estadio) && (
                    <div className="partido-meta">
                      {p.fecha && <span className="meta-fecha">📅 {p.fecha}{p.hora ? ` · ${p.hora} ARG` : ""}</span>}
                      {p.estadio && <span className="meta-estadio">📍 {p.estadio}</span>}
                    </div>
                  )}
                  <div className="team local">{p.local}</div>
                  <div className="score-center">
                    <input
                      type="number" min="0" max="20"
                      value={pro.l}
                      onChange={e => upd(p.id, "l", e.target.value)}
                      className="score-inp"
                      placeholder="-"
                    />
                    <span className="score-sep">:</span>
                    <input
                      type="number" min="0" max="20"
                      value={pro.v}
                      onChange={e => upd(p.id, "v", e.target.value)}
                      className="score-inp"
                      placeholder="-"
                    />
                    {pts > 0 && <span className="pts-ok">+{pts}</span>}
                  </div>
                  <div className="team visita">{p.visita}</div>
                  {resReal && (
                    <div className="res-real">
                      Resultado real: {resReal.l} - {resReal.v}
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
