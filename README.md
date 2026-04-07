# PlenoCasa — Inmobiliaria Web

Next.js + TypeScript + Tailwind + **Supabase** (Postgres + cliente oficial)

---

## Setup en local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Supabase: tabla y RLS

1. Crea un proyecto en [Supabase](https://supabase.com).
2. **SQL Editor** → pega y ejecuta el contenido de [`supabase/migrations/20260407120000_properties.sql`](supabase/migrations/20260407120000_properties.sql).
3. **Storage** → crea un bucket llamado **`property-images`** y márcalo como **Public** (para fotos de propiedades).

### 3. Variables de entorno

```bash
cp .env.example .env
```

Rellena con **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon / public)
- `SUPABASE_SERVICE_ROLE_KEY` (service_role; solo servidor)
- `ADMIN_PASSWORD` (acceso a `/admin`)

### 4. Datos de ejemplo (opcional)

```bash
npm run db:seed
```

(Requiere Node 20+ por `node --env-file=.env`, o exporta las variables a mano.)

### 5. Desarrollo

```bash
npm run dev
```

- Web: [http://localhost:3000](http://localhost:3000)
- Admin: `/admin`

---

## Despliegue en Vercel

1. Conecta el repo en [Vercel](https://vercel.com).
2. **Environment Variables** (Production y Preview si aplica): las mismas que en `.env`.
3. Deploy: `next build` (por defecto).

No hace falta `DATABASE_URL` ni Prisma: la app usa el cliente Supabase.

---

## Stack

- Next.js 14 (App Router)
- Supabase JS (`@supabase/supabase-js`)
- Tailwind CSS
