# Campus Community – React Frontend

Professional React + Vite + Tailwind frontend wired to your FastAPI backend at `https://campus-community.onrender.com`.

## Quickstart
1. Install deps
   ```bash
   npm i
   ```
2. Run
   ```bash
   npm run dev
   ```
3. Configure API
   Create `.env` with:
   ```
   VITE_API_BASE=https://campus-community.onrender.com
   ```

## Auth
- POST `/auth/register` { name, email, password, role, branch, year }
- POST `/auth/verify` { email, code }
- POST `/auth/login` { email, password } → stores JWT, then GET `/auth/me`

## Sections
Events, Forum, Projects, Clubs, Marketplace, Lost & Found, Alumni, Hackathons, Notices.
Each page lists items (GET) and provides a Create form (POST) mapped to common router prefixes.

If your backend uses slightly different field names, edit files under `src/pages/*` and the `src/services/*` layer.

## Build
```bash
npm run build
npm run preview
```
