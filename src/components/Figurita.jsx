import { useRef } from "react"

// Colores por inicial de empresa
const COLORES = [
  ["#1a237e","#ffb300"], ["#b71c1c","#fff176"], ["#1b5e20","#a5d6a7"],
  ["#4a148c","#ce93d8"], ["#006064","#80deea"], ["#bf360c","#ffccbc"],
  ["#263238","#90a4ae"], ["#880e4f","#f48fb1"],
]

function getColor(empresa) {
  let n = 0
  for (let i = 0; i < empresa.length; i++) n += empresa.charCodeAt(i)
  return COLORES[n % COLORES.length]
}

function getNum(nombre, empresa) {
  let n = 0
  for (let c of nombre + empresa) n += c.charCodeAt(0)
  return String(n % 900 + 100)
}

export default function Figurita({ jugador, puntos, onCerrar }) {
  const ref = useRef()
  const [bg, accent] = getColor(jugador.empresa)
  const num = getNum(jugador.nombre, jugador.empresa)
  const iniciales = jugador.nombre.split(" ").map(p => p[0]).join("").toUpperCase().slice(0,2)

  const descargar = async () => {
    // Usar html2canvas si está disponible, sino abrir print
    if (window.html2canvas) {
      const canvas = await window.html2canvas(ref.current, { scale: 2, useCORS: true })
      const link = document.createElement("a")
      link.download = `figurita-${jugador.nombre.replace(/ /g,"-")}.png`
      link.href = canvas.toDataURL()
      link.click()
    } else {
      window.print()
    }
  }

  return (
    <div className="figurita-overlay" onClick={onCerrar}>
      <div className="figurita-modal" onClick={e => e.stopPropagation()}>
        <div className="figurita-card" ref={ref} style={{"--bg": bg, "--accent": accent}}>
          {/* Header */}
          <div className="fig-header">
            <span className="fig-num">#{num}</span>
            <span className="fig-pais">🌎 MUNDIAL 2026</span>
          </div>

          {/* Avatar */}
          <div className="fig-avatar-wrap">
            <div className="fig-avatar" style={{background: accent, color: bg}}>
              {iniciales}
            </div>
            <div className="fig-stars">
              {[...Array(Math.min(5, Math.floor(puntos/5)+1))].map((_,i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>

          {/* Nombre */}
          <div className="fig-nombre">{jugador.nombre.toUpperCase()}</div>
          <div className="fig-empresa">{jugador.empresa}</div>

          {/* Stats */}
          <div className="fig-stats">
            <div className="fig-stat">
              <span className="fig-stat-val">{puntos}</span>
              <span className="fig-stat-lbl">PTS</span>
            </div>
            <div className="fig-stat-div" />
            <div className="fig-stat">
              <span className="fig-stat-val">🏆</span>
              <span className="fig-stat-lbl">PRODE</span>
            </div>
          </div>

          {/* Footer */}
          <div className="fig-footer">
            <img src="/logo.png" alt="LPS" className="fig-logo" />
            <span>LPS Seguridad · Mundial 2026</span>
          </div>
        </div>

        <div className="figurita-btns">
          <button className="btn-guardar" onClick={descargar}>📥 Descargar figurita</button>
          <button className="btn-cerrar-fig" onClick={onCerrar}>✕ Cerrar</button>
        </div>
        <p className="fig-hint">¡Compartila por WhatsApp! 📲</p>
      </div>
    </div>
  )
}
