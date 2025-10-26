# HeartBox Full Package (Public MVP + Developer Build)

This zip contains two ready-to-deploy setups:

- **/public_mvp** – a no-build static demo (with a tiny Express server) for friends & family testing.
- **/developer_build** – full React (Vite) + Node/Express API with MongoDB.

## Quick Start (Render)

1. Push this repo to GitHub.
2. In Render, click **New → Blueprint** and point to this repo. Render will read `render.yaml`.
3. When asked for secret values, paste your MongoDB connection string for `MONGODB_URI`.
4. After deploys finish:
   - Frontend: `https://robert12172-creator.onrender.com`
   - API:      `https://robert12172-creator-api.onrender.com`

> You can also deploy services manually (New → Web Service / Static Site) using the same commands.

## Local Dev

```bash
# API
cd developer_build/server
cp .env.example .env  # add MONGODB_URI
npm install
npm run dev

# Frontend
cd ../client
cp .env.example .env  # VITE_API_URL=http://localhost:10000
npm install
npm run dev
```

## Notes
- Secrets are **not** committed. Set `MONGODB_URI` in Render.
- Public MVP can optionally send to the API by adding `?api=...` to the URL.
