import { reducedMotion } from "./env.js";

const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

/** Count a number up to its target (years count up from target-6). */
export function countUp(node, now = performance.now()) {
  const to = +node.dataset.n;
  const from = node.dataset.f === "y" ? to - 6 : 0;
  (function frame(t) {
    const p = Math.min(1, (t - now) / 1100);
    node.textContent = Math.round(from + (to - from) * easeOutCubic(p));
    if (p < 1) requestAnimationFrame(frame);
  })(now);
}

export function initReveals() {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in");
      const counter = entry.target.querySelector("[data-n]");
      if (counter && !reducedMotion && !counter.dataset.d) {
        counter.dataset.d = 1;
        countUp(counter);
      }
      io.unobserve(entry.target);
    }
  }, { threshold: 0.15 });
  document.querySelectorAll(".rv").forEach((n, k) => {
    n.style.setProperty("--d", (k % 4) * 0.07 + "s");
    io.observe(n);
  });
}
