import { useRef, useEffect, useState } from "react"

const PALETAS = [
  { bg: "#74C0FC", dark: "#1864AB", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#F03E3E", dark: "#C92A2A", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#2F9E44", dark: "#1B5E20", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#F59F00", dark: "#8B5E00", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#7950F2", dark: "#4C2FBF", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#1098AD", dark: "#0A6070", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#E8590C", dark: "#8B3000", text: "#fff", num_color: "rgba(255,255,255,0.15)" },
  { bg: "#212529", dark: "#000", text: "#FFD700", num_color: "rgba(255,215,0,0.12)" },
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
  const numFig = getNum(jugador.nombre, jugador.empresa)
  const iniciales = jugador.nombre.split(" ").map(p => p[0]).join("").toUpperCase().slice(0,2)
  const tieneFoto = jugador.foto_url && jugador.foto_url.length > 0
  const apellido = jugador.nombre.split(" ").slice(-1)[0]?.toUpperCase() || jugador.nombre.toUpperCase()
  const primerNombre = jugador.nombre.split(" ").slice(0,-1).join(" ") || ""

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

  return (
    <div className="figurita-overlay" onClick={onCerrar}>
      <div className="figurita-modal" onClick={e => e.stopPropagation()}>

        <div className="p26-card" ref={ref} style={{
          "--bg": paleta.bg,
          "--dark": paleta.dark,
          "--text": paleta.text,
          "--numcol": paleta.num_color,
        }}>
          {/* ===== ZONA SUPERIOR — FOTO ===== */}
          <div className="p26-foto-zona">

            {/* Fondo degradé */}
            <div className="p26-fondo-grad" />

            {/* "26" gigante semitransparente */}
            <div className="p26-big-num">26</div>

            {/* Número de figurita — esquina sup izq */}
            <div className="p26-fig-num">{numFig}</div>

            {/* Logos arriba derecha */}
            <div className="p26-top-right">
              <div className="p26-fifa-badge">
                <span style={{fontSize:"0.55rem", fontWeight:900, color:"white", letterSpacing:1}}>FIFA</span>
                <span style={{fontSize:"0.7rem"}}>⚽</span>
              </div>
            </div>

            {/* Logo LPS arriba izq (debajo del número) */}
            <img src="/logo.png" alt="LPS" className="p26-lps-logo" crossOrigin="anonymous" />

            {/* Foto jugador */}
            <div className="p26-foto-wrap">
              {tieneFoto
                ? <img src={jugador.foto_url} alt={jugador.nombre} className="p26-foto" crossOrigin="anonymous" />
                : <div className="p26-avatar" style={{background: paleta.dark, color: paleta.bg}}>
                    {iniciales}
                  </div>
              }
            </div>

            {/* Gradiente inferior sobre la foto */}
            <div className="p26-foto-grad" />

            {/* Bandera abajo izq */}
            <div className="p26-bandera">🇦🇷</div>
          </div>

          {/* ===== ZONA INFERIOR — DATOS ===== */}
          <div className="p26-datos" style={{background: paleta.dark}}>
            <div className="p26-nombre-wrap">
              <div className="p26-apellido">{apellido}</div>
              {primerNombre && <div className="p26-primernombre">{primerNombre}</div>}
            </div>

            <div className="p26-ficha">
              {jugador.fecha_nac && <span>{jugador.fecha_nac}</span>}
              {jugador.fecha_nac && jugador.estatura && <span className="p26-sep">·</span>}
              {jugador.estatura && <span>{jugador.estatura}</span>}
              {jugador.estatura && jugador.peso && <span className="p26-sep">·</span>}
              {jugador.peso && <span>{jugador.peso}</span>}
            </div>

            <div className="p26-club-row">
              <span className="p26-club-txt">
                {jugador.club ? jugador.club.toUpperCase() : jugador.empresa.toUpperCase()}
              </span>
              <img src="/logo.png" alt="LPS" className="p26-panini-logo" crossOrigin="anonymous" />
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
