// views.js — one render function per page. Each returns the HTML for the
// page's <main>; main.js routes between them. Every figure on every page is
// followed by its source and year, in the caption of its card.

import { AGE_STRUCTURE_2024, FACTS, GDP_SECTORS_2024, PROVINCES, REGIONS, SERIES, SOURCES, YEARS } from './data.js';
import { barChart, donutChart, groupedBars, hbarChart, lineChart } from './charts.js';

const WB = 'World Bank, World Development Indicators';
const BPS = 'Statistics Indonesia (BPS)';

export function fmtInt(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const fmtMillions = (v) => `${(v / 1e6).toFixed(0)}M`;
const fmtBillions = (v) => `$${(v / 1e9).toFixed(0)}B`;
const fmtTrillions = (v) => `$${(v / 1e12).toFixed(2)}T`;
const fmtPct = (v) => `${v.toFixed(1)}%`;
const fmtYears = (v) => `${v.toFixed(1)} yrs`;

function kpi(label, value, note, source) {
  return `<div class="kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div>
    <div class="kpi-note">${note}</div><div class="kpi-source">${source}</div></div>`;
}

function chartCard(title, svg, caption) {
  return `<section class="card chart-card"><h3>${title}</h3>${svg}<p class="caption">${caption}</p></section>`;
}

function factCard(title, body) {
  return `<section class="card"><h3>${title}</h3><p>${body}</p></section>`;
}

export function overviewView() {
  const pop = SERIES.population[14];
  const gdp = SERIES.gdpUsd[14];
  const kpis = [
    kpi('Population', '283.5 million', '4th most populous country in the world', `${WB}, 2024`),
    kpi('GDP', fmtTrillions(gdp), 'Largest economy in Southeast Asia', `${WB}, 2024`),
    kpi('GDP per capita', '$4,925', 'Up from $3,066 in 2010', `${WB}, 2024`),
    kpi('Economic growth', '5.0%', 'Real GDP growth, 2024', `${WB}, 2024`),
    kpi('Poverty rate', '9.0%', 'Share below the national poverty line', `${WB}, 2024`),
    kpi('Life expectancy', '71.3 years', 'At birth, up from 68.4 in 2010', `${WB}, 2024`),
    kpi('Urban population', '58.8%', 'Of the total population', `${WB}, 2024`),
    kpi('Internet users', '72.8%', 'Of the population, up from 10.9% in 2010', `${WB}, 2024`),
  ].join('');
  const top10 = [...PROVINCES].sort((a, b) => b.pop2025 - a.pop2025).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop2025 }));
  return `
  <section class="hero">
    <p class="hero-kicker">The Republic of Indonesia, by the numbers</p>
    <h2>One archipelago, 283.5 million people, one page of answers.</h2>
    <p class="hero-sub">Indonesia in Numbers gathers the statistics people actually look up —
    population, the economy, health, work and all ${FACTS.provinces} provinces — with the source and
    year printed beside every figure. Start with the headlines, then explore
    <a href="#/population">Population</a>, <a href="#/economy">Economy</a>,
    <a href="#/society">Society</a> and <a href="#/provinces">Provinces</a>.</p>
  </section>
  <section class="kpi-grid">${kpis}</section>
  <div class="grid-2">
    ${chartCard('Population, 2010-2024', lineChart(YEARS, SERIES.population, fmtMillions, { color: '#b3232a' }),
      `Total population each year. ${WB} (SP.POP.TOTL), retrieved November 2026. The 2020 census counted ${fmtInt(FACTS.censusPopulation2020)} people (${BPS}).`)}
    ${chartCard('GDP, 2010-2024', barChart(YEARS, SERIES.gdpUsd, fmtTrillions, { color: '#0f766e' }),
      `Gross domestic product in current US dollars. ${WB} (NY.GDP.MKTP.CD). The 2020 dip and the 2022 jump are the pandemic and the commodity-price rebound.`)}
  </div>
  <div class="grid-2">
    ${chartCard('The ten most populous provinces', hbarChart(top10, fmtMillions, { color: '#2563eb', labelWidth: 118 }),
      `Mid-2025 estimates, ${BPS}. The three Javanese provinces at the top hold 46% of the nation between them. Full table on the Provinces page.`)}
    ${factCard('The country in one paragraph', `Indonesia is a republic of ${FACTS.provinces} provinces and
      ${FACTS.regenciesAndCities} regencies and cities spread over ${FACTS.islandsNamed} named islands and
      ${fmtInt(FACTS.landAreaKm2)} km&sup2; of land. Its capital and largest city is ${FACTS.capitalCity}
      (${fmtInt(FACTS.largestCityPopulation.value)} people in the province, ${FACTS.largestCityPopulation.when},
      ${FACTS.largestCityPopulation.source}). About half the country is forest — 50.7% of land area in 2024 (${WB}).`)}
  </div>`;
}

