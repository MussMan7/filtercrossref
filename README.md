# FilterCrossRef

Residential HVAC / furnace air-filter size & OEM compatibility directory.
Plain HTML + CSS + a small JS finder. No build step, no trackers.

**Live (GitHub Pages):** https://mussman7.github.io/filtercrossref/

## Layout

- `index.html` — hub + size finder
- `assets/` — `style.css`, `finder.js`
- `guides/nominal-vs-actual/` — evergreen explainer
- `sizes/{WxLxD}/` — size pages with sourced actual dimensions
- `oem/{brand}/{part}/` — OEM cartridge / cabinet pages

## Local preview

```bash
python3 -m http.server 8080
```

Links are relative (`…/index.html`), so pages also open from disk.
