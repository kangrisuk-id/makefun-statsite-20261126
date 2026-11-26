// charts.js — the site's charts, drawn as inline SVG by these functions.
// No chart library: each function takes plain numbers and returns an SVG
// string with labelled axes, so a chart reads the same in a browser, in a
// screenshot and in print. Colours come from style.css variables via
// currentColor-style classes defined here as constants matching the palette.

const INK = '#20303c';
const FAINT = '#7a8a94';
const GRID = '#dde3e0';
const RED = '#b3232a';
const TEAL = '#0f766e';
const GOLD = '#b98a1c';
const BLUE = '#2563eb';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// A line (or area) chart over the shared YEARS axis. `format` turns a raw
// value into its axis/end label. Options: { color, unit, minZero }.
export function lineChart(years, values, format, options = {}) {
  const w = 640, h = 300, padL = 58, padR = 64, padT = 14, padB = 30;
  const color = options.color ?? RED;
  const min = options.minZero ? 0 : Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = options.minZero ? 0 : min - span * 0.08;
  const hi = max + span * 0.08;
  const x = (i) => padL + (i / (years.length - 1)) * (w - padL - padR);
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(lo).toFixed(1)} ${pts} ${x(values.length - 1).toFixed(1)},${y(lo).toFixed(1)}`;
  const ticks = [lo, lo + (hi - lo) / 2, hi];
  const grid = ticks.map((t) => `
    <line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>
    <text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${esc(format(t))}</text>`).join('');
  const yearLabels = years.map((yr, i) => (i % 3 === 0 || i === years.length - 1)
    ? `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${FAINT}">${yr}</text>` : '').join('');
  const last = values[values.length - 1];
  const first = values[0];
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart">
    ${grid}
    <polygon points="${area}" fill="${color}" opacity="0.10"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="${x(0)}" cy="${y(first)}" r="3.5" fill="${color}"/>
    <circle cx="${x(values.length - 1)}" cy="${y(last)}" r="4" fill="${color}"/>
    <text x="${x(values.length - 1) + 9}" y="${y(last) + 4}" font-size="13" font-weight="700" fill="${INK}">${esc(format(last))}</text>
    ${yearLabels}
  </svg>`;
}

// Vertical bars for one value per year (used for GDP).
export function barChart(years, values, format, options = {}) {
  const w = 640, h = 300, padL = 58, padR = 16, padT = 14, padB = 30;
  const color = options.color ?? TEAL;
  const max = Math.max(...values) * 1.08;
  const bw = (w - padL - padR) / values.length;
  const bars = values.map((v, i) => {
    const bh = (v / max) * (h - padT - padB);
    return `<rect x="${(padL + i * bw + 2).toFixed(1)}" y="${(h - padB - bh).toFixed(1)}" width="${(bw - 4).toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" rx="2"/>`;
  }).join('');
  const yearLabels = years.map((yr, i) => (i % 3 === 0 || i === years.length - 1)
    ? `<text x="${padL + i * bw + bw / 2}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${FAINT}">${yr}</text>` : '').join('');
  const last = values[values.length - 1];
  const ly = h - padB - (last / max) * (h - padT - padB);
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart">
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${h - padB}" stroke="${GRID}"/>
    <line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="${GRID}"/>
    <text x="${padL - 8}" y="${padT + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${esc(format(max / 1.08))}</text>
    ${bars}
    <text x="${padL + (values.length - 1) * bw + bw / 2}" y="${ly - 7}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${esc(format(last))}</text>
    ${yearLabels}
  </svg>`;
}

// Two bar series side by side per year (exports vs imports).
export function groupedBars(years, a, b, format, options = {}) {
  const w = 640, h = 300, padL = 58, padR = 16, padT = 22, padB = 30;
  const max = Math.max(...a, ...b) * 1.08;
  const gw = (w - padL - padR) / years.length;
  const bw = gw / 2 - 3;
  const bar = (v, cx, color) => {
    const bh = (v / max) * (h - padT - padB);
    return `<rect x="${cx.toFixed(1)}" y="${(h - padB - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" rx="2"/>`;
  };
  let body = '';
  years.forEach((yr, i) => {
    const gx = padL + i * gw;
    body += bar(a[i], gx + 1, TEAL) + bar(b[i], gx + 2 + bw, GOLD);
    if (i % 3 === 0 || i === years.length - 1) {
      body += `<text x="${gx + gw / 2}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${FAINT}">${yr}</text>`;
    }
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart">
    <rect x="${padL}" y="2" width="10" height="10" fill="${TEAL}"/><text x="${padL + 15}" y="11" font-size="11" fill="${INK}">${esc(options.aLabel ?? 'A')}</text>
    <rect x="${padL + 92}" y="2" width="10" height="10" fill="${GOLD}"/><text x="${padL + 107}" y="11" font-size="11" fill="${INK}">${esc(options.bLabel ?? 'B')}</text>
    <text x="${padL - 8}" y="${padT + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${esc(format(max / 1.08))}</text>
    ${body}
  </svg>`;
}

// Horizontal bars for ranked categories (provinces, sectors).
export function hbarChart(items, format, options = {}) {
  const rowH = 30, w = 640, padL = options.labelWidth ?? 150, padR = 74;
  const h = items.length * rowH + 8;
  const max = Math.max(...items.map((d) => d.value));
  const color = options.color ?? BLUE;
  const rows = items.map((d, i) => {
    const y0 = i * rowH + 6;
    const bw = ((w - padL - padR) * d.value) / max;
    return `<text x="${padL - 10}" y="${y0 + 15}" text-anchor="end" font-size="12.5" fill="${INK}">${esc(d.label)}</text>
    <rect x="${padL}" y="${y0 + 3}" width="${bw.toFixed(1)}" height="17" fill="${color}" rx="3"/>
    <text x="${padL + bw + 8}" y="${y0 + 16}" font-size="12.5" font-weight="700" fill="${INK}">${esc(format(d.value))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart">${rows}</svg>`;
}

// A donut of shares that sum to ~100, with a legend baked in as text rows.
export function donutChart(parts, options = {}) {
  const colors = options.colors ?? [TEAL, GOLD, RED, BLUE];
  const size = 220, cx = size / 2, cy = size / 2, r = 84, thick = 34;
  let angle = -Math.PI / 2;
  const arcs = parts.map((p, i) => {
    const sweep = (p.share / 100) * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const ri = r - thick;
    const x2 = cx + ri * Math.cos(a1), y2 = cy + ri * Math.sin(a1);
    const x3 = cx + ri * Math.cos(a0), y3 = cy + ri * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${ri} ${ri} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
  }).join('');
  const legend = parts.map((p, i) => `
    <div class="legend-row"><span class="swatch" style="background:${colors[i % colors.length]}"></span>
    <span class="legend-label">${esc(p.label)}</span><strong>${p.share.toFixed(1)}%</strong></div>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" class="donut">${arcs}
    <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(options.centerTop ?? '')}</text>
    <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${FAINT}">${esc(options.centerBottom ?? '')}</text></svg>
    <div class="legend">${legend}</div></div>`;
}
