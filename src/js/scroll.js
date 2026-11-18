import { byId, reducedMotion } from "./env.js";

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** One rAF-throttled scroll loop drives progress bar, parallax, word highlight and the pinned experience track. */
export function initScrollEngine() {
  const hx = byId("hx"), track = byId("tr"), bar = byId("bar"),
        hero = byId("hin"), nav = byId("nv"), about = byId("abt");
  const blobs = [...document.querySelectorAll(".blob")];

  about.innerHTML = about.textContent.trim().split(/\s+/)
    .map((w) => `<span>${w}</span>`).join(" ");
  const words = [...about.children];

  let ticking = false, wide = false, dist = 0;

  function measure() {
    wide = !reducedMotion && innerWidth >= 900;
    hx.classList.toggle("on", wide);
    track.style.transform = "";
    if (wide) {
      dist = Math.max(0, track.scrollWidth - innerWidth + 60);
      hx.style.setProperty("--hh", innerHeight + dist * 1.1 + "px");
    } else {
      hx.style.removeProperty("--hh");
    }
    update();
  }

  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("s", y > 40);
    if (reducedMotion) return;

    const p = Math.min(1, y / (vh * 0.8));
    hero.style.transform = `translateY(${p * 70}px)`;
    hero.style.opacity = 1 - p * 1.1;
    blobs.forEach((b) => { b.style.transform = `translateY(${y * parseFloat(b.dataset.s)}px)`; });
    words.forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < vh * 0.72));

    const r = hx.getBoundingClientRect();
    if (wide) {
      const pr = clamp01(-r.top / (r.height - vh));
      track.style.transform = `translate3d(${-dist * pr}px,0,0)`;
      hx.style.setProperty("--hp", pr);
    } else {
      track.style.setProperty("--lp", clamp01((vh * 0.7 - r.top) / r.height));
    }
  }

  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener("resize", measure);
  addEventListener("load", measure);
  measure();
}
