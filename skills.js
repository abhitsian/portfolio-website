/* Skills browser — search + category filter over window.SKILLS (skills-data.js). */
(function () {
  const DATA = window.SKILLS || { skills: [], categories: [] };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const grid = document.getElementById("sk-grid");
  const empty = document.getElementById("sk-empty");
  const search = document.getElementById("sk-search");
  const cats = document.getElementById("sk-cats");

  // footer links from PORTFOLIO if present
  const L = (window.PORTFOLIO && window.PORTFOLIO.profile.links) || {};
  const fl = document.getElementById("foot-links");
  if (fl) fl.innerHTML = [["github", L.github], ["x / twitter", L.x], ["email", L.email]]
    .filter(([, h]) => h).map(([t, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("");

  document.getElementById("sk-count").textContent = DATA.count ? DATA.count + " shareable / 100+ total" : "";

  let active = "All";
  let q = "";

  // category chips
  const catList = ["All", ...DATA.categories.map((c) => c.name)];
  cats.innerHTML = catList.map((c) => {
    const n = c === "All" ? DATA.count : (DATA.categories.find((x) => x.name === c) || {}).count;
    return `<button class="sk-chip${c === "All" ? " on" : ""}" data-cat="${esc(c)}">${esc(c)} <span>${n != null ? n : ""}</span></button>`;
  }).join("");

  function matches(s) {
    if (active !== "All" && s.category !== active) return false;
    if (!q) return true;
    return (s.name + " " + s.description + " " + s.content).toLowerCase().includes(q);
  }

  function render() {
    const list = DATA.skills.filter(matches);
    empty.hidden = list.length > 0;
    grid.innerHTML = list.map((s) => `
      <article class="sk-card" tabindex="0" aria-expanded="false">
        <div class="sk-top">
          <h3 class="sk-name">${esc(s.name)}</h3>
          <span class="sk-cat">${esc(s.category)}</span>
        </div>
        <p class="sk-desc">${esc(s.description)}</p>
        <button class="sk-toggle" type="button">read skill <span>↓</span></button>
        <pre class="sk-body" hidden>${esc(s.content)}</pre>
      </article>`).join("");
  }

  // expand/collapse (event delegation)
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".sk-card");
    if (!card) return;
    if (e.target.closest(".sk-toggle") || e.target === card) {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
      card.querySelector(".sk-body").hidden = !open;
      const tog = card.querySelector(".sk-toggle span");
      if (tog) tog.textContent = open ? "↑" : "↓";
    }
  });
  grid.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("sk-card")) {
      e.preventDefault();
      e.target.querySelector(".sk-toggle").click();
    }
  });

  cats.addEventListener("click", (e) => {
    const b = e.target.closest(".sk-chip");
    if (!b) return;
    active = b.dataset.cat;
    cats.querySelectorAll(".sk-chip").forEach((x) => x.classList.toggle("on", x === b));
    render();
  });

  let t;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { q = search.value.trim().toLowerCase(); render(); }, 80);
  });

  render();
})();
