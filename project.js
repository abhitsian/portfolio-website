/* Detail page — renders one item from window.PORTFOLIO by ?id=slug, with a
   visual hero (real screenshot if present, else a generated cover) + animations. */
(function () {
  const D = window.PORTFOLIO;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const elDetail = document.getElementById("detail");
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const id = new URLSearchParams(location.search).get("id");
  const all = [
    ...(D.projects || []).map((x) => ({ ...x, kind: "Project" })),
    ...(D.apps || []).map((x) => ({ ...x, kind: "App" })),
    ...(D.writing || []).map((x) => ({ ...x, kind: "Writing" }))
  ];
  const it = all.find((x) => x.slug === id);

  const L = D.profile.links;
  document.getElementById("foot-links").innerHTML = [["github", L.github], ["x / twitter", L.x], ["email", L.email]]
    .map(([t, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("");

  if (!it) {
    elDetail.innerHTML = `<div class="d-back"><a href="index.html">← back</a></div>
      <h1 class="d-title">Not found</h1><p class="d-lede">No project matches that link. <a href="index.html">Back to the index.</a></p>`;
    return;
  }

  document.title = it.name + " — Abhishek Sivaraman";
  const tags = (it.tags || []).map((t) => `<span class="d-tag">${esc(t)}</span>`).join("");
  const features = (it.features || []).map((f, i) =>
    `<li><span class="fn">${String(i + 1).padStart(2, "0")}</span><span>${esc(f)}</span></li>`).join("");
  const metaBadge = it.meta ? `<span class="d-meta-badge">Claude-workflow tool</span>` : "";

  const links = [];
  if (it.github) links.push(`<a class="d-cta" href="${esc(it.github)}" target="_blank" rel="noopener">View on GitHub <span>↗</span></a>`);
  if (it.live) links.push(`<a class="d-cta ghost" href="${esc(it.live)}" target="_blank" rel="noopener">Live <span>↗</span></a>`);
  if (!it.github && !it.live) links.push(`<span class="d-note">Local app — not yet public.</span>`);

  // visual hero priority: real screenshot, then logo, then generated cover
  let visual;
  if (it.image) {
    visual = `<figure class="d-visual shot a1"><img src="${esc(it.image)}" alt="${esc(it.name)} screenshot" loading="eager"><figcaption>Screenshot — ${esc(it.name)}</figcaption></figure>`;
  } else if (it.logo) {
    visual = `<figure class="d-visual logo-hero a1"><img src="${esc(it.logo)}" alt="${esc(it.name)} logo" loading="eager"><figcaption>${esc(it.name)}</figcaption></figure>`;
  } else {
    visual = `<div class="d-visual cover a1" id="cover"></div>`;
  }

  // Optional audio sample (e.g. dispatch's radio voice)
  const audio = it.audio
    ? `<section class="d-audio a2"><span class="d-label">Listen</span><audio controls preload="metadata" src="${esc(it.audio)}"></audio></section>`
    : "";

  elDetail.innerHTML = `
    <div class="d-back a0"><a href="index.html#${it.kind.toLowerCase()}s">← ${esc(it.kind)}s</a></div>
    <header class="d-head a0">
      <div class="d-kicker">${esc(it.kind)} ${metaBadge}</div>
      <h1 class="d-title">${esc(it.name)}</h1>
      <p class="d-lede">${esc(it.desc || "")}</p>
      <div class="d-tags">${tags}</div>
    </header>
    ${visual}
    ${audio}
    <section class="d-about a2"><span class="d-label">What it is</span><p>${esc(it.about || it.desc || "")}</p></section>
    ${features ? `<section class="d-features a3"><span class="d-label">Highlights</span><ol class="d-flist">${features}</ol></section>` : ""}
    <section class="d-foot a4">${links.join("")}</section>
  `;

  // generated cover (only when no screenshot)
  const coverMount = document.getElementById("cover");
  if (coverMount && window.generateCover) window.generateCover(coverMount, it.slug);

  // staggered entrance
  if (!reduce) {
    const steps = ["a0", "a1", "a2", "a3", "a4"];
    elDetail.querySelectorAll(".a0,.a1,.a2,.a3,.a4").forEach((node) => {
      const k = steps.find((s) => node.classList.contains(s));
      node.style.opacity = "0";
      node.style.transform = "translateY(16px)";
      const delay = steps.indexOf(k) * 110;
      requestAnimationFrame(() => {
        node.style.transition = `opacity .6s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform .6s cubic-bezier(.2,.7,.3,1) ${delay}ms`;
        node.style.opacity = "1";
        node.style.transform = "none";
      });
    });
  }
})();
