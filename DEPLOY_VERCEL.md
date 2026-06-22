# Deploying JarvisUI Docs to Vercel

This repo's `JarvisUI.Docs.Wasm` project is a **Blazor WebAssembly** build of the
component showcase — it compiles to static files Vercel can serve. (The original
`JarvisUI.Docs` is Blazor *Server* and **cannot** run on Vercel; it's left intact
for local use.)

## How it works

Vercel's build image has no .NET, so `vercel-build.sh` installs the .NET 8 SDK at
build time, runs `dotnet publish`, and Vercel serves the published
`output/wwwroot` as a static site. Config lives in `vercel.json`.

---

## 🔐 First: rotate the leaked GitHub token

A Personal Access Token was pasted in plain text earlier — treat it as public.
**Revoke it now:** GitHub → Settings → Developer settings → Personal access tokens
→ revoke that token. Create a fresh one only if you need it, and never paste it
into a chat. Vercel connects to GitHub via OAuth (a "Connect GitHub" button) — you
won't need to paste a token at all for the normal flow below.

---

## Option A — Connect the GitHub repo (recommended)

1. Push this branch to GitHub:
   ```bash
   git push origin wasm-vercel        # or merge to main and push main
   ```
2. Go to https://vercel.com/new → **Import** the `Jarvis_theme_Blazer_v1` repo
   (authorize via GitHub OAuth if prompted).
3. Vercel reads `vercel.json` automatically. Confirm these (already set):
   - **Build Command:** `bash vercel-build.sh`
   - **Output Directory:** `output/wwwroot`
   - **Framework Preset:** Other
4. Click **Deploy**. First build takes ~2–4 min (it downloads the .NET SDK).
5. You get a `https://<project>.vercel.app` URL. Pushes to the branch auto-deploy.

## Option B — Vercel CLI from your machine

```bash
npm i -g vercel
vercel login
vercel --prod          # run from the repo root
```

---

## ⚠️ Google Maps API key

`wwwroot/index.html` ships a Google Maps JS key in the browser (it always must be
client-side). Before sharing the URL publicly:

1. Google Cloud Console → APIs & Services → Credentials → that key.
2. Add an **HTTP referrer restriction** for `https://<your-project>.vercel.app/*`
   (and `http://localhost:*` for local dev).
3. Restrict it to the **Maps JavaScript API** only.

The Leaflet map (India drill-down) needs no key — it uses OpenStreetMap tiles.

---

## Optional hardening

- **Subresource Integrity (SRI):** add `integrity="sha384-…" crossorigin="anonymous"`
  to the Leaflet `<link>`/`<script>` tags in `index.html` for CDN-tamper protection.
  (Google Maps can't use SRI — its URL returns dynamic content.)
- **Faster/smaller builds:** add `dotnet workload install wasm-tools` to
  `vercel-build.sh` before the publish step to enable IL trimming/relinking.

---

## Build & test locally

```bash
# run the WASM app locally (hot dev server)
dotnet run --project JarvisUI.Docs.Wasm

# produce the exact static bundle Vercel serves
dotnet publish JarvisUI.Docs.Wasm/JarvisUI.Docs.Wasm.csproj -c Release -o output
# -> static files in output/wwwroot
```
