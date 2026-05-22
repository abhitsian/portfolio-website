/* Detail page — renders one item from window.PORTFOLIO by ?id=slug. */
(function () {
  const D = window.PORTFOLIO;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const elDetail = document.getElementById("detail");

  const id = new URLSearchParams(location.search).get("id");
  const all = [
    ...(D.projects || []).map((x) => ({ ...x, kind: "Project" })),
    ...(D.apps || []).map((x) => ({ ...x, kind: "App" })),
    ...(D.writing || []).map((x) => ({ ...x, kind: "Writing" }))
  ];
  const it = all.find((x) => x.slug === id);

  // footer links
  const L = D.profile.links;
  document.getElementById("foot-links").innerHTML = [
    ["github", L.github], ["x / twitter", L.x], ["email", L.email]
  ].map(([t, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("");

  if (!it) {
    elDetail.innerHTML = `<div class="d-back"><a href="index.html">← back</a></div>
      <h1 class="d-title">Not found</h1>
      <p class="d-lede">No project matches that link. <a href="index.html">Head back to the index.</a></p>`;
    return;
  }

  document.title = it.name + " — Abhishek Sivaraman";
  const tags = (it.tags || []).map((t) => `<span class="d-tag">${esc(t)}</span>`).join("");
  const features = (it.features || []).map((f, i) =>
    `<li><span class="fn">${String(i + 1).padStart(2, "0")}</span><span>${esc(f)}</span></li>`).join("");
  const metaBadge = it.meta ? `<span class="d-meta-badge">Claude-workflow tool</span>` : "";

  // links block
  const links = [];
  if (it.github) links.push(`<a class="d-cta" href="${esc(it.github)}" target="_blank" rel="noopener">View on GitHub <span>↗</span></a>`);
  if (it.live) links.push(`<a class="d-cta ghost" href="${esc(it.live)}" target="_blank" rel="noopener">Live <span>↗</span></a>`);
  if (!it.github && !it.live) links.push(`<span class="d-note">Local app — not yet public.</span>`);

  elDetail.innerHTML = `
    <div class="d-back"><a href="index.html#${it.kind.toLowerCase()}s">← ${esc(it.kind)}s</a></div>

    <header class="d-head">
      <div class="d-kicker">${esc(it.kind)} ${metaBadge}</div>
      <h1 class="d-title">${esc(it.name)}</h1>
      <p class="d-lede">${esc(it.desc || "")}</p>
      <div class="d-tags">${tags}</div>
    </header>

    <section class="d-about">
      <span class="d-label">What it is</span>
      <p>${esc(it.about || it.desc || "")}</p>
    </section>

    ${features ? `<section class="d-features">
      <span class="d-label">Highlights</span>
      <ol class="d-flist">${features}</ol>
    </section>` : ""}

    <section class="d-foot">
      ${links.join("")}
    </section>
  `;
})();
