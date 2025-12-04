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
// PROJECTS (rendering only)
// =========================

let activeFilter = "all";

function projectToCardHTML(project) {
  if (!project) return "";
  const lang = window.currentLanguage || "en";
  const title = project.title[lang] || project.title.en;
  const category = project.categoryKey[lang] || project.categoryKey.en;

  const thumbHTML = project.thumb
    ? `
      <div class="project-card__thumb">
        <img src="${project.thumb}" alt="${title}">
      </div>
    `
    : "";

  return `
    <article class="card project-card" data-project-id="${project.id}">
      ${thumbHTML}
      <h3>${title}</h3>
      <p class="project-card__meta">${category} · ${project.location}</p>
    </article>
  `;
}

function attachProjectCardHandlers(container) {
  if (!container) return;
  const cards = container.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      openProjectModal(id);
    });
  });
}

function renderHomeProjects() {
  const container = document.getElementById("home-projects");
  if (!container || !window.projectsData) return;
  const toShow = window.projectsData.slice(0, 3);
  container.innerHTML = toShow.map(projectToCardHTML).join("");
  attachProjectCardHandlers(container);
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid || !window.projectsData) return;

  const filtered = window.projectsData.filter((p) => {
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
  if (!modal || !window.projectsData) return;

  const project = window.projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const lang = window.currentLanguage || "en";
  const title = project.title[lang] || project.title.en;
  const category = project.categoryKey[lang] || project.categoryKey.en;
  const desc = project.description[lang] || project.description.en;

  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  const descEl = document.getElementById("modal-description");
  const galleryEl = document.getElementById("modal-gallery");

  titleEl.textContent = title;
  metaEl.textContent = `${category} · ${project.location}`;
  descEl.textContent = desc;

  if (project.images && project.images.length) {
    galleryEl.innerHTML = project.images
      .map((src) => `<img src="${src}" alt="${title}">`)
      .join("");
  } else {
    galleryEl.innerHTML = "";
  }

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

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      if (!data.ok) throw new Error("Server indicated failure");

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
  if (typeof initLanguage === "function") initLanguage(); // from lang.js
  initNav();
  initYear();
  initProjectFilters();
  initModal();
  renderHomeProjects();
  renderProjects();
  initContactForm();
});