export function populationView() {
  return `
  <section class="page-head"><h2>Population</h2>
  <p>283,487,931 people in 2024 (${WB}), growing by roughly 2.3 million a year. The 2020 census,
  the count everything is benchmarked against, recorded ${fmtInt(FACTS.censusPopulation2020)} people (${BPS}).</p></section>
  <div class="grid-2">
    ${chartCard('Population growth, 2010-2024', lineChart(YEARS, SERIES.population, fmtMillions, { color: '#b3232a' }),
      `Total population. ${WB} (SP.POP.TOTL). Growth has slowed from about 1.4% a year in 2010 to about 0.8% in 2024.`)}
    ${chartCard('A young country, slowly ageing', donutChart(AGE_STRUCTURE_2024, { centerTop: '2024', centerBottom: 'age shares' }),
      `Age structure, 2024. ${WB} (SP.POP.0014.TO.ZS, SP.POP.1564.TO.ZS, SP.POP.65UP.TO.ZS). In 2010 the 65+ share was 5.9%; the working-age share peaked as a share of the whole in the 2020s — the demographic bonus.`)}
  </div>
  <div class="grid-2">
    ${chartCard('Moving to the cities', lineChart(YEARS, SERIES.urbanShare, fmtPct, { color: '#0f766e', minZero: false }),
      `Urban population as a share of the total. ${WB} (SP.URB.TOTL.IN.ZS). Indonesia became majority-urban around 2011; Jakarta province packs 16,155 people into each km&sup2; while South Papua has 5 (${BPS}, mid-2025).`)}
    ${factCard('Where everyone lives', `Java is the engine room: West Java (50.8 million), East Java (42.1 million)
      and Central Java (38.2 million) are the three largest provinces, and the island holds about 56% of all
      Indonesians on 7% of the land. The least populous province is South Papua, 549,700 people across
      117,859 km&sup2;. Every province, its capital and its density are in the
      <a href="#/provinces">Provinces table</a> (${BPS}, mid-2025 estimates).`)}
  </div>`;
}

