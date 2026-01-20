# Administrador de Productos (React + TS)

Proyecto CRUD de productos con filtros (categoría, rango de precio, búsqueda por nombre), paginación y testing (unit + e2e).

## Stack
- Frontend: React + TypeScript + Vite + Tailwind + shadcn/ui
- Estado global: Context + Reducer
- Backend: API
- Tests unitarios: Vitest + React Testing Library
- Tests E2E: Playwright

---

## Requisitos
- Node.js (recomendado LTS)
- npm

---

## Variables de entorno

### Backend
- `DATABASE_URL` ='postgresql://neondb_owner:npg_tcwPs8SQa3TL@ep-icy-frog-ahqsgg02.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
### Frontend
- `VITE_API_URL` = 

---

## Instalación y ejecución (Frontend)
```bash
npm install
npm run dev
