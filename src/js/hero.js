import { byId, reducedMotion } from "./env.js";

export const ROLES = [
  "Home appliances sales expert",
  "Graphic designer",
  "CRM and customer support",
  "News page publisher",
];

/** Split [data-t] text into per-letter spans for the staggered entrance. */
export function splitHeroLetters(root = document) {
  root.querySelectorAll("[data-t]").forEach((node, k) => {
    node.innerHTML = [...node.dataset.t]
      .map((c, i) => `<span class="ch" style="--i:${i + k * 6}">${c}</span>`)
      .join("");
  });
}

/** Type and delete the rotating role line. Static first role if motion is reduced. */
export function startRoleTyping(el = byId("rl"), roles = ROLES) {
  if (reducedMotion) { el.textContent = roles[0]; return; }
  let word = 0, chars = 0, deleting = false;
  (function tick() {
    const w = roles[word];
    el.textContent = w.slice(0, chars);
    if (!deleting && chars++ === w.length) { deleting = true; return setTimeout(tick, 1600); }
    if (deleting && chars-- === 0) { deleting = false; word = (word + 1) % roles.length; }
    setTimeout(tick, deleting ? 35 : 70);
  })();
}
