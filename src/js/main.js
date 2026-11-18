import "./env.js";
import { splitHeroLetters, startRoleTyping } from "./hero.js";
import { buildMarquee } from "./marquee.js";
import { initReveals } from "./reveal.js";
import { initTilt } from "./tilt.js";
import { initScrollEngine } from "./scroll.js";
import { initPhotoFriction } from "./protect.js";

splitHeroLetters();
startRoleTyping();
buildMarquee();
initReveals();
initTilt();
initScrollEngine();
initPhotoFriction();
