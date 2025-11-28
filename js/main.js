// =========================
// LANGUAGE SETUP
// =========================

const translations = {
  en: {
    "top-phone-label": "Phone",
    "top-email-label": "Email",
    "language-label": "Language",
    "brand-tagline": "Construction & Maintenance",

    "nav-home": "Home",
    "nav-about": "About",
    "nav-services": "Services",
    "nav-projects": "Projects",
    "nav-contact": "Contact",

    "hero-heading": "Timber homes and lodges built to last.",
    "hero-sub": "Ruby Mountain specialises in timber construction, renovations and maintenance across Bela Bela and surrounds.",
    "hero-cta-primary": "Request a quote",
    "hero-cta-secondary": "View recent projects",

    "about-heading": "About Ruby Mountain",
    "about-body": "With over 20 years of industry experience, Ruby Mountain Construction & Maintenance delivers new builds, alterations and ongoing maintenance for lodges and private homes.",
    "about-body-2": "From site preparation to final finishes, we manage the full process with a focus on quality workmanship and honest communication.",

    "stat-years": "years experience",
    "stat-projects": "completed projects",
    "stat-repeat": "repeat & referral work",
    "stat-registered": "registered builder",

    "services-heading": "What we do",
    "services-sub": "From new timber lodges to general maintenance, Ruby Mountain covers the full scope of construction services.",

    "service-construction-title": "Construction",
    "service-construction-body": "New private dwellings, lodges and structures built with timber, brick and stone.",
    "service-alterations-title": "Building alterations",
    "service-alterations-body": "Extensions, decks and interior reconfiguration to upgrade existing buildings.",
    "service-civil-title": "Civil works",
    "service-civil-body": "Earthworks, foundations, paving and related civil construction.",
    "service-project-title": "Project management",
    "service-project-body": "Coordinating contractors, timelines and budgets from start to finish.",
    "service-maintenance-title": "General maintenance",
    "service-maintenance-body": "Ongoing care, repairs and protective treatments for timber and structures.",
    "service-rental-title": "Equipment & vehicle rental",
    "service-rental-body": "Hiring of construction equipment and vehicles with experienced operators.",
    "service-labour-title": "Supply of labour",
    "service-labour-body": "Skilled teams for short and long-term construction projects.",
    "service-steel-title": "Steel structures & storage units",
    "service-steel-body": "Design and construction of steel structures, sheds and storage units.",

    "home-projects-heading": "Recent projects",
    "home-projects-sub": "A selection of current and completed work. View the full catalogue on the projects page.",
    "home-projects-link": "View all projects →",

    "cta-heading": "Ready to start your project?",
    "cta-body": "Share your plans and we’ll arrange a site visit to discuss ideas, budgets and timelines.",
    "cta-button": "Contact us",

    "footer-about": "Construction & Maintenance based in Bela Bela, specialising in timber homes, lodges and renovations.",
    "footer-contact-heading": "Contact",
    "footer-links-heading": "Quick links",
    "footer-link-services": "Services",
    "footer-link-projects": "Projects",
    "footer-link-quote": "Request a quote",

    "projects-page-heading": "Projects",
    "projects-page-sub": "Explore our current and completed projects. Filter by type and click any project for more details and photos.",
    "projects-filter-all": "All",
    "projects-filter-new": "New dwellings",
    "projects-filter-lodge": "Lodges",
    "projects-filter-reno": "Alterations & decks"
  },

  af: {
    "top-phone-label": "Foon",
    "top-email-label": "E-pos",
    "language-label": "Taal",
    "brand-tagline": "Konstruksie & Instandhouding",

    "nav-home": "Tuis",
    "nav-about": "Oor ons",
    "nav-services": "Dienste",
    "nav-projects": "Projekte",
    "nav-contact": "Kontak",

    "hero-heading": "Houthuise en lodges wat lank hou.",
    "hero-sub": "Ruby Mountain spesialiseer in houtkonstruksie, aanbouings en instandhouding in Bela Bela en omgewing.",
    "hero-cta-primary": "Versoek ’n kwotasie",
    "hero-cta-secondary": "Sien onlangse projekte",

    "about-heading": "Oor Ruby Mountain",
    "about-body": "Met meer as 20 jaar ondervinding bied Ruby Mountain Construction & Maintenance nuwe geboue, aanbouings en deurlopende instandhouding vir lodges en privaat huise.",
    "about-body-2": "Ons bestuur die hele proses – van terreinvoorbereiding tot afwerkings – met fokus op kwaliteit vakmanskap en eerlike kommunikasie.",

    "stat-years": "jaar ervaring",
    "stat-projects": "voltooide projekte",
    "stat-repeat": "herhaal- & verwysingswerk",
    "stat-registered": "geregistreerde bouer",

    "services-heading": "Wat ons doen",
    "services-sub": "Van nuwe houtlodges tot algemene instandhouding – Ruby Mountain dek die volle spektrum van konstruksiedienste.",

    "service-construction-title": "Konstruksie",
    "service-construction-body": "Nuwe privaat wonings, lodges en strukture gebou met hout, baksteen en klip.",
    "service-alterations-title": "Gebou-wysigings",
    "service-alterations-body": "Aanbouings, dekke en uitlegveranderinge om bestaande geboue op te gradeer.",
    "service-civil-title": "Siviele werke",
    "service-civil-body": "Grondwerke, fondasies, plaveisel en verwante siviele konstruksie.",
    "service-project-title": "Projekbestuur",
    "service-project-body": "Koördinering van kontrakteurs, tydlyne en begrotings van begin tot einde.",
    "service-maintenance-title": "Algemene instandhouding",
    "service-maintenance-body": "Deurlopende sorg, herstelwerk en beskermende behandelings vir hout en strukture.",
    "service-rental-title": "Toerusting- & voertuigverhuring",
    "service-rental-body": "Verhuring van konstruksietoerusting en voertuie met ervare operateurs.",
    "service-labour-title": "Voorsiening van arbeid",
    "service-labour-body": "Vaardige spanne vir kort- en langtermyn projekte.",
    "service-steel-title": "Staalstrukture & stooreenhede",
    "service-steel-body": "Ontwerp en bou van staalstrukture, skure en stooreenhede.",

    "home-projects-heading": "Onlangse projekte",
    "home-projects-sub": "’n Keuse van huidige en voltooide werk. Sien die volledige lys op die projekte-blad.",
    "home-projects-link": "Sien alle projekte →",

    "cta-heading": "Gereed om te begin bou?",
    "cta-body": "Deel jou planne en ons reel ’n terreinbesoek om idees, begrotings en tydlyne te bespreek.",
    "cta-button": "Kontak ons",

    "footer-about": "Konstruksie & Instandhouding gebaseer in Bela Bela, met ’n fokus op houthuise, lodges en opknappings.",
    "footer-contact-heading": "Kontak",
    "footer-links-heading": "Vinnige skakels",
    "footer-link-services": "Dienste",
    "footer-link-projects": "Projekte",
    "footer-link-quote": "Versoek ’n kwotasie",

    "projects-page-heading": "Projekte",
    "projects-page-sub": "Besoek ons huidige en voltooide projekte. Filter volgens tipe en klik op ’n projek vir besonderhede en foto’s.",
    "projects-filter-all": "Alles",
    "projects-filter-new": "Nuwe wonings",
    "projects-filter-lodge": "Lodges",
    "projects-filter-reno": "Aanbouings & dekke"
  }
};

