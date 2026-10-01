const projects = [
  {
    name: "NASA NEO Tracker",
    symbol: "NEO",
    category: "interactive",
    label: "GROUP PROJECT",
    description: "An interactive 3D view of near-Earth objects, combining NASA data, asteroid filters and orbital visualisation.",
    stack: "Angular · Three.js · NASA API",
    links: [
      { label: "Live demo", href: "https://space-app-devmediators.vercel.app/" },
      { label: "Source code", href: "https://github.com/DenReanin/space-app" },
    ],
  },
  {
    name: "Code-Tracer",
    symbol: "CT",
    category: "interactive",
    label: "BACHELOR'S THESIS",
    description: "An interactive learning platform for propositional logic, natural deduction and guided exercises.",
    stack: "Angular · Blockly · D3.js · KaTeX",
    links: [
      { label: "Live demo", href: "https://code-tracer.vercel.app/" },
      { label: "Source code", href: "https://github.com/DenReanin/code-tracer" },
    ],
  },
  {
    name: "FieldMaster",
    symbol: "FM",
    category: "interactive",
    label: "TEAM PROJECT · DEMO SNAPSHOT",
    description: "A sports-play platform built around a custom WebGL engine. The public demo repository has intentionally disabled services.",
    stack: "Angular · WebGL · Django · MySQL",
    links: [
      { label: "Demo repository", href: "https://github.com/DenReanin/fieldmaster_abp" },
      { label: "Web client", href: "https://github.com/DenReanin/litesparkweb" },
    ],
  },
  {
    name: "File Encryption App",
    symbol: "AES",
    category: "security",
    label: "SECURITY PROJECT",
    description: "A Java desktop application exploring hybrid file encryption and local user authentication.",
    stack: "Java · RSA-2048 · AES-128",
    links: [{ label: "Source code", href: "https://github.com/DenReanin/encryption-app" }],
  },
  {
    name: "Stream Deck Tablet",
    symbol: "SD",
    category: "web",
    label: "PERSONAL TOOL",
    description: "A tablet-friendly PWA that can send commands to a Windows PC and connect to OBS and Soundpad.",
    stack: "Python · FastAPI · WebSocket · PWA",
    links: [{ label: "Source code", href: "https://github.com/DenReanin/stream-deck-tablet" }],
  },
  {
    name: "ISC2-CC Study Adaptation",
    symbol: "CC",
    category: "security",
    label: "FORK · PERSONAL ADAPTATION",
    description: "A personal adaptation of ISC2 Certified in Cybersecurity study material for a Google Pixel device.",
    stack: "JavaScript · Security fundamentals",
    links: [
      { label: "Study site", href: "https://samuel2793.github.io/ISC2-CC/" },
      { label: "Repository", href: "https://github.com/DenReanin/ISC2-CC" },
    ],
  },
];

const projectGrid = document.querySelector("#project-grid");
const projectSearch = document.querySelector("#project-search");
const archiveCount = document.querySelector("#archive-count");
const archiveEmpty = document.querySelector("#archive-empty");
const filterButtons = [...document.querySelectorAll(".filter-button")];
let selectedFilter = "all";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  const visibleProjects = projects.filter((project) => {
    const matchesFilter = selectedFilter === "all" || project.category === selectedFilter;
    const searchableText = `${project.name} ${project.label} ${project.description} ${project.stack}`.toLowerCase();
    return matchesFilter && searchableText.includes(query);
  });

  projectGrid.innerHTML = visibleProjects.map((project) => `
    <article class="archive-card">
      <div class="archive-card-top"><span>${escapeHtml(project.label)}</span><span>${escapeHtml(project.category.toUpperCase())}</span></div>
      <div class="archive-card-symbol" aria-hidden="true">${escapeHtml(project.symbol)}</div>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <p class="archive-card-stack">${escapeHtml(project.stack)}</p>
      <div class="archive-card-links">${project.links.map((link) => `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">&#8599;</span></a>`).join("")}</div>
    </article>
  `).join("");

  archiveCount.textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"}`;
  archiveEmpty.hidden = visibleProjects.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderProjects();
  });
});

projectSearch.addEventListener("input", renderProjects);

const skillFilterButtons = [...document.querySelectorAll(".skill-filter")];
const skillRows = [...document.querySelectorAll(".skill-row")];
const skillCount = document.querySelector("#skill-count");

skillFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.skillFilter;
    skillFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    const visibleRows = skillRows.filter((row) => {
      const isVisible = selectedCategory === "all" || row.dataset.skillCategory === selectedCategory;
      row.hidden = !isVisible;
      return isVisible;
    });

    skillCount.textContent = `${visibleRows.length} ${visibleRows.length === 1 ? "skill area" : "skill areas"}`;
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

renderProjects();