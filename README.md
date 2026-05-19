# COOTRAVIR — Frontend (Next.js)

Interfaz para login, dashboard, editor GrapesJS, editor de mapa y visor público de propuestas.

Proyecto **separado** del backend: se comunica solo por HTTP con `cootravir-backend`.

## Requisitos

- Node.js 20+
- API NestJS en ejecución (`cootravir-backend`)

## Instalación

```powershell
copy .env.example .env.local
npm install
npm run dev
```

Si aparece `Cannot find module './611.js'` o error 500 en rutas:

```powershell
# Detenga npm run dev (Ctrl+C), luego:
npm run dev:clean
```

No mezcle `npm run build` con `npm run dev` al mismo tiempo; use solo uno.

Abra http://localhost:3000

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL pública de la API (navegador) |
| `API_URL` | URL de la API en el servidor Next (rutas `/api/auth/*`) |

Ejemplo local:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Inicio de sesión |
| `/dashboard` | Listado y acciones |
| `/propuestas/nueva` | Crear desde plantilla |
| `/propuestas/[id]/editar` | Editor GrapesJS |
| `/propuestas/[id]/mapa` | Configuración del mapa |
| `/p/[slug]` | Presentación pública (solo publicadas) |

## Assets legacy

Los estilos y datos del mapa están en `public/legacy/`. Las diapositivas se sirven desde la API; las rutas en el HTML apuntan a `/legacy/...`.

## Despliegue (Vercel)

1. Conecte este repositorio/carpeta a Vercel.
2. Configure `NEXT_PUBLIC_API_URL` y `API_URL` con la URL de producción del backend.
3. En el backend, `CORS_ORIGIN` debe coincidir con el dominio de Vercel.

```powershell
npm run build
```
# sites
