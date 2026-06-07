import { useRef, useEffect, useState } from "react"

// Paletas por empresa (igual que antes)
const PALETAS = [
  { bg: "#74C0FC", dark: "#1864AB", accent: "#fff" },   // celeste Argentina
  { bg: "#F03E3E", dark: "#C92A2A", accent: "#FFD700" }, // rojo
  { bg: "#2F9E44", dark: "#1B5E20", accent: "#fff" },   // verde Brasil
  { bg: "#F59F00", dark: "#8B5E00", accent: "#1a1a1a" }, // amarillo
  { bg: "#7950F2", dark: "#4C2FBF", accent: "#fff" },   // violeta
  { bg: "#1098AD", dark: "#0A6070", accent: "#fff" },   // cyan
  { bg: "#E8590C", dark: "#8B3000", accent: "#fff" },   // naranja
  { bg: "#212529", dark: "#000", accent: "#FFD700" },   // negro dorado
]

function getPaleta(empresa) {
  let n = 0
  for (let c of empresa) n += c.charCodeAt(0)
  return PALETAS[n % PALETAS.length]
}

function getNum(nombre, empresa) {
  let n = 0
  for (let c of nombre + empresa) n += c.charCodeAt(0)
  return String(n % 900 + 100)
}

export default function Figurita({ jugador, puntos, onCerrar }) {
  const ref = useRef()
  const [descargando, setDescargando] = useState(false)
  const paleta = getPaleta(jugador.empresa)
  const num = getNum(jugador.nombre, jugador.empresa)
  const iniciales = jugador.nombre.split(" ").map(p => p[0]).join("").toUpperCase().slice(0,2)
  const tieneFoto = jugador.foto_url && jugador.foto_url.length > 0

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
        scale: 3, useCORS: true, allowTaint: true, backgroundColor: null, logging: false
      })
      const link = document.createElement("a")
      link.download = `figurita-${jugador.nombre.replace(/ /g,"-")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch(e) { alert("Error al descargar.") }
    setDescargando(false)
  }

  const apellido = jugador.nombre.split(" ").slice(-1)[0]?.toUpperCase() || jugador.nombre.toUpperCase()
  const primerNombre = jugador.nombre.split(" ")[0] || ""

  return (
    <div className="figurita-overlay" onClick={onCerrar}>
      <div className="figurita-modal" onClick={e => e.stopPropagation()}>

        {/* CARTA PANINI */}
        <div className="pan-card" ref={ref} style={{
          "--bg": paleta.bg,
          "--dark": paleta.dark,
          "--acc": paleta.accent,
        }}>
          {/* Fondo degradé */}
          <div className="pan-fondo" />

          {/* Header — número + logos */}
          <div className="pan-top">
            <div className="pan-num">{num}</div>
            <div className="pan-logos">
              <img src="/logo.png" alt="LPS" className="pan-logo-lps" crossOrigin="anonymous" />
              <div className="pan-badge-fifa">⚽</div>
            </div>
          </div>

          {/* Foto principal */}
          <div className="pan-foto-area">
            {tieneFoto
              ? <img src={jugador.foto_url} alt={jugador.nombre} className="pan-foto" crossOrigin="anonymous" />
              : <div className="pan-avatar" style={{background: paleta.dark, color: paleta.bg}}>
                  {iniciales}
                </div>
            }
            {/* Gradiente sobre la foto */}
            <div className="pan-foto-overlay" />
          </div>

          {/* Info inferior */}
          <div className="pan-info" style={{background: paleta.dark}}>
            {/* Nombre grande */}
            <div className="pan-apellido" style={{color: paleta.accent}}>{apellido}</div>
            <div className="pan-primer-nombre">{primerNombre}</div>

            {/* Stats row */}
            <div className="pan-stats">
              {jugador.fecha_nac && (
                <div className="pan-stat-item">
                  <span className="pan-stat-label">NACIMIENTO</span>
                  <span className="pan-stat-val">{jugador.fecha_nac}</span>
                </div>
              )}
              {jugador.estatura && (
                <div className="pan-stat-item">
                  <span className="pan-stat-label">ESTATURA</span>
                  <span className="pan-stat-val">{jugador.estatura}</span>
                </div>
              )}
              {jugador.peso && (
                <div className="pan-stat-item">
                  <span className="pan-stat-label">PESO</span>
                  <span className="pan-stat-val">{jugador.peso}</span>
                </div>
              )}
              <div className="pan-stat-item">
                <span className="pan-stat-label">PUNTOS</span>
                <span className="pan-stat-val" style={{color: paleta.bg === "#74C0FC" ? "#FFD700" : paleta.bg}}>{puntos}</span>
              </div>
            </div>

            {/* Club */}
            <div className="pan-club">
              {jugador.club ? `🏟️ ${jugador.club}` : `🏢 ${jugador.empresa}`}
            </div>

            {/* Footer */}
            <div className="pan-footer">
              <span>PRODE MUNDIAL 2026</span>
              <span>LPS SEGURIDAD</span>
            </div>
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
