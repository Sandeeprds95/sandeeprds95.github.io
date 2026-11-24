const siteHeader = document.querySelector(".site-header");
const menuToggle = siteHeader.querySelector(".menu-toggle");
const navigation = document.getElementById("site-navigation");

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  siteHeader.classList.toggle("menu-open", open);
}

siteHeader.classList.add("has-menu");
menuToggle.hidden = false;
menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) setMenu(false);
});
siteHeader.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

const motionControls = document.querySelector(".motion-controls");
const motionToggle = motionControls.querySelector(".motion-toggle");
const videos = [...document.querySelectorAll(".feature-video")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const visibleVideos = new Set();
let motionEnabled = !reducedMotion.matches;

function updateMotion() {
  motionToggle.textContent = motionEnabled ? "Pause motion" : "Play motion";
  for (const video of videos) {
    if (motionEnabled && !document.hidden && visibleVideos.has(video)) {
      if (!video.hasAttribute("src")) video.src = video.dataset.src;
      video.muted = true;
      video.play().catch(() => {
        // Keep the poster available when playback is blocked or unsupported.
      });
    } else {
      video.pause();
    }
  }
}

if ("IntersectionObserver" in window && videos.length) {
  motionControls.hidden = false;
  for (const video of videos) {
    video.addEventListener("playing", () => video.classList.add("is-playing"));
    video.addEventListener("error", () => video.classList.remove("is-playing"));
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.75) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
    }
    updateMotion();
  }, { threshold: 0.75 });
  videos.forEach(video => observer.observe(video));
  motionToggle.addEventListener("click", () => {
    motionEnabled = !motionEnabled;
    updateMotion();
  });
  reducedMotion.addEventListener("change", event => {
    motionEnabled = !event.matches;
    updateMotion();
  });
  document.addEventListener("visibilitychange", updateMotion);
  updateMotion();
}

const swipeLayout = window.matchMedia("(max-width: 48rem)");
const shelves = [...document.querySelectorAll(".shelf")];

function updateShelfFocus() {
  for (const shelf of shelves) {
    // Give non-interactive card rows a keyboard entry point for scrolling.
    if (swipeLayout.matches && !shelf.querySelector("a")) shelf.tabIndex = 0;
    else shelf.removeAttribute("tabindex");
  }
}

swipeLayout.addEventListener("change", updateShelfFocus);
updateShelfFocus();
