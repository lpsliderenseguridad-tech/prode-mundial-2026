import { useState } from "react"

export default function Login({ onLogin, loading }) {
  const [nombre, setNombre] = useState("")
  const [empresa, setEmpresa] = useState("")

  const handleSubmit = () => {
    if (!nombre.trim() || !empresa.trim()) { alert("Completá tu nombre y empresa"); return }
    onLogin(nombre.trim(), empresa.trim())
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/logo.png" alt="LPS Seguridad" className="login-logo" />
        <h1 className="login-title">Prode Mundial 2026</h1>
        <p className="login-sub">Ingresá para cargar tus pronósticos</p>
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
