import { useRef, useEffect, useState } from "react"

const PALETAS = [
  { bg: "#5BC4C0", num: "#3A9E9A", dark: "#2D7A77", bandera: "🇦🇷" },
  { bg: "#E85D5D", num: "#C23B3B", dark: "#9E2A2A", bandera: "🇪🇸" },
  { bg: "#5BAD6F", num: "#3A8A50", dark: "#276638", bandera: "🇧🇷" },
  { bg: "#E8A83A", num: "#C47F1A", dark: "#9E6010", bandera: "🇨🇴" },
  { bg: "#7B68EE", num: "#5A4BC9", dark: "#3D30A8", bandera: "🇫🇷" },
  { bg: "#5BA8C4", num: "#3A7EA0", dark: "#275E7A", bandera: "🇺🇾" },
  { bg: "#E87A3A", num: "#C45A1A", dark: "#9E3E10", bandera: "🇲🇽" },
  { bg: "#4A4A6A", num: "#2A2A4A", dark: "#1A1A3A", bandera: "🌍" },
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
  const partes = jugador.nombre.trim().split(" ")
  const apellido = partes.slice(-1)[0]?.toUpperCase() || ""
  const primerNombre = partes.slice(0,-1).join(" ").toUpperCase() || ""

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

        <div className="p26v2-card" ref={ref} style={{
          "--bg": paleta.bg,
          "--num": paleta.num,
          "--dark": paleta.dark,
        }}>
          {/* ===== ZONA FOTO ===== */}
          <div className="p26v2-top">

            {/* Fondo sólido */}
            <div className="p26v2-bg" />

            {/* "26" enorme azul oscuro — igual que Panini real */}
            <div className="p26v2-26">26</div>

            {/* Foto encima del 26 */}
            <div className="p26v2-foto-container">
              {tieneFoto
                ? <img src={jugador.foto_url} alt={jugador.nombre} className="p26v2-foto" crossOrigin="anonymous" />
                : <div className="p26v2-avatar">{iniciales}</div>
              }
            </div>

            {/* Columna derecha: FIFA + bandera */}
            <div className="p26v2-right-col">
              <div className="p26v2-fifa">
                <span className="p26v2-fifa-txt">FIFA</span>
                <span className="p26v2-copa">🏆</span>
              </div>
              <div className="p26v2-bandera-circle">{paleta.bandera}</div>
            </div>

            {/* Número figurita arriba izq */}
            <div className="p26v2-numfig">{numFig}</div>

            {/* Logo LPS */}
            <img src="/logo.png" alt="LPS" className="p26v2-lps" crossOrigin="anonymous" />

          </div>

          {/* ===== ZONA DATOS ===== */}
          <div className="p26v2-bottom">
            {/* Píldora nombre */}
            <div className="p26v2-nombre-pill">
              <span className="p26v2-primer">{primerNombre} </span>
              <span className="p26v2-apellido">{apellido}</span>
            </div>

            {/* Datos */}
            <div className="p26v2-datos-pill">
              {jugador.fecha_nac && <span>{jugador.fecha_nac}</span>}
              {jugador.estatura && <><span className="p26v2-dot">|</span><span>{jugador.estatura}</span></>}
              {jugador.peso && <><span className="p26v2-dot">|</span><span>{jugador.peso}</span></>}
              {!jugador.fecha_nac && !jugador.estatura && <span>{puntos} pts</span>}
            </div>

            {/* Club + logo */}
            <div className="p26v2-club-row">
              <div className="p26v2-club-pill">
                {(jugador.club || jugador.empresa).toUpperCase()}
              </div>
              <img src="/logo.png" alt="LPS" className="p26v2-panini-badge" crossOrigin="anonymous" />
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
