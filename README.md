# Niche Calculator Network (Astro) — How to use

## Quick start
1) Upload to GitHub (public repo).
2) Import in Vercel → Deploy.
3) Set secrets: `SITE_URL`, `VERCEL_DEPLOY_HOOK_URL`, `MAX_PER_DAY`.
4) Run the workflow once (Actions) to publish the first batch.

## Local commands (optional)
```bash
npm i --no-audit --no-fund
npm run generate
npm run dev
npm run build
npm run preview
```

## Env vars
- Vercel: `SITE_URL`, `VITE_CF_ANALYTICS_TOKEN` (optional), `VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_SLOTHEADER` (optional)
- GitHub Actions: `SITE_URL`, `VERCEL_DEPLOY_HOOK_URL`, `MAX_PER_DAY`, `OPENAI_API_KEY` (optional)
