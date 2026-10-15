# Ravel FC

Website for Ravel FC (2026). Plain HTML, CSS and JavaScript with GSAP, ScrollTrigger and Lenis for the animations. No build step.

## Folder

```
ravel-fc/
├── index.html
├── logo.png          <- add the crest here
├── css/style.css
├── js/
│   ├── main.js       <- players, squad, lineup, pop-up
│   ├── effects.js    <- GSAP animations
│   └── vendor/       <- gsap, ScrollTrigger, lenis (local copies)
└── photos/           <- add player photos here
```

## Photos

Put them in `photos/` named by player: `Khazar.png`, `Javad.png`, `Onur.png`, `Kanan.png`, `Artoghrul.png`, `Fateh.png`, `Ali.png`, `Rasul.png`.
`.jpg`, `.jpeg` and `.webp` work too. Missing photos show an outlined number instead.

## Edit players

Open `js/main.js` and change the `players` list at the top (name, position, number, pitch position).

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Put it on GitHub Pages

1. Create a repo and upload everything in this folder (keep the structure).
2. Repo Settings > Pages > Source: Deploy from a branch > `main` / `(root)` > Save.
3. After a minute the site is live at `https://<username>.github.io/<repo>/`.

## Credits

GSAP (gsap.com), Lenis (lenis.studiofreight.com), fonts from Google Fonts.
