export default function Login({ onLogin, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const nombre = e.target.nombre.value.trim()
    const empresa = e.target.empresa.value.trim()
    if (!nombre || !empresa) return
    onLogin(nombre, empresa)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">⚽</div>
        <h1 className="login-title">Prode Mundial 2026</h1>
        <p className="login-sub">Un regalo de <strong>LPS Seguridad</strong> para vos 🎁</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>Tu nombre</label>
            <input name="nombre" type="text" placeholder="Ej: Juan Pérez" required autoFocus />
          </div>
          <div className="field">
            <label>Empresa</label>
            <input name="empresa" type="text" placeholder="Ej: Ferretería El Tornillo" required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Cargando..." : "Entrar a jugar →"}
          </button>
        </form>
        <p className="login-footer">
          Si ya jugaste antes, ingresá el mismo nombre y empresa para recuperar tus pronósticos.
        </p>
      </div>
    </div>
  )
}
