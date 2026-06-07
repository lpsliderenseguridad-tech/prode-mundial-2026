import { useState, useRef } from "react"

export default function Login({ onLogin, loading }) {
  const [nombre, setNombre] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [fechaNac, setFechaNac] = useState("")
  const [estatura, setEstatura] = useState("")
  const [peso, setPeso] = useState("")
  const [club, setClub] = useState("")
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!nombre.trim() || !empresa.trim()) { alert("Completá tu nombre y empresa"); return }
    onLogin(nombre.trim(), empresa.trim(), foto, {
      fecha_nac: fechaNac,
      estatura: estatura,
      peso: peso,
      club: club,
    })
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/logo.png" alt="LPS Seguridad" className="login-logo" />
        <h1 className="login-title">Prode Mundial 2026</h1>
        <p className="login-sub">¡Creá tu figurita Panini y cargá tus pronósticos!</p>

        {/* Foto */}
        <div className="foto-upload-wrap" onClick={() => fileRef.current.click()}>
          {preview
            ? <img src={preview} alt="Tu foto" className="foto-preview" />
            : <div className="foto-placeholder">
                <span>📷</span>
                <span>Subí tu foto</span>
                <span className="foto-hint">Para tu figurita Panini</span>
              </div>
          }
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{display:"none"}} />
        </div>
        {preview && <p className="foto-ok" onClick={() => fileRef.current.click()}>✅ Foto cargada · Tocá para cambiar</p>}

        <div className="login-fields-grid">
          <div className="field full">
            <label>Nombre completo *</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Juan Pérez" />
          </div>
          <div className="field full">
            <label>Empresa / Club *</label>
            <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)}
              placeholder="Ej: Mi Empresa SA" />
          </div>
          <div className="field full">
            <label>Tu club de fútbol</label>
            <input type="text" value={club} onChange={e => setClub(e.target.value)}
              placeholder="Ej: Boca Juniors" />
          </div>
          <div className="field">
            <label>Fecha de nac.</label>
            <input type="text" value={fechaNac} onChange={e => setFechaNac(e.target.value)}
              placeholder="DD-MM-AAAA" maxLength={10} />
          </div>
          <div className="field">
            <label>Estatura</label>
            <input type="text" value={estatura} onChange={e => setEstatura(e.target.value)}
              placeholder="1,75 m" maxLength={6} />
          </div>
          <div className="field">
            <label>Peso</label>
            <input type="text" value={peso} onChange={e => setPeso(e.target.value)}
              placeholder="75 kg" maxLength={6} />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : "¡Entrar al Prode! ⚽"}
        </button>
      </div>
    </div>
  )
}
