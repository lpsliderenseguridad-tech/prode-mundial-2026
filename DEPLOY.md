# 🏆 Prode Mundial 2026 — Guía de deploy

## PASO 1 — Supabase (2 minutos)

1. Entrá a https://supabase.com/dashboard/project/gesujigrxpqvyuquitmz
2. Ir a **SQL Editor**
3. Pegar todo el contenido de `supabase_setup.sql` y ejecutarlo
4. Verificar que se crearon las tablas:
   - prode_jugadores
   - prode_pronosticos
   - prode_resultados
5. Copiar tu **anon key** desde Settings > API

---

## PASO 2 — GitHub (2 minutos)

1. Ir a https://github.com/lpsliderenseguridad-tech
2. Crear nuevo repo: `prode-mundial-2026` (público o privado)
3. Subir todos los archivos de esta carpeta

```bash
git init
git add .
git commit -m "Prode Mundial 2026 - inicial"
git remote add origin https://github.com/lpsliderenseguridad-tech/prode-mundial-2026.git
git push -u origin main
```

---

## PASO 3 — Vercel (2 minutos)

1. Ir a https://vercel.com
2. **Add New Project** → importar `prode-mundial-2026`
3. En **Environment Variables** agregar:

| Variable | Valor |
|----------|-------|
| VITE_SUPABASE_URL | https://gesujigrxpqvyuquitmz.supabase.co |
| VITE_SUPABASE_ANON_KEY | (tu anon key de Supabase) |
| VITE_ADMIN_PASS | (elegí una contraseña para vos) |

4. Click en **Deploy**
5. Listo — queda en `prode-mundial-2026.vercel.app`

---

## PASO 4 — Dominio propio (opcional)

En Vercel > Settings > Domains podés agregar:
`prode.lpsseguridad.com.ar`

---

## Cómo compartirlo con clientes

Mandar por WhatsApp:
```
⚽ ¡Prode del Mundial 2026!
Entrá, cargá tus pronósticos y competí con tu equipo 🏆
👉 https://prode.lpsseguridad.com.ar
```

---

## Panel admin

- Entrás con la contraseña que configuraste en VITE_ADMIN_PASS
- Cargás los resultados reales de cada partido
- El ranking se actualiza solo para todos

---

## Cómo funciona el puntaje

| Resultado | Puntos |
|-----------|--------|
| Marcador exacto | 3 pts |
| Ganador correcto | 1 pt |
| Error | 0 pts |

**Ranking empresas** → gana la empresa cuyo MEJOR jugador individual tiene más puntos.
