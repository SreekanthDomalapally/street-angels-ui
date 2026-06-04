# YouHoo Alert UI

Next.js frontend for YouHoo Alert. Talks to the FastAPI backend at **https://api.youhooalert.com** (or a local `street-angels-api` instance) for auth, contacts, and emergencies.

## Quick start

**Terminal 1 — API** (from `street-angels-api`):

```bash
cd c:/NextSree/street-angels-api
.\.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 — UI**:

```bash
cd c:/NextSree/street-angels-ui
npm install
npm run dev
```

Open http://localhost:3000

## Connect to the API

Create `.env.local`:

```env
# Production
API_URL=https://api.youhooalert.com

# Or local FastAPI (see street-angels-api)
# API_URL=http://localhost:8000
```

Next.js proxies browser requests from `/api/*` to the API server. Session cookies (`sa_session`) stay on the UI origin, so auth works without CORS issues in the browser.

| `API_URL` | Behavior |
|-----------|----------|
| `https://api.youhooalert.com` | Production API |
| `http://localhost:8000` | Local FastAPI + Postgres |
| Unset | Built-in mock API routes in `app/api/` (in-memory, dev only) |

## Deploy on Vercel

1. Deploy **street-angels-api** as its own Vercel project (connect Neon → `DATABASE_URL`).
2. Deploy **street-angels-ui** as a separate project.
3. On the **UI** project → **Environment Variables**:

   ```env
   API_URL=https://api.youhooalert.com
   ```

4. On the **API** (`api.youhooalert.com`) → **Environment Variables**:

   ```env
   CORS_ORIGINS=https://your-ui-domain,http://localhost:3000
   DATABASE_URL=<pooled Neon URL>
   ```

5. Redeploy both projects.

## Pages

| Route | Description |
|-------|-------------|
| `/welcome` | Sign in / register / demo |
| `/home` | SOS hold button |
| `/emergency` | Active emergency |
| `/contacts` | Emergency contacts |
| `/profile` | Profile + logout |
