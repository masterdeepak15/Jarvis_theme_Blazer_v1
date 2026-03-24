# JarvisUI — Getting Started

## What's in this package

```
JarvisUI.sln              ← Open in Visual Studio or Rider
JarvisUI/                 ← The RCL component library
JarvisUI.Docs/            ← Live docs playground (run to explore components)
```

---

## Run the Docs App

```bash
cd JarvisUI.Docs
dotnet run
# Open https://localhost:5001
# Switch themes live using the panel at the bottom of the sidebar
```

---

## Add to your Blazor Server app

### 1. Reference
```xml
<ProjectReference Include="..\JarvisUI\JarvisUI.csproj" />
```

### 2. Register services
```csharp
builder.Services.AddJarvisUI();
```

### 3. Add CSS (both files required)
```html
<!-- App.razor <head> — order matters -->
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-theme.css" />
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-ui.css" />
```

### 4. Add imports
```razor
@using JarvisUI.Components
@using JarvisUI.Tokens
```

### 5. Wrap app with theme provider
```razor
@* App.razor or MainLayout.razor *@
<JThemeProvider Preset="JThemePreset.Cyan">
    <JPageLayout SystemName="JARVIS" Version="v4">
        <SidebarNav>
            <JNavItem Href="/" Icon="⊞" Label="Dashboard" Active="true" />
        </SidebarNav>
        <MainContent>@Body</MainContent>
    </JPageLayout>
</JThemeProvider>
```

---

## Theme System

### Built-in presets
```razor
<JThemeProvider Preset="JThemePreset.Cyan" />    @* Default — JARVIS blue *@
<JThemeProvider Preset="JThemePreset.Amber" />   @* Industrial orange *@
<JThemeProvider Preset="JThemePreset.Green" />   @* Matrix / military *@
<JThemeProvider Preset="JThemePreset.Red" />     @* Danger / critical *@
<JThemeProvider Preset="JThemePreset.Purple" />  @* Neon purple *@
<JThemeProvider Preset="JThemePreset.White" />   @* High-contrast light *@
```

### Live theme switching (built-in picker)
```razor
@* Add anywhere — shows color swatches *@
<JThemePicker @bind-Preset="_preset" Provider="_provider" />
```

### Fully custom theme
```csharp
var myTheme = new JarvisTheme {
    Accent      = "#a855f7",   // your main HUD color
    AccentMid   = "#c084fc",
    AccentDim   = "#7c3aed",
    Bg          = "#050010",   // root background
    BgCard      = "#080018",   // card background
    TextPrimary = "#faf5ff",
    Warn        = "#f97316",
    Err         = "#ef4444",
    Ok          = "#22c55e",
};
```

### CSS variable override (plain CSS)
```css
/* In your own stylesheet — overrides everything instantly */
:root {
  --j-accent:     #a855f7;
  --j-bg:         #050010;
  --j-bg-card:    #080018;
  --j-dur-scan:   2s;          /* scan line speed */
  --j-dur-pulse:  1.5s;        /* glow pulse speed */
  --j-notch-lg:   24px;        /* corner cut depth */
}
```

### All CSS variables
| Variable | Default | Purpose |
|---|---|---|
| `--j-accent` | `#00e5ff` | Primary HUD color |
| `--j-accent-mid` | `#22d3ee` | Slightly dimmer accent |
| `--j-accent-dim` | `#0e7490` | Dark accent |
| `--j-accent-deep` | `#0891b2` | Deepest accent |
| `--j-accent-05..70` | auto | Opacity layers |
| `--j-warn` | `#f97316` | Warning color |
| `--j-err` | `#ef4444` | Error / danger color |
| `--j-ok` | `#22c55e` | Success color |
| `--j-bg` | `#020d18` | Root background |
| `--j-bg-card` | `#030f1e` | Card background |
| `--j-text-primary` | `#e0f7ff` | Primary text |
| `--j-text-secondary` | `#94a3b8` | Secondary text |
| `--j-text-muted` | `#475569` | Muted / label text |
| `--j-dur-scan` | `3.5s` | Scan line duration |
| `--j-dur-pulse` | `2.8s` | Glow pulse duration |
| `--j-dur-spin` | `4s` | Rotation duration |
| `--j-notch` | `14px` | Small corner notch |
| `--j-notch-lg` | `20px` | Large corner notch |

---

## Layout — Fixed Viewport

The layout never scrolls at the window level. Only individual panels scroll.

```
┌──────────────────────────────┐  ← j-hud-bar-top (fixed)
├──────────┬───────────────────┤
│ SIDEBAR  │  MAIN CONTENT     │  ← flex:1, min-h:0
│ (fixed)  │  (j-scroll)       │    Content scrolls here
├──────────┴───────────────────┤
│  BOTTOM HUD BAR (fixed)      │
└──────────────────────────────┘
```

Use `j-dashboard-grid` for fixed-height panel layouts that fill the content area:

```razor
<MainContent>
  <div class="j-dashboard-grid" style="grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;">
    <JCard Style="JCardStyle.Notched">Panel 1</JCard>
    <JCard Style="JCardStyle.SideRail">Panel 2</JCard>
    <JStatCard Title="CPU" Value="74%" Style="JCardStyle.GlowBorder" />
    <JCard Style="JCardStyle.CornerBracket">Panel 4</JCard>
  </div>
</MainContent>
```

---

## Requirements
- .NET 8.0 SDK
- Blazor Server (not WASM)
- No JavaScript required
- No npm / Node required
