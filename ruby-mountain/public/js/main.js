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
  const title = project.title?.[lang] || project.title?.en || "Project";
  const category = project.categoryKey?.[lang] || project.categoryKey?.en || "";
  const desc = project.description?.[lang] || project.description?.en || "";

  const titleEl = document.getElementById("modal-title");
  const metaEl = document.getElementById("modal-meta");
  const descEl = document.getElementById("modal-description");
  const galleryEl = document.getElementById("modal-gallery");

  if (titleEl) titleEl.textContent = title;
  if (metaEl) metaEl.textContent = `${category} · ${project.location || ""}`;
  if (descEl) descEl.textContent = desc;

  if (galleryEl) {
    if (project.images && project.images.length) {
      galleryEl.innerHTML = project.images
        .map(
          (src) => `
            <img 
              src="${src}" 
              alt="${title}" 
              class="modal-gallery-img"
              data-full="${src}"
              loading="lazy"
            >
          `
        )
        .join("");
    } else {
      galleryEl.innerHTML = "";
    }
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

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);

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
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Contact request failed");
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
// SCROLL REVEAL (PROJECT CARDS)
// =========================

function initScrollReveal() {
  const items = document.querySelectorAll(
  ".project-card, .card, .section__header, .stats"
);


  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  items.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// =========================
// IMAGE LIGHTBOX (85% screen)
// =========================

function initImageLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const backdrop = lightbox.querySelector(".image-lightbox__backdrop");
  if (!backdrop) return;

  function openLightbox(src, alt = "") {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
  }

  // event delegation so it works for injected images
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".modal-gallery-img");
    if (!img) return;
    openLightbox(img.dataset.full || img.src, img.alt || "");
  });

  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

// =========================
// INIT ON LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {
  if (typeof initLanguage === "function") initLanguage();

  initNav();
  initYear();
  initProjectFilters();
  initModal();
  initImageLightbox();
  initContactForm();

  renderHomeProjects();
  renderProjects();
  initScrollReveal();

  // Debug (temporary): confirms projects data exists
  console.log("projectsData length:", window.projectsData?.length);
});