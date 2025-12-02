// main.js

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
// PROJECTS DATA
// =========================

const projectsData = [
  {
    id: "shona-langa",
    type: "new-build",
    categoryKey: { en: "New private dwelling", af: "Nuwe privaat woning" },
    title: {
      en: "Shona Langa T6 - Bela Bela",
      af: "Shona Langa T6 - Bela Bela"
    },
    location: "Bela Bela District",
    description: {
      en: "Double-storey private home with face-brick finishes, pitched roofing and an integrated double garage, built for modern bushveld living.",
    af: "Dubbelverdieping privaat woning met baksteenafwerkings, teëldak en geïntegreerde dubbelmotorhuis, ontwerp vir moderne bosveldlewe."
  },
    thumb: "img/Shona Langa T6 - 1.jpeg",
    images: [
      "img/Shona Langa T6 - 1.jpeg",
      "img/Shona Langa T6 - 2.jpeg",
      "img/Shona Langa T6 - 3.jpeg",
      "img/Shona Langa T6 - 4.jpeg",
      "img/Shona Langa T6 - 5.jpeg"
    ]
  },
  {
    id: "mokalakal-1",
    type: "lodge",
    categoryKey: { en: "Lodge dwelling", af: "Lodge-woning" },
    title: {
      en: "Mokalakal Lodge – Phase 1",
      af: "Mokalakal Lodge – Fase 1"
    },
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
    title: {
      en: "Mokalakal Lodge – Extensions",
      af: "Mokalakal Lodge – Aanbouings"
    },
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

// =========================
// PROJECT RENDER HELPERS
// =========================

function projectToCardHTML(project) {
  const lang = currentLanguage; // from lang.js
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
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      openProjectModal(id);
    });
  });
}

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

  const filtered = projectsData.filter((p) => {
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

// =========================
// FILTER BUTTONS
// =========================

function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("filter-btn--active"));
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

  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const lang = currentLanguage;

  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  const descEl = document.getElementById("modal-description");
  const galleryEl = document.getElementById("modal-gallery");

  titleEl.textContent = project.title[lang] || project.title.en;
  metaEl.textContent = `${
    project.categoryKey[lang] || project.categoryKey.en
  } · ${project.location}`;
  descEl.textContent = project.description[lang] || project.description.en;

  galleryEl.innerHTML = project.images
    .map(
      (src) => `
    <img src="${src}" alt="${project.title[lang] || project.title.en}">
  `
    )
    .join("");

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
// CONTACT FORM
// =========================

function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      statusEl.textContent = getString("contact-validation");
      return;
    }

    statusEl.textContent = getString("contact-sending");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      if (!data.ok) {
        throw new Error("Server indicated failure");
      }

      statusEl.textContent = getString("contact-success");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      statusEl.textContent = getString("contact-error");
    }
  });
}

// =========================
// INIT ON LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();       // from lang.js
  initNav();
  initYear();
  initProjectFilters();
  initModal();
  renderHomeProjects();
  renderProjects();
  initContactForm();
});
