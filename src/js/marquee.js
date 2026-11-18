import { byId } from "./env.js";

export const KEYWORDS = [
  "Customer support", "Home appliances", "CRM", "Graphic design",
  "Real estate", "Malayalam news", "Sales",
];

export function buildMarquee(el = byId("mq"), words = KEYWORDS) {
  el.innerHTML = [...words, ...words].map((x) => `<span>${x}</span>`).join(" ");
}
