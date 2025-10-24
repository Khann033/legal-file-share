Legal File Share — Starter
==========================

This archive contains a minimal starter project for a **legal** file-sharing site:
- Frontend: Vite + React (Tailwind + Framer Motion used in the App)
- Backend: Node + Express using multer for local-disk uploads (prototype only)

IMPORTANT: This project is intended for *legal* content only (indie demos, patches, open-source distributions, mod files you own rights to). Do NOT use for copyrighted/pirated material.

Quick start (development)
-------------------------
1) Frontend
   cd frontend
   npm install
   npm run dev

2) Backend
   cd backend
   npm install
   node server.js

By default the frontend expects the backend under the same host at /api/*.
If running backend on http://localhost:4000, either:
- run the frontend with a proxy (configure vite.config.js), OR
- in the browser use full URLs (edit App.jsx fetch calls to 'http://localhost:4000/api/...').

Production notes
----------------
- For large files use direct-to-cloud uploads (S3 presigned URLs).
- Add real authentication (JWT + HttpOnly refresh tokens).
- Add virus scanning (ClamAV), content moderation, rate limiting, logging.
