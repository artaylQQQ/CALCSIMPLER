// scripts/generate_calcs.js
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_JSON = path.join(ROOT, 'data', 'calculators.json');
const OUT_DIR   = path.join(ROOT, 'src', 'pages', 'calculators'); // <-- public pages
const META_DIR  = path.join(ROOT, 'meta');
const LOG       = path.join(META_DIR, 'publish_log.json');

const MAX_PER_DAY = Math.max(20, Math.min(100, Number(process.env.MAX_PER_DAY || 50)));
const TODAY = new Date().toISOString().slice(0,10); // UTC

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(META_DIR)) fs.mkdirSync(META_DIR, { recursive: true });

function loadData() {
  if (!fs.existsSync(DATA_JSON)) {
    console.error('No data file. Put calculators in data/calculators.json');
    return [];
  }
  return JSON.parse(fs.readFileSync(DATA_JSON, 'utf-8'));
}

function loadLog(){
  try { return JSON.parse(fs.readFileSync(LOG, 'utf-8')); } catch { return { published: {} }; }
}
function saveLog(log){ fs.writeFileSync(LOG, JSON.stringify(log, null, 2)); }

function pickRelated(current, all, n=8){
  const same = all.filter(x => x.cluster && x.cluster === current.cluster && x.slug !== current.slug);
  const published = same.filter(x => x.__published);
  const pool = (published.length >= n ? published : same);
  const seen = new Set();
  const out = [];
  for (const c of pool) {
    if (out.length >= n) break;
    if (!seen.has(c.slug)) { out.push(c.slug); seen.add(c.slug); }
  }
  return out.slice(0, n);
}

function mdxTemplate(item, today){
  const fm = `---\n`+
  `title: "${(item.title||'Calculator').replace(/"/g,'\\"')}"\n`+
  `description: "${(item.intro||'Online calculator.').replace(/"/g,'\\"')}"\n`+
  `slug: "${item.slug}"\n`+
  `cluster: "${item.cluster||''}"\n`+
  `datePublished: "${today}"\n`+
  `---`;

  const schema = JSON.stringify({
    slug: item.slug,
    title: item.title,
    locale: "en",
    inputs: item.inputs || [],
    ...(item.expression ? {expression: item.expression} : {}),
    ...(item.formula_js ? {formula_js: item.formula_js} : {}),
    units: item.units || {"input":"","output":""},
    intro: item.intro || "",
    examples: item.examples || [],
    faqs: item.faqs || [],
    related: item.related || [],
    disclaimer: "Educational information, not professional advice.",
    schema_org: "FAQPage|SoftwareApplication"
  }, null, 2);

  return `${fm}

import BaseLayout from "../../layouts/BaseLayout.astro";
import Calculator from "../../components/Calculator.astro";

export const schema = ${schema};

<BaseLayout title={schema.title} description={schema.intro}>
  <Calculator schema={schema} />
</BaseLayout>
`;
}

async function main(){
  const all = loadData();
  const log = loadLog();
  const publishedLog = log.published || {};
  for (const it of all) if (publishedLog[it.slug]) it.__published = true;

  const remaining = all.filter(x => !publishedLog[x.slug]);
  const toPublish = remaining.slice(0, MAX_PER_DAY);
  if (toPublish.length === 0) { console.log('No calculators to publish today.'); return; }

  for (const item of toPublish){
    item.related = pickRelated(item, all, 8);
    const filepath = path.join(OUT_DIR, `${item.slug}.mdx`);
    fs.writeFileSync(filepath, mdxTemplate(item, TODAY));
    publishedLog[item.slug] = TODAY;
    console.log('Generated', filepath);
  }
  log.published = publishedLog;
  saveLog(log);
}
main().catch(e => { console.error(e); process.exit(1); });
