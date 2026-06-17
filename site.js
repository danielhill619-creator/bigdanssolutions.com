const analyticsMeasurementId = "G-0E1BLWT00Z";
const analyticsHostnames = new Set(["bigdanssolutions.com", "www.bigdanssolutions.com"]);

if (analyticsHostnames.has(window.location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  document.head.appendChild(analyticsScript);

  window.gtag("js", new Date());
  window.gtag("config", analyticsMeasurementId);
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const themeToggle = document.querySelector(".theme-toggle");
const themeIcons = {
  sun: `
    <svg class="theme-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle>
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
    </svg>
  `,
  moon: `
    <svg class="theme-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M20.2 14.6A7.5 7.5 0 0 1 9.4 3.8a8.8 8.8 0 1 0 10.8 10.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `,
};
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("bds-theme");
} catch {
  savedTheme = null;
}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const pageParams = new URLSearchParams(window.location.search);
const requestedTheme = pageParams.get("theme");
const startingTheme = requestedTheme === "dark" || requestedTheme === "light"
  ? requestedTheme
  : savedTheme || (prefersDark ? "dark" : "light");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    const isDark = theme === "dark";
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.innerHTML = isDark ? themeIcons.sun : themeIcons.moon;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = label;
  }
}

setTheme(startingTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("bds-theme", nextTheme);
    } catch {
      // Theme still changes for this visit if storage is unavailable.
    }
    setTheme(nextTheme);
  });
}

const revealTargets = document.querySelectorAll("main > section");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const skipReveal = pageParams.get("reveal") === "off";

if (!skipReveal && !reducedMotion && "IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((target) => target.classList.add("reveal-on-scroll"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item, index) => {
  const summary = item.querySelector("summary");
  const alreadyWrapped = item.querySelector(":scope > .faq-content");

  if (!summary || alreadyWrapped) {
    return;
  }

  const content = document.createElement("div");
  content.className = "faq-content";
  content.id = `faq-answer-${index + 1}`;

  Array.from(item.childNodes)
    .filter((node) => node !== summary)
    .forEach((node) => content.appendChild(node));

  item.appendChild(content);
  summary.setAttribute("role", "button");
  summary.setAttribute("aria-controls", content.id);
  summary.setAttribute("aria-expanded", String(item.open));

  if (item.open) {
    content.style.maxHeight = `${content.scrollHeight}px`;
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    if (item.open) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
        summary.setAttribute("aria-expanded", "false");
      });

      content.addEventListener("transitionend", function closePanel(transitionEvent) {
        if (transitionEvent.propertyName !== "max-height") {
          return;
        }

        item.open = false;
        content.removeEventListener("transitionend", closePanel);
      });
      return;
    }

    item.open = true;
    summary.setAttribute("aria-expanded", "true");
    content.style.maxHeight = "0px";
    requestAnimationFrame(() => {
      content.style.maxHeight = `${content.scrollHeight}px`;
    });
  });
});

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

const zoomButtons = document.querySelectorAll(".image-zoom");

if (zoomButtons.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.innerHTML = `
    <figure>
      <button class="lightbox-close" type="button">Close</button>
      <div class="lightbox-frame">
        <img alt="" />
      </div>
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(dialog);

  const dialogImage = dialog.querySelector("img");
  const dialogCaption = dialog.querySelector(".lightbox-caption");
  const closeButton = dialog.querySelector(".lightbox-close");

  zoomButtons.forEach((button) => {
    const image = button.querySelector("img");
    const caption = button.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || image.alt;

    button.setAttribute("aria-label", `Enlarge image: ${caption}`);

    button.addEventListener("click", () => {
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialogCaption.textContent = caption;
      document.body.classList.add("lightbox-open");
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    dialogImage.removeAttribute("src");
  });
}
