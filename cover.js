/* Generative cover art — a distinct, animated SVG per project, seeded by slug.
   On-brand for "The System": ink + signal-accent line work on a dot grid.
   window.generateCover(mountEl, slug). */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const ACCENT = "#ff4d23", INK = "#15171a", PAPER = "#eef0ec", FAINT = "#c5c9c3";
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hash = (s) => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const arc = (cx, cy, r, a0, a1) => { const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1); return `M ${x0} ${y0} A ${r} ${r} 0 ${(a1 - a0) > Math.PI ? 1 : 0} 1 ${x1} ${y1}`; };

  window.generateCover = function (mount, slug) {
    const W = 880, H = 380, seed = hash(slug || "x"), rnd = rng(seed);
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "xMidYMid slice", class: "cover-svg", role: "img", "aria-label": "Generated cover" });
    const defs = el("defs");
    const pat = el("pattern", { id: "dg-" + seed, width: 24, height: 24, patternUnits: "userSpaceOnUse" });
    pat.appendChild(el("circle", { cx: 2, cy: 2, r: 1.1, fill: FAINT }));
    defs.appendChild(pat); svg.appendChild(defs);
    svg.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: PAPER }));
    svg.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: `url(#dg-${seed})`, opacity: 0.7 }));

    const strokes = [], pops = [];
    const motif = seed % 5;

    if (motif === 0) { // concentric arcs
      const ox = W * (0.25 + rnd() * 0.5), oy = H * (0.25 + rnd() * 0.5), n = 5 + (seed % 5);
      for (let i = 0; i < n; i++) { const r = 34 + i * (24 + rnd() * 22), a0 = rnd() * 6.28, a1 = a0 + 1.8 + rnd() * 2.4; const acc = i % 3 === 0; strokes.push(svg.appendChild(el("path", { d: arc(ox, oy, r, a0, a1), fill: "none", stroke: acc ? ACCENT : INK, "stroke-width": acc ? 3 : 1.2, "stroke-linecap": "round" }))); }
    } else if (motif === 1) { // architectural blocks
      const cols = 4 + (seed % 3), rows = 3;
      for (let i = 0; i < cols * rows; i++) { const cw = (W - 80) / cols, ch = (H - 80) / rows; const x = 40 + (i % cols) * cw, y = 40 + Math.floor(i / cols) * ch; const acc = rnd() > 0.72; strokes.push(svg.appendChild(el("rect", { x: x + 4, y: y + 4, width: cw * (0.55 + rnd() * 0.4), height: ch * (0.45 + rnd() * 0.45), fill: "none", stroke: acc ? ACCENT : INK, "stroke-width": acc ? 2.6 : 1 }))); }
    } else if (motif === 2) { // node flow
      const N = 8 + (seed % 5), pts = [];
      for (let i = 0; i < N; i++) pts.push([70 + rnd() * (W - 140), 60 + rnd() * (H - 120)]);
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (d < 210) strokes.push(svg.appendChild(el("line", { x1: pts[i][0], y1: pts[i][1], x2: pts[j][0], y2: pts[j][1], stroke: INK, "stroke-width": 1, opacity: 0.45 }))); }
      pts.forEach((p, i) => { const big = i % 3 === 0; pops.push(svg.appendChild(el("circle", { cx: p[0], cy: p[1], r: big ? 7 : 4, fill: big ? ACCENT : INK }))); });
    } else if (motif === 3) { // waveform bars
      const n = 26 + (seed % 16), bw = (W - 80) / n;
      for (let i = 0; i < n; i++) { const h = 24 + rnd() * 210, acc = i % 5 === 0; pops.push(svg.appendChild(el("rect", { x: 40 + i * bw, y: H / 2 - h / 2, width: bw * 0.55, height: h, fill: acc ? ACCENT : INK, opacity: acc ? 1 : 0.82, rx: 1 }))); }
    } else { // radiating lines
      const ox = W * (0.3 + rnd() * 0.4), oy = H * (0.3 + rnd() * 0.4), n = 16 + (seed % 14);
      for (let i = 0; i < n; i++) { const a = rnd() * 6.28, len = 60 + rnd() * 250, acc = i % 4 === 0; strokes.push(svg.appendChild(el("line", { x1: ox, y1: oy, x2: ox + Math.cos(a) * len, y2: oy + Math.sin(a) * len, stroke: acc ? ACCENT : INK, "stroke-width": acc ? 2.6 : 1, "stroke-linecap": "round" }))); }
    }

    mount.appendChild(svg);

    if (reduce) return;
    // draw-in strokes, then pop the nodes/bars
    requestAnimationFrame(() => {
      strokes.forEach((p, i) => { let len = 400; try { len = p.getTotalLength(); } catch (e) {} p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.style.transition = `stroke-dashoffset .85s cubic-bezier(.2,.7,.3,1) ${i * 35}ms`; requestAnimationFrame(() => { p.style.strokeDashoffset = 0; }); });
      const delay = strokes.length * 35 + 120;
      pops.forEach((c, i) => { c.style.transformBox = "fill-box"; c.style.transformOrigin = "center"; c.style.transform = "scale(0)"; c.style.transition = `transform .5s cubic-bezier(.2,.8,.2,1) ${delay + i * 22}ms`; requestAnimationFrame(() => { c.style.transform = "scale(1)"; }); });
    });
  };
})();
