# Street Angels API Contract

This document defines the HTTP API used by `street-angels-ui`. The demo implements these routes as Next.js Route Handlers with an in-memory store. The future **`street-angels-api`** (FastAPI + PostgreSQL) repo should implement the same contract.

Base path: `/api`

Authentication: httpOnly cookie `sa_session` (session id). All protected routes return `401` with `{ "error": "Not authenticated" }` when missing or invalid.

---

## Auth

### `POST /api/auth/register`

Create account and start session.

**Body**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "string"
}
```

**Response `200`** — User object:

```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "emergencyPhrase": null
}
```

Sets `sa_session` cookie.

---

### `POST /api/auth/login`

Sign in (demo: creates user if email unknown). Sets session cookie.

**Body**

```json
{
  "email": "jane@example.com",
  "password": "string"
}
```

**Response `200`** — Same User shape as register.

---

### `POST /api/auth/logout`

Clears session.

**Response `200`**

```json
{ "ok": true }
```

---

### `GET /api/auth/me`

**Response `200`** — Current user (User shape).

**Response `401`** — Not authenticated.

---

## Users

### `PATCH /api/users/me`

Update profile for current user.

**Body**

```json
{
  "name": "Jane Doe",
  "emergencyPhrase": "Help me now"
}
```

`emergencyPhrase` may be `null` to clear.

**Response `200`** — Updated User.

---

## Contacts

### `GET /api/contacts`

**Response `200`** — Array of contacts, sorted by `priority` ascending:

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "name": "Sarah",
    "phone": "+1 555 010 0001",
    "priority": 1
  }
]
```

---

### `POST /api/contacts`

**Body**

```json
{
  "name": "Mum",
  "phone": "+1 555 010 0003",
  "priority": 3
}
```

**Response `201`** — Created contact.

---

### `PATCH /api/contacts/:id`

**Body** (partial)

```json
{
  "priority": 2,
  "name": "Sarah",
  "phone": "+1 555 010 0001"
}
```

Used for reorder (swap priorities between two contacts).

**Response `200`** — Updated contact.

---

### `DELETE /api/contacts/:id`

**Response `200`**

```json
{ "ok": true }
```

---

## Emergencies

### `POST /api/emergencies`

Start an active emergency for the current user. If one is already active, returns existing.

**Body** — `{}` (optional; demo ignores payload)

**Response `201`**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "status": "active",
  "startedAt": "2026-06-03T12:00:00.000Z",
  "lat": 51.507,
  "lng": -0.127
}
```

---

### `GET /api/emergencies/active`

**Response `200`**

```json
{
  "emergency": { "...Emergency object..." }
}
```

or

```json
{
  "emergency": null
}
```

---

### `PATCH /api/emergencies/:id`

**Body**

```json
{
  "status": "resolved"
}
```

Allowed: `resolved`, `cancelled`.

**Response `200`** — Updated emergency.

---

## Admin (future — not in demo API)

The demo admin UI uses client-only state. Phase 2 FastAPI should add:

- `GET /api/admin/emergencies`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/suspend`
- `GET /api/admin/reports`
- `PATCH /api/admin/reports/:id`

With role-based access (`admin` / `safeguarding`).

---

## Environment (production UI)

```env
# next.config.ts rewrites /api/* → this host (recommended)
API_URL=https://api.youhooalert.com
```

Local development:

```env
API_URL=http://localhost:8000
```

If `API_URL` is unset, the UI uses in-memory mock routes under `app/api/`.