let currentLanguage = "en";

function applyTranslations(lang) {
  currentLanguage = lang;
  const strings = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const text = strings[key];
    if (!text) return;

    const tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });
}

function initLanguage() {
  const stored = localStorage.getItem("rm-language");
  const lang = stored || "en";
  currentLanguage = lang;

  const select = document.getElementById("lang-select");
  if (select) {
    select.value = lang;
    select.addEventListener("change", () => {
      const value = select.value;
      localStorage.setItem("rm-language", value);
      applyTranslations(value);
      renderProjects();       // make sure projects re-render with right language
      renderHomeProjects();
    });
  }

  applyTranslations(lang);
}

// =========================
// NAV / FOOTER helpers
// =========================

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// =========================
/* PROJECTS DATA */
// =========================

const projectsData = [
  {
    id: "shona-langa",
    type: "new-build",
    categoryKey: { en: "New private dwelling", af: "Nuwe privaat woning" },
    title: { en: "Shona Langa V11 – Bela Bela", af: "Shona Langa V11 – Bela Bela" },
    location: "Bela Bela District",
    description: {
      en: "Construction of a new private dwelling in a nature estate with timber and thatch elements.",
      af: "Bou van ’n nuwe privaat woning in ’n natuurlandgoed met hout- en grasdak-elemente."
    },
    thumb: "img/proj-shona-1.jpg",
    images: [
      "img/proj-shona-1.jpg",
      "img/proj-shona-2.jpg",
      "img/proj-shona-3.jpg"
    ]
  },
  {
    id: "mokalakal-1",
    type: "lodge",
    categoryKey: { en: "Lodge dwelling", af: "Lodge-woning" },
    title: { en: "Mokalakal Lodge – Phase 1", af: "Mokalakal Lodge – Fase 1" },
    location: "Bela Bela",
    description: {
      en: "New timber-and-thatch lodge with wrap-around deck and views over the reserve.",
      af: "Nuwe hout- en grasdak-lodge met stoep rondom en uitsigte oor die reservaat."
    },
    thumb: "img/proj-mokalakal-1.jpg",
    images: [
      "img/proj-mokalakal-1.jpg",
      "img/proj-mokalakal-2.jpg",
      "img/proj-mokalakal-3.jpg"
    ]
  },
  {
    id: "mokalakal-2",
    type: "renovation",
    categoryKey: { en: "Alterations & deck", af: "Aanbouings & dek" },
    title: { en: "Mokalakal Lodge – Extensions", af: "Mokalakal Lodge – Aanbouings" },
    location: "Bela Bela",
    description: {
      en: "Extensions to existing lodge, including new deck, roof work and interior upgrades.",
      af: "Aanbouings tot bestaande lodge, insluitend nuwe dek, dakwerk en binnenshuise opgraderings."
    },
    thumb: "img/proj-mokalakal-ext-1.jpg",
    images: [
      "img/proj-mokalakal-ext-1.jpg",
      "img/proj-mokalakal-ext-2.jpg",
      "img/proj-mokalakal-ext-3.jpg"
    ]
  }
];

