// Environment detection shared by every module.
export const isEmbedded = (() => {
  try { return top !== self; } catch { return true; }
})();

export const reducedMotion =
  matchMedia("(prefers-reduced-motion:reduce)").matches || isEmbedded;

export const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;

export const byId = (id) => document.getElementById(id);

if (isEmbedded) document.documentElement.classList.add("emb");
