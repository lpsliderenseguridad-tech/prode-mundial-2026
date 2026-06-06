import { useState, useRef } from "react"

export default function Login({ onLogin, loading }) {
  const [nombre, setNombre] = useState("")
  const [empresa, setEmpresa] = useState("")
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
    onLogin(nombre.trim(), empresa.trim(), foto)
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/logo.png" alt="LPS Seguridad" className="login-logo" />
        <h1 className="login-title">Prode Mundial 2026</h1>
        <p className="login-sub">Ingresá para cargar tus pronósticos</p>

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

        <div className="field">
          <label>Tu nombre</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez" onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        <div className="field">
          <label>Tu empresa</label>
          <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)}
            placeholder="Ej: Mi Empresa SA" onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : "¡Entrar al Prode! ⚽"}
        </button>
      </div>
    </div>
  )
}
