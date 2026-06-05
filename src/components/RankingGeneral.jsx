// RankingGeneral.jsx
export function RankingGeneral({ jugadores, jugadorActual }) {
  const sorted = [...jugadores].sort((a, b) => b.puntos - a.puntos)
  return (
    <div className="ranking-wrap">
      <h2 className="ranking-title">🏅 Ranking general</h2>
      <p className="ranking-sub">{sorted.length} participantes · Exacto = 3 pts · Ganador = 1 pt</p>
      <div className="ranking-table-wrap">
        <table className="ranking-table">
          <thead>
            <tr><th>#</th><th>Jugador</th><th>Empresa</th><th>Pts</th></tr>
          </thead>
          <tbody>
            {sorted.map((j, i) => {
              const esMio = jugadorActual && j.id === jugadorActual.id
              return (
                <tr key={j.id} className={esMio ? "row-mine" : ""}>
                  <td className="pos">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </td>
                  <td className="nombre-cell">
                    <div className="avatar">{j.nombre.slice(0, 2).toUpperCase()}</div>
                    <span>{j.nombre}{esMio ? " (vos)" : ""}</span>
                  </td>
                  <td className="empresa-cell">{j.empresa}</td>
                  <td className="pts-cell">{j.puntos}</td>
                </tr>
              )
            })}
            {sorted.length === 0 && (
              <tr><td colSpan={4} className="empty-row">Todavía no hay participantes</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// RankingEmpresas.jsx
export function RankingEmpresas({ jugadores }) {
  // Agrupar por empresa, tomar el mejor individual
  const empresaMap = {}
  jugadores.forEach(j => {
    const emp = j.empresa.trim()
    if (!empresaMap[emp]) empresaMap[emp] = { empresa: emp, jugadores: [] }
    empresaMap[emp].jugadores.push(j)
  })

  const empresas = Object.values(empresaMap).map(e => {
    const mejor = e.jugadores.reduce((best, j) => j.puntos > best.puntos ? j : best, e.jugadores[0])
    return {
      empresa: e.empresa,
      mejorJugador: mejor.nombre,
      puntosMejor: mejor.puntos,
      cantJugadores: e.jugadores.length,
    }
  }).sort((a, b) => b.puntosMejor - a.puntosMejor)

  return (
    <div className="ranking-wrap">
      <h2 className="ranking-title">🏢 Ranking de empresas</h2>
      <p className="ranking-sub">Se mide por el mejor jugador individual de cada empresa</p>
      <div className="ranking-table-wrap">
        <table className="ranking-table">
          <thead>
            <tr><th>#</th><th>Empresa</th><th>Mejor jugador</th><th>Participantes</th><th>Pts</th></tr>
          </thead>
          <tbody>
            {empresas.map((e, i) => (
              <tr key={e.empresa}>
                <td className="pos">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </td>
                <td className="nombre-cell"><strong>{e.empresa}</strong></td>
                <td className="empresa-cell">{e.mejorJugador}</td>
                <td className="empresa-cell">{e.cantJugadores} {e.cantJugadores === 1 ? "persona" : "personas"}</td>
                <td className="pts-cell">{e.puntosMejor}</td>
              </tr>
            ))}
            {empresas.length === 0 && (
              <tr><td colSpan={5} className="empty-row">Todavía no hay empresas registradas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RankingGeneral
