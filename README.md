# AfriBox

AI Employees for African Business — a Supabase-powered SaaS platform by **Etaerc AI Agency** that deploys autonomous AI agents (ChatBot, SalesBot, Voice AI, Workflow Automation) for South African SMEs.

## Tech Stack

- React (Vite) + TypeScript + TailwindCSS
- Supabase (Postgres, Auth, Realtime) — free tier, no card required
- Anthropic Claude API (`claude-sonnet-4-6`) for agent conversations
- Recharts for analytics
- GitHub Pages for hosting (free, static)

## Getting Started

```bash
npm install
cp .env.example .env
# fill in .env with your Supabase project + Anthropic API key
npm run dev
```

## Environment Variables

See `.env.example`. The Supabase project (`afribox`, org `cpa360sa`) is already created — see `.env` for its URL and anon key. You'll additionally need an Anthropic API key.

> The ChatBot agent calls the Anthropic API directly from the browser using `VITE_ANTHROPIC_API_KEY`, which exposes the key in the client bundle. This is fine for a demo build — for real production traffic, proxy `src/lib/anthropic.ts` through a Supabase Edge Function so the key never ships to the browser.

## Project Structure

```
src/
  components/   layout, ui, agents, dashboard, onboarding, landing
  pages/        public (marketing/auth), app (client dashboard), admin
  hooks/        useAuth, useBusiness, useAgents, useConversations, useLeads
  lib/          supabase.ts, anthropic.ts, mappers.ts, utils.ts
  context/      AuthContext, BusinessContext
  types/        shared TypeScript interfaces (camelCase app models)
  constants/    plans, agent templates, industries
```

Postgres tables are snake_case (`business_id`, `created_at`, …); `src/lib/mappers.ts` converts rows to/from the camelCase TS models used everywhere else in the app.

## Deploying to GitHub Pages

1. Create a new **public** GitHub repo (e.g. `afribox`) under your account.
2. In the repo, go to **Settings → Secrets and variables → Actions** and add these repository secrets (values are in your local `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ANTHROPIC_API_KEY`
   - `VITE_VAPI_API_KEY` (optional, can be blank)
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push this repo to `main`:
   ```bash
   git init
   git add .
   git commit -m "Initial AfriBox build"
   git branch -M main
   git remote add origin https://github.com/<your-username>/afribox.git
   git push -u origin main
   ```
5. The included `.github/workflows/deploy.yml` builds and publishes to `https://<your-username>.github.io/afribox/` automatically on every push to `main`.
6. In the **Supabase Dashboard → Authentication → URL Configuration**, set the **Site URL** to your GitHub Pages URL and add it to **Redirect URLs** — this is required for email confirmation links and Google OAuth to redirect back correctly.

If your repo name isn't `afribox`, update the `base` path in `vite.config.ts` to match.

## Admin Access

Set a user's `role` to `admin` in the `profiles` table (Supabase Dashboard → Table Editor, or SQL) to unlock `/admin`.

---

© 2025 AfriBox by Etaerc AI Agency. Pretoria, South Africa.
