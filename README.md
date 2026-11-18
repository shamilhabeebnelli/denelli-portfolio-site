# denelli-portfolio-site

Personal portfolio of Shamil Habeeb, live at https://www.denelli.in. Plain HTML, CSS and JavaScript (ES modules). No framework, no runtime dependencies.

## How it is organised
- `src/index.html`: page markup template
- `src/css/`: styles split by area (base, hero, stats and about, journey, grids, reveal and embed mode, photo friction)
- `src/js/`: ES modules (`env`, `hero`, `marquee`, `reveal`, `tilt`, `scroll`, `protect`, `main`)
- `scripts/build.mjs`: bundles the CSS and JS into one self-contained `index.html` at the repo root, which is what the host serves
- `tests/`: Node test runner checks for structure, links, assets, accessibility basics and contact details
- Images and icons sit in the repo root next to `index.html`

## Commands
```
npm run build   # regenerates index.html from src/
npm test        # runs the checks
npm run lint    # ESLint
```

## Notes
- Respects `prefers-reduced-motion`.
- Photos have casual-save friction only (no drag, no right-click menu). It does not stop screenshots or direct image URLs.
- The root `index.html` is generated. Edit files in `src/` and rebuild.