export function economyView() {
  return `
  <section class="page-head"><h2>Economy</h2>
  <p>A $1.40 trillion economy (${WB}, 2024) that has grown at about 5% a year for a decade, with one
  pandemic interruption. Inflation, the spike-and-fall story of the 2010s, ended 2024 at 2.2% on average.</p></section>
  <div class="grid-2">
    ${chartCard('Real GDP growth, 2010-2024', lineChart(YEARS, SERIES.gdpGrowth, fmtPct, { color: '#b3232a' }),
      `Annual growth of real GDP. ${WB} (NY.GDP.MKTP.KD.ZG). 2020's -2.1% is the pandemic contraction — the only negative year in the series; growth returned to 5.0% by 2024.`)}
    ${chartCard('What the economy is made of', donutChart(GDP_SECTORS_2024, { centerTop: '2024', centerBottom: 'share of GDP' }),
      `Value added by sector as a share of GDP, 2024. ${WB} (NV.SRV / NV.IND / NV.AGR.TOTL.ZS). The shares sum to 95.7%; the rest of GDP is taxes less subsidies on products.`)}
  </div>
  <div class="grid-2">
    ${chartCard('Consumer price inflation, 2010-2024', lineChart(YEARS, SERIES.inflation, fmtPct, { color: '#b98a1c' }),
      `Annual average consumer price inflation. ${WB} (FP.CPI.TOTL.ZG). The 2013-2015 bulge followed fuel-subsidy cuts; the 2022 rise to 4.2% was the global price shock, unwound by 2024 (2.2%).`)}
    ${chartCard('Merchandise trade, 2010-2024', groupedBars(YEARS, SERIES.exportsUsd, SERIES.importsUsd, fmtBillions, { aLabel: 'Exports', bLabel: 'Imports' }),
      `Merchandise exports and imports, current US$. ${WB} (TX.VAL / TM.VAL.MRCH.CD.WT). Indonesia ran a goods surplus in 2024: $264.7 billion out, $233.7 billion in.`)}
  </div>
  <div class="grid-2">
    ${chartCard('GDP per capita, 2010-2024', lineChart(YEARS, SERIES.gdpPerCapitaUsd, (v) => `$${fmtInt(v)}`, { color: '#0f766e' }),
      `GDP per person in current US dollars. ${WB} (NY.GDP.PCAP.CD). The mid-2010s slide is the rupiah, not output: real growth stayed near 5% while the currency weakened.`)}
    ${factCard('Work, in two honest numbers', `Unemployment depends on who counts. The ILO's modelled rate for
      Indonesia is 3.3% of the labour force in 2024 (${WB}, SL.UEM.TOTL.ZS). The national statistics office's own
      open unemployment rate — the figure Indonesian policy is argued over — was
      ${FACTS.openUnemploymentBps.value}% in ${FACTS.openUnemploymentBps.when} (${FACTS.openUnemploymentBps.source}).
      Both are shown because they answer different questions: international comparison, and the domestic debate.`)}
  </div>`;
}

export function societyView() {
  return `
  <section class="page-head"><h2>Society</h2>
  <p>Longer lives, fewer people in poverty, and a country that came online in a single decade:
  internet use rose from 10.9% of the population in 2010 to 72.8% in 2024.</p></section>
  <div class="grid-2">
    ${chartCard('Poverty, 2010-2024', lineChart(YEARS, SERIES.poverty, fmtPct, { color: '#b3232a' }),
      `Share of the population below the national poverty line. ${WB} (SI.POV.NAHC). The pandemic pushed the rate back up to 10.1% in 2021; by 2024 it reached 9.0%, and BPS measured 8.47% in March 2025 on its own line.`)}
    ${chartCard('Life expectancy, 2010-2024', lineChart(YEARS, SERIES.lifeExpectancy, fmtYears, { color: '#0f766e' }),
      `Life expectancy at birth. ${WB} (SP.DYN.LE00.IN). The 2020-2021 dip to 67.5 years is the pandemic's mortality, visible in the UN estimates the Bank republishes; the series recovers to 71.3 by 2024.`)}
  </div>
  <div class="grid-2">
    ${chartCard('The country comes online', lineChart(YEARS, SERIES.internetUsers, fmtPct, { color: '#2563eb', minZero: true }),
      `Individuals using the internet as a share of the population. ${WB} (IT.NET.USER.ZS). Seven in ten Indonesians were online by 2024.`)}
    ${factCard('Schooling, health and development', `Adult literacy reached ${FACTS.adultLiteracy.value}% in
      ${FACTS.adultLiteracy.when} (${FACTS.adultLiteracy.source}). The national statistics office's own Human
      Development Index — health, schooling and living standards on a 0-100 scale — stood at
      ${FACTS.humanDevelopmentBps.value} in ${FACTS.humanDevelopmentBps.when} (${FACTS.humanDevelopmentBps.source}),
      in the "high" band. Forests still cover 50.7% of the land (2024, ${WB}).`)}
  </div>`;
}

// --- Provinces page: a working table with search, region filter and sorting.

const provinceState = { query: '', region: 'All regions', sortKey: 'pop2025', sortDir: -1 };

function provinceRows() {
  const q = provinceState.query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) =>
    (provinceState.region === 'All regions' || p.region === provinceState.region) &&
    (q === '' || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
  const key = provinceState.sortKey;
  rows = [...rows].sort((a, b) => {
    const va = a[key], vb = b[key];
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
    return cmp * provinceState.sortDir;
  });
  return rows;
}

function provinceTableHtml() {
  const rows = provinceRows();
  const arrow = (key) => provinceState.sortKey === key ? (provinceState.sortDir === 1 ? ' ▲' : ' ▼') : '';
  const head = [
    ['name', 'Province'], ['capital', 'Capital'], ['region', 'Region'],
    ['areaKm2', 'Land area (km²)'], ['pop2025', 'Population, mid-2025'], ['density', 'People per km²'],
  ].map(([key, label]) => `<th><button class="th-sort" data-sort="${key}">${label}${arrow(key)}</button></th>`).join('');
  const body = rows.map((p) => `<tr><td><strong>${p.name}</strong></td><td>${p.capital}</td><td>${p.region}</td>
    <td class="num">${fmtInt(p.areaKm2)}</td><td class="num">${fmtInt(p.pop2025)}</td><td class="num">${fmtInt(p.density)}</td></tr>`).join('');
  const total = rows.reduce((s, p) => s + p.pop2025, 0);
  return `<table class="prov-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
    <p class="caption">Showing ${rows.length} of ${PROVINCES.length} provinces; the rows shown sum to
    ${fmtInt(total)} people. Source: ${BPS} mid-2025 estimates; density is population divided by land area.</p>`;
}

export function provincesView() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop2025 - a.pop2025).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop2025 }));
  const regionButtons = REGIONS.map((r) =>
    `<button class="chip${r === provinceState.region ? ' chip-on' : ''}" data-region="${r}">${r}</button>`).join('');
  return `
  <section class="page-head"><h2>Provinces</h2>
  <p>All ${FACTS.provinces} provinces of Indonesia with their capitals, land areas and mid-2025 populations.
  Search the table, filter it by island region, or click a column heading to sort it — every control works.</p></section>
  ${chartCard('The ten most populous provinces', hbarChart(top10, fmtMillions, { color: '#2563eb', labelWidth: 118 }),
    `Mid-2025 estimates, ${BPS}. West Java alone holds more people than the 20 least populous provinces combined.`)}
  <section class="card">
    <div class="controls">
      <label class="search-label">Search <input id="prov-search" type="search" placeholder="Province or capital…" value="${provinceState.query}"></label>
      <div class="chips" id="prov-regions">${regionButtons}</div>
    </div>
    <div id="prov-table-wrap">${provinceTableHtml()}</div>
  </section>`;
}

// Called by main.js after the provinces page is on screen.
export function wireProvinces() {
  const wrap = document.getElementById('prov-table-wrap');
  if (!wrap) return;
  const rerender = () => { wrap.innerHTML = provinceTableHtml(); };
  const search = document.getElementById('prov-search');
  search.addEventListener('input', () => { provinceState.query = search.value; rerender(); });
  document.getElementById('prov-regions').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-region]');
    if (!btn) return;
    provinceState.region = btn.dataset.region;
    document.querySelectorAll('#prov-regions .chip').forEach((c) =>
      c.classList.toggle('chip-on', c.dataset.region === provinceState.region));
    rerender();
  });
  wrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-sort]');
    if (!btn) return;
    const key = btn.dataset.sort;
    if (provinceState.sortKey === key) provinceState.sortDir *= -1;
    else { provinceState.sortKey = key; provinceState.sortDir = key === 'name' || key === 'capital' || key === 'region' ? 1 : -1; }
    rerender();
  });
}

export function sourcesView() {
  const items = SOURCES.map((s) => `<section class="card"><h3>${s.name}</h3><p>${s.detail}</p></section>`).join('');
  return `
  <section class="page-head"><h2>Sources &amp; method</h2>
  <p>Every figure on this site can be traced. National series are the World Bank's World Development
  Indicators for Indonesia, retrieved on 26 November 2026; the indicator code for each series is written
  beside it in <code>data.js</code>, the file that holds all of the site's numbers, so any figure can be
  re-queried at api.worldbank.org and checked. Provincial figures are Statistics Indonesia (BPS) mid-2025
  estimates. Where two official measures exist — unemployment is the honest example — both are shown with
  their owners named. Figures are rounded for display; the underlying values in <code>data.js</code> are not.</p></section>
  ${items}
  <section class="card"><h3>About this site</h3><p>Indonesia in Numbers is an independent one-person
  statistics annual, built as static files: no server, no tracking, nothing loaded from anywhere else.
  It is not affiliated with BPS or the World Bank; it republishes their figures with credit, and any
  error in transcription is the site's own.</p></section>`;
}
