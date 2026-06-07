import { useRef, useEffect, useState } from "react"

const COLORES = [
  ["#1a237e","#ffb300"], ["#b71c1c","#e53935"], ["#1b5e20","#43a047"],
  ["#4a148c","#9c27b0"], ["#006064","#00bcd4"], ["#bf360c","#ff5722"],
  ["#263238","#607d8b"], ["#880e4f","#e91e63"],
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
  const [descargando, setDescargando] = useState(false)
  const [bg, accent] = getColor(jugador.empresa)
  const num = getNum(jugador.nombre, jugador.empresa)
  const iniciales = jugador.nombre.split(" ").map(p => p[0]).join("").toUpperCase().slice(0,2)
  console.log("jugador en figurita:", jugador)
  const tieneFoto = jugador.foto_url && jugador.foto_url.length > 0
  console.log("tieneFoto:", tieneFoto, jugador.foto_url)

  useEffect(() => {
    if (!window.html2canvas) {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
      document.head.appendChild(script)
    }
  }, [])

  const descargar = async () => {
    setDescargando(true)
    try {
      let attempts = 0
      while (!window.html2canvas && attempts < 30) {
        await new Promise(r => setTimeout(r, 200))
        attempts++
      }
      if (!window.html2canvas) { alert("Error. Intentá de nuevo."); setDescargando(false); return }
      const canvas = await window.html2canvas(ref.current, {
        scale: 3, useCORS: true, allowTaint: true,
        backgroundColor: null, logging: false
      })
      const link = document.createElement("a")
      link.download = `figurita-${jugador.nombre.replace(/ /g,"-")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch(e) {
      alert("Error al descargar. Intentá de nuevo.")
    }
    setDescargando(false)
  }

  return (
    <div className="figurita-overlay" onClick={onCerrar}>
      <div className="figurita-modal" onClick={e => e.stopPropagation()}>

        <div className="figurita-card panini" ref={ref} style={{"--bg": bg, "--accent": accent}}>
          {/* Fondo con degradé */}
          <div className="panini-bg" />

          {/* Foto o Avatar — ocupa 65% de la carta */}
          <div className="panini-foto-wrap">
            {tieneFoto
              ? <img src={jugador.foto_url} alt={jugador.nombre} className="panini-foto" crossOrigin="anonymous" />
              : <div className="panini-avatar-fallback" style={{background: accent, color: bg}}>
                  {iniciales}
                </div>
            }
            {/* Número grande superpuesto */}
            <div className="panini-num">#{num}</div>
          </div>

          {/* Franja inferior con datos */}
          <div className="panini-info" style={{background: bg}}>
            <div className="panini-nombre">{jugador.nombre.toUpperCase()}</div>
            <div className="panini-empresa" style={{color: accent}}>{jugador.empresa}</div>
            <div className="panini-stats-row">
              <div className="panini-stat">
                <span className="panini-stat-val" style={{color: accent}}>{puntos}</span>
                <span className="panini-stat-lbl">PUNTOS</span>
              </div>
              <div className="panini-stat-sep" />
              <div className="panini-stat">
                <span className="panini-stat-val" style={{color: accent}}>⚽</span>
                <span className="panini-stat-lbl">MUNDIAL 2026</span>
              </div>
            </div>
          </div>

          {/* Logo LPS + PANINI style badge */}
          <div className="panini-corner-logo">
            <img src="/logo.png" alt="LPS" crossOrigin="anonymous" />
          </div>
          <div className="panini-corner-badge" style={{background: accent, color: bg}}>
            LPS
          </div>
        </div>

        <div className="figurita-btns">
          <button className="btn-guardar" onClick={descargar} disabled={descargando}>
            {descargando ? "⏳ Generando..." : "📥 Descargar figurita"}
          </button>
          <button className="btn-cerrar-fig" onClick={onCerrar}>✕</button>
        </div>
        <p className="fig-hint">¡Compartila por WhatsApp! 📲</p>
      </div>
    </div>
  )
}
