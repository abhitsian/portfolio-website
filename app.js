/* Render the portfolio from window.PORTFOLIO (data.js). */
(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  if (!D) return;
  const href = (slug) => "project.html?id=" + encodeURIComponent(slug);

  // ---- hero ----
  const hw = D.profile.headline.trim().split(" ");
  const last = hw.pop();
  $("headline").innerHTML = esc(hw.join(" ")) + ' <span class="o">' + esc(last) + "</span>";
  $("blurb").textContent = D.profile.blurb;
  $("stats").innerHTML = D.stats.map((s) =>
    `<div class="cell"><div class="k">${esc(s.k)}</div><div class="v">${esc(s.v)}</div><div class="note">${esc(s.note)}</div></div>`).join("");

  // ---- meta-theme band ----
  if (D.metaTheme) {
    const bySlug = {};
    [...(D.projects || []), ...(D.apps || [])].forEach((x) => (bySlug[x.slug] = x));
    const chips = D.metaTheme.slugs.map((sl) => {
      const it = bySlug[sl];
      return it ? `<a class="mchip" href="${href(sl)}">${esc(it.name)}</a>` : "";
    }).join("");
    $("metaband").innerHTML = `
      <span class="mlabel">${esc(D.metaTheme.label)}</span>
      <h2 class="mtitle">${esc(D.metaTheme.title)}</h2>
      <p class="mblurb">${esc(D.metaTheme.blurb)}</p>
      <div class="mchips">${chips}</div>`;
  }

  // ---- skills ----
  $("skills-count").textContent = D.skills.total + " total";
  $("skills-note").textContent = D.skills.note;
  const browse = D.skills.browse || "skills.html";
  // featured set is rendered by data on the browser page; here, surface the entry point
  $("skills-grid").innerHTML =
    `<a class="skillcell more wide" href="${esc(browse)}">
       <span>Browse the searchable skills library</span><span class="arrow">→</span>
     </a>`;

  // ---- projects (ledger) → detail pages ----
  $("projects-list").innerHTML = D.projects.map((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const meta = p.meta ? `<span class="metadot" title="Claude-workflow tool">●</span>` : "";
    return `<a class="lrow" href="${href(p.slug)}">
      <span class="nn">${n}</span>
      <span class="body">
        <span class="nm">${esc(p.name)}${meta}</span><span class="arrow">→</span>
        <span class="tags">${tags}</span>
        <span class="ds">${esc(p.desc)}</span>
      </span></a>`;
  }).join("");

  // ---- apps → detail pages ----
  $("apps-grid").innerHTML = D.apps.map((a) =>
    `<a class="appcell" href="${href(a.slug)}">
       <div class="nm">${esc(a.name)}${a.meta ? '<span class="metadot">●</span>' : ""}<span class="lbl">local</span></div>
       <div class="ds">${esc(a.desc)}</div>
     </a>`).join("");

  // ---- writing ----
  $("writing-list").innerHTML = D.writing.map((w) => {
    const count = (w.tags && w.tags[0]) || "";
    const num = (count.match(/\d+/) || [""])[0];
    return `<a class="writecard" href="${href(w.slug)}">
      <div class="big">${esc(num)}<small>${esc(count.replace(/^\d+\s*/, "") || "articles")}</small></div>
      <div>
        <h3>${esc(w.name)}</h3>
        <p>${esc(w.desc)}</p>
        <span class="go">read more →</span>
      </div></a>`;
  }).join("");

  // ---- products ----
  const pr = D.products;
  $("products-status").textContent = pr.status;
  const teasers = pr.teasers.map((t) => `<div class="t"><b>${esc(t.name)}</b><span>${esc(t.note)}</span></div>`).join("");
  $("product-panel").innerHTML = `
    <div class="soon">${esc(pr.status)}</div>
    <div class="ptitle">PM tools, packaged and for sale.</div>
    <div class="pblurb">${esc(pr.blurb)}</div>
    <div class="teasers">${teasers}</div>
    <form class="signup" id="signup" action="${esc(pr.formAction)}" method="POST">
      <input type="email" name="email" placeholder="you@email.com" required aria-label="Email">
      <button type="submit">Notify me</button>
    </form>
    <div class="pfoot">No spam — one email when the first product ships.${pr.gumroad ? ` Or follow on <a href="${esc(pr.gumroad)}" target="_blank" rel="noopener">Gumroad ↗</a>.` : ""}</div>`;
  const form = $("signup");
  if (form) form.addEventListener("submit", (e) => {
    if (form.action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      form.innerHTML = `<div class="ok">✓ Thanks — wire a Formspree/Buttondown endpoint in data.js to start collecting.</div>`;
    }
  });

  // ---- footer ----
  const L = D.profile.links;
  $("foot-links").innerHTML = [["github", L.github], ["x / twitter", L.x], ["email", L.email]]
    .map(([t, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("");

  // ---- reveal ----
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  document.querySelectorAll(".sec, .hero, .metaband").forEach((el) => {
    el.classList.add("reveal");
    if (io) io.observe(el); else el.classList.add("in");
  });
})();