let activeFilter = "all";

// Render preview on Home
function renderHomeProjects() {
  const container = document.getElementById("home-projects");
  if (!container) return;

  const toShow = projectsData.slice(0, 3);

  container.innerHTML = toShow.map(projectToCardHTML).join("");
  attachProjectCardHandlers(container);
}

// Render full list on Projects page
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered = projectsData.filter(p => {
    if (activeFilter === "all") return true;
    return p.type === activeFilter;
  });

  if (!filtered.length) {
    grid.innerHTML = `<p>No projects in this category yet.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(projectToCardHTML).join("");
  attachProjectCardHandlers(grid);
}

function projectToCardHTML(project) {
  const lang = currentLanguage;
  const title = project.title[lang] || project.title.en;
  const category = project.categoryKey[lang] || project.categoryKey.en;
  return `
    <article class="card project-card" data-project-id="${project.id}">
      <div class="project-card__thumb">
        <img src="${project.thumb}" alt="${title}">
      </div>
      <h3>${title}</h3>
      <p class="project-card__meta">${category} · ${project.location}</p>
    </article>
  `;
}

// attach click handlers inside a container
function attachProjectCardHandlers(container) {
  const cards = container.querySelectorAll(".project-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      openProjectModal(id);
    });
  });
}

// =========================
// FILTER BUTTONS
// =========================

function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");
      activeFilter = btn.dataset.filter || "all";
      renderProjects();
    });
  });
}

// =========================
// PROJECT MODAL
// =========================

function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const lang = currentLanguage;

  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  const descEl = document.getElementById("modal-description");
  const galleryEl = document.getElementById("modal-gallery");

  titleEl.textContent = project.title[lang] || project.title.en;
  metaEl.textContent = `${project.categoryKey[lang] || project.categoryKey.en} · ${project.location}`;
  descEl.textContent = project.description[lang] || project.description.en;

  galleryEl.innerHTML = project.images.map(src => `
    <img src="${src}" alt="${project.title[lang] || project.title.en}">
  `).join("");

  modal.classList.add("modal--open");
  modal.setAttribute("aria-hidden", "false");
}

function initModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const closeBtn = document.getElementById("project-modal-close");
  const backdrop = modal.querySelector(".modal__backdrop");

  function close() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
  }

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// =========================
// INIT ON LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initNav();
  initYear();
  initProjectFilters();
  initModal();
  renderHomeProjects();
  renderProjects(); // safe: it only runs if grid exists
});
