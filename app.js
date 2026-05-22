/* Render the portfolio from window.PORTFOLIO (data.js). */
(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  if (!D) return;

  // ---- hero ----
  // accent the last word of the headline
  const hw = D.profile.headline.trim().split(" ");
  const last = hw.pop();
  $("headline").innerHTML = esc(hw.join(" ")) + ' <span class="o">' + esc(last) + "</span>";
  $("blurb").textContent = D.profile.blurb;

  $("stats").innerHTML = D.stats.map((s) =>
    `<div class="cell"><div class="k">${esc(s.k)}</div><div class="v">${esc(s.v)}</div><div class="note">${esc(s.note)}</div></div>`
  ).join("");

  // ---- skills ----
  $("skills-count").textContent = D.skills.total + " total";
  $("skills-note").textContent = D.skills.note;
  const skillCells = D.skills.featured.map((s) =>
    `<div class="skillcell"><div class="top"><span class="nm">${esc(s.name)}</span><span class="cat">${esc(s.cat)}</span></div><div class="ds">${esc(s.desc)}</div></div>`
  ).join("");
  $("skills-grid").innerHTML = skillCells +
    `<div class="skillcell more"><a href="${esc(D.profile.github)}?tab=repositories" target="_blank" rel="noopener">+ ${esc(D.skills.total)} skills →</a></div>`;

  // ---- projects (ledger) ----
  $("projects-list").innerHTML = D.projects.map((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const href = p.live || p.github || "#";
    return `<a class="lrow" href="${esc(href)}" target="_blank" rel="noopener">
      <span class="nn">${n}</span>
      <span class="body">
        <span class="nm">${esc(p.name)}</span><span class="arrow">↗</span>
        <span class="tags">${tags}</span>
        <span class="ds">${esc(p.desc)}</span>
      </span></a>`;
  }).join("");

  // ---- apps ----
  $("apps-grid").innerHTML = D.apps.map((a) =>
    `<div class="appcell"><div class="nm">${esc(a.name)}<span class="lbl">local</span></div><div class="ds">${esc(a.desc)}</div></div>`
  ).join("");

  // ---- writing ----
  $("writing-list").innerHTML = D.writing.map((w) => {
    const count = (w.tags && w.tags[0]) || "";
    const num = (count.match(/\d+/) || [""])[0];
    return `<div class="writecard">
      <div class="big">${esc(num)}<small>${esc(count.replace(/^\d+\s*/, "") || "articles")}</small></div>
      <div>
        <h3>${esc(w.name)}</h3>
        <p>${esc(w.desc)}</p>
        <a class="go" href="${esc(w.live || w.github)}" target="_blank" rel="noopener">read on github ↗</a>
      </div></div>`;
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

  // graceful form handling (until a real endpoint is wired)
  const form = $("signup");
  if (form) form.addEventListener("submit", (e) => {
    if (form.action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      form.innerHTML = `<div class="ok">✓ Thanks — wire a Formspree/Buttondown endpoint in data.js to start collecting.</div>`;
    }
  });

  // ---- footer links ----
  const L = D.profile.links;
  $("foot-links").innerHTML = [
    ["github", L.github], ["x / twitter", L.x], ["email", L.email]
  ].map(([t, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("");

  // ---- reveal on scroll ----
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  document.querySelectorAll(".sec, .hero").forEach((el) => {
    el.classList.add("reveal");
    if (io) io.observe(el); else el.classList.add("in");
  });
})();
