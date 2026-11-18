import { reducedMotion, finePointer } from "./env.js";

/** Subtle 3D tilt on cards, only for mouse users who allow motion. */
export function initTilt() {
  if (reducedMotion || !finePointer) return;
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}
