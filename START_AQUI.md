# START_AQUI — Guía única para lanzar (6 h/semana, presupuesto ≤ $40)

**Propósito:** lanzar una **Red de Calculadoras Nicho** 100% digital (sitio en **inglés**), con **publicación programática** (20–100 páginas/día) y **sin soporte**.
**Tus instrucciones están en español** (este archivo). **El sitio y su contenido** (páginas/JSON-LD) están en **inglés**.

## Paso 1 — Sube el proyecto (GitHub)
1. **github.com → New** → *Repository name:* `niche-calculator-network` → **Public → Create**.
2. **Add file → Upload files**.
3. Descomprime este ZIP y **arrastra todos los archivos y carpetas** (no subas el ZIP).
   Debes ver: `package.json`, `astro.config.mjs`, `src/`, `content/`, `public/`, `scripts/`, `.github/`, `data/`, `meta/`, `START_AQUI.md`, `PLAN_OPERATIVO.xlsx`.
4. **Commit changes**.

## Paso 2 — Despliega (Vercel)
1. **vercel.com → New Project → Import** tu repo.
2. Deja detectado **Astro**.
3. **Environment Variables** (puedes ponerlas ahora o después):  
   `SITE_URL=https://tudominio.com`, `VITE_CF_ANALYTICS_TOKEN` (opcional), `VITE_ADSENSE_CLIENT=ca-pub-...` (tras aprobación), `VITE_ADSENSE_SLOTHEADER` (opcional).
4. **Deploy**.

## Paso 3 — Dominio (≤ $15)
**Vercel → Settings → Domains → Add** tu dominio y sigue DNS. Espera propagación.

## Paso 4 — Automatiza (cron 01:30 UTC)
1. **Vercel → Deploy Hooks → Create Hook (Production)** → copia URL.
2. **GitHub → Settings → Secrets and variables → Actions → New repository secret**:  
   - `VERCEL_DEPLOY_HOOK_URL` (pega la URL)  
   - `SITE_URL` (`https://tudominio.com`)  
   - `MAX_PER_DAY` (empieza 50; 40–60 primeras semanas)  
   - `OPENAI_API_KEY` (opcional)
3. **GitHub → Actions → Nightly programmatic publish → Run workflow**.

## Paso 5 — Analítica y Ads
- **Cloudflare Web Analytics** → pega `VITE_CF_ANALYTICS_TOKEN` en Vercel → **Redeploy**.
- **AdSense**: solicita al tener **≥100–300** páginas útiles; tras aprobación añade `VITE_ADSENSE_CLIENT` y actualiza `/public/ads.txt` con tu `pub-...`.

## Paso 6 — Datos incluidos
- `data/calculators.json` → **150** calculadoras listas para publicar.  
- `data/content_plan.csv` → **640** ideas por clúster.  
- `scripts/generate_calcs.js` → genera **20–100** páginas/día + interlinking.

## Paso 7 — Rutina 6 h/semana
- **2 h Contenido:** agrega 150–300 filas nuevas a `data/calculators.json`.  
- **1.5 h QA/Release:** ejecuta el workflow si hace falta; valida 3 páginas nuevas.  
- **1 h SEO:** Search Console (cobertura/errores) + enlaces internos.  
- **1 h Métricas:** Cloudflare (sesiones/PV) y, con Ads, **RPM**.  
- **0.5 h Mejora:** duplica clústeres con mejor CTR/RPM.

> Mantén `MAX_PER_DAY=40–60` durante 4–8 semanas; si indexa bien, sube a **80–100**.

## Paso 8 — Un único archivo para gestionarlo todo
Abre **`PLAN_OPERATIVO.xlsx`** cada semana: **GANTT**, **CHECKLIST**, **BUDGET**, **KPI_TRACKER**, **ASSUMPTIONS**.
Compárteme el Excel actualizado para recomendaciones.

## Nombres exactos (variables/secrets)
- **Vercel:** `SITE_URL`, `VITE_CF_ANALYTICS_TOKEN`, `VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_SLOTHEADER`  
- **GitHub Actions:** `SITE_URL`, `VERCEL_DEPLOY_HOOK_URL`, `MAX_PER_DAY`, `OPENAI_API_KEY` (opcional)

## Comandos locales (opcional)
```bash
npm i --no-audit --no-fund
npm run dev
npm run generate
npm run build
npm run preview
```
