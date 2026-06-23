---
name: jarvis-ui-blazor
description: >-
  Use this skill whenever building UI in a Blazor (.NET / C# / Razor) project with
  the JarvisUI component library — the cinematic JARVIS / HUD / sci-fi tactical
  theme. Trigger on any mention of a J-prefixed Blazor component (JButton, JCard,
  JStatCard, JOrb, JModal, JTable, JPageLayout, JThemeProvider, JToast, JArcMeter,
  JRadialMenu, JCommandPalette, JBootScreen, JGaugeChart, JLineChart, JDonutChart,
  JSparkline, JGoogleMap, JLeafletMap, JNodeGraph, and the other 50+ J* components),
  and also when the user says "JarvisUI", "jarvis theme", "HUD dashboard in Blazor",
  "tactical/sci-fi Blazor UI", or wants to install the `JarvisUI` NuGet package into
  a Blazor Server or Blazor WebAssembly app and build screens with it. Prefer this
  skill over hand-writing CSS for any HUD/dashboard/control-panel UI in Blazor.
  This is the BLAZOR/.NET library — not the separate React `@masterdeepak15/jarvis-ui`.
---

# JarvisUI for Blazor

JarvisUI is a HUD-style Blazor component library (a Razor Class Library, RCL) with
**53 components** — cards, buttons, forms, charts, maps, layout shells, and animated
HUD widgets — in a cinematic "JARVIS" / tactical sci-fi aesthetic. It works in both
**Blazor Server** and **Blazor WebAssembly**, ships its own CSS/JS (no npm/Node), and
is driven entirely by C# enums (design tokens) plus a runtime theme system.

Live demo: https://jarvis-theme-blazer.vercel.app/ · NuGet: `JarvisUI` ·
Source: https://github.com/masterdeepak15/Jarvis_theme_Blazer_v1

## When you use this skill

1. **Install** the package and wire up CSS + services (see Installation).
2. **Pick components** from the catalog below; read the matching `reference/<Component>.md`
   for its exact parameters, events, and copy-paste examples before writing code.
3. **Compose** screens using the design tokens (`JColor`, `JState`, `JCardStyle`, …) and
   the theme system — never hand-roll colors or animations; the tokens carry the look.
4. **Verify** the project builds (`dotnet build`) and the CSS bundle the screen needs
   (core / charts / maps) is referenced.

Always consult the per-component reference file rather than guessing parameter names —
the API is enum-driven and the exact enum members matter (e.g. `JCardStyle.Notched`,
not `"notched"`).

---

## Installation

### 1. Add the package

```bash
dotnet add package JarvisUI
```

Or reference the project directly if working inside this repo:

```xml
<ProjectReference Include="..\JarvisUI\JarvisUI.csproj" />
```

### 2. Register services (`Program.cs`)

```csharp
builder.Services.AddJarvisUI();

// Optional — override global defaults:
builder.Services.AddJarvisUI(o =>
{
    o.DefaultColor       = JColor.Cyan;
    o.AnimSpeed          = JAnimSpeed.Normal;
    o.DefaultCardStyle   = JCardStyle.Notched;
    o.DefaultButtonShape = JButtonShape.LeftNotch;
});
```

`AddJarvisUI()` registers the scoped `JToastService` and a named `HttpClient`
("JarvisUI") used by `JLeafletMap`. In **Blazor WebAssembly** also register a
default `HttpClient` if your app doesn't already (see `reference/JLeafletMap.md`).

### 3. Reference the CSS bundles

In `App.razor` / `_Layout.cshtml` / `index.html` `<head>`. Order matters — theme first:

```html
<!-- Always required -->
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-theme.css" />
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-ui.css" />

<!-- Only if you use chart components (J*Chart, JSparkline) -->
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-charts.css" />

<!-- Only if you use map components (JGoogleMap, JLeafletMap) -->
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-maps.css" />
```

JS for maps is loaded from `_content/JarvisUI/js/` — see the map reference files for
the exact `<script>` tags and any third-party CDN (Leaflet, Google Maps) requirements.

### 4. Add global usings (`_Imports.razor`)

```razor
@using JarvisUI.Components
@using JarvisUI.Components.Charts
@using JarvisUI.Tokens
```

### 5. Wrap your app once

```razor
<JThemeProvider Preset="JThemePreset.Cyan">
    <JToastProvider />
    @* your app / router here *@
</JThemeProvider>
```

`JThemeProvider` writes the theme CSS variables to `:root`. `JToastProvider` must be
present once (anywhere in the body) for `JToastService` notifications to render.

---

## Design tokens (the language of the library)

Every component is configured with these enums instead of raw CSS. Read
`reference/_tokens.md` for the full token reference. Quick map:

| Enum | Members | Drives |
|---|---|---|
| `JColor` | Cyan, Blue, Amber, Red, Green, Ghost, White | accent color ramp |
| `JState` | Idle, Active, Processing, Warning, Error, Success | color + animation intensity |
| `JSize` | Xs, Sm, Md, Lg, Xl | component height/padding |
| `JVariant` | Solid, Outline, Ghost, Danger, Scan | fill/border style |
| `JCardStyle` | CornerBracket, Notched, SideRail, GlowBorder, PartialBorder, DangerPulse, Hexagonal, Radar, DoubleFrame | card frame (9 designs) |
| `JButtonShape` | LeftNotch, RightNotch, BothNotch, Parallelogram, GhostSkew, BracketFrame, Hexagonal, IconSquare, ScanFull | button geometry (9 shapes) |
| `JAnimSpeed` | Off, Slow, Normal, Fast | animation speed (Off = reduced motion) |
| `JThemePreset` | Cyan, Amber, Green, Red, Purple, White, Custom | preset theme |

## Theme system

- **Preset:** `<JThemeProvider Preset="JThemePreset.Amber">` — six built-ins.
- **Live switching:** drop `<JThemePicker />` anywhere for a color-swatch switcher.
- **Custom:** build a `JarvisTheme { Accent="#a855f7", Bg="#050010", … }` and pass it.
- **Plain CSS override:** set `--j-accent`, `--j-bg`, `--j-notch-lg`, etc. on `:root`.

See `reference/_theming.md` for the full theme model, every CSS variable, and recipes.

---

## Component catalog

Read `reference/<Name>.md` for each before use. Grouped by purpose:

**Layout & shell** — `JPageLayout` (full app shell), `JSidebar`, `JNavItem`,
`JHudBar`, `JHudFrame`, `JHudFrameCard`, `JHudLabel`, `JDivider`, `JBootScreen`.

**Cards** — `JCard` (9 styles), `JStatCard` (metric card with bar).

**Buttons & badges** — `JButton` (9 shapes), `JBadge`, `JStatusPill`.

**Identity / HUD widgets** — `JOrb` (the JARVIS sphere), `JArcMeter`, `JSpinner`,
`JWaveform`, `JRadialMenu` + `JRadialItem`.

**Forms** — `JInput`, `JTextArea`, `JSelect`, `JToggle`, `JSlider`, `JCheckbox`,
`JRadio`, `JFormField`, `JDatePicker`, `JDateRangePicker`, `JTimePicker`.

**Feedback** — `JAlert`, `JModal`, `JProgress`, `JToast` + `JToastProvider`
(+ injectable `JToastService`).

**Navigation** — `JTabs` + `JTab`, `JAccordion`, `JCommandPalette`, `JThemeProvider`,
`JThemePicker`.

**Data** — `JTable`, `JDataRow`, `JPagination`, `JNodeGraph`.

**Charts** (need `jarvis-charts.css`) — `JBarChart`, `JLineChart`, `JDonutChart`,
`JRadarChart`, `JGaugeChart`, `JSparkline`.

**Maps** (need `jarvis-maps.css` + JS) — `JGoogleMap`, `JLeafletMap`, `JMapInfoWindow`.

---

## Common recipes

**Fixed-viewport dashboard** (window never scrolls; only panels do):

```razor
<JPageLayout SystemName="JARVIS" Version="v1.0" State="JState.Active" ShowBootScreen="true">
    <SidebarNav>
        <JNavItem Href="/"        Icon="⊞" Label="Dashboard" Active="true" />
        <JNavItem Href="/skills"  Icon="⚡" Label="Skills" Badge="12" />
        <JNavItem Href="/config"  Icon="⚙" Label="Settings" />
    </SidebarNav>
    <MainContent>
        <div class="j-dashboard-grid" style="grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;">
            <JStatCard Title="CPU"    Value="74%" Style="JCardStyle.GlowBorder" BarValue="74" />
            <JStatCard Title="Memory" Value="91%" Style="JCardStyle.DangerPulse" State="JState.Warning" BarValue="91" />
            <JCard Style="JCardStyle.Notched" Title="Telemetry">@* … *@</JCard>
            <JCard Style="JCardStyle.Radar"   Title="Scan">@* … *@</JCard>
        </div>
    </MainContent>
</JPageLayout>
```

**Form with validation:**

```razor
<JFormField Label="Command" Required="true" Error="@err">
    <JInput @bind-Value="cmd" Placeholder="Type or speak..." />
</JFormField>
<JToggle @bind-Value="listening" Label="Voice listening" />
<JButton Shape="JButtonShape.LeftNotch" OnClick="Execute">Execute</JButton>
```

**Toast from code-behind:**

```razor
@inject JToastService Toast
@code {
    void Save() => Toast.Show("Saved", JState.Success);
}
```

---

## Working rules

- **Read the reference file** for any component before emitting it — parameter names,
  required `RenderFragment` slots (e.g. `SidebarNav`, `MainContent`, `FooterContent`),
  and `@bind-Value` support vary per component.
- **Use tokens, not strings** — pass `JColor.Amber`, never `"amber"`.
- **Match the CSS bundle to the components** — charts and maps need their extra CSS/JS.
- **One `JThemeProvider` and one `JToastProvider`** for the whole app.
- **Server vs WASM:** components are identical; only service/HttpClient wiring and the
  CSS host page differ. `JLeafletMap` has WASM-specific notes in its reference file.
- After generating a screen, confirm it compiles and the right bundles are linked.
