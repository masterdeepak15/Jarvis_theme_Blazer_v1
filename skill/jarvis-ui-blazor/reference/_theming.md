# Theming — `JThemeProvider`, `JarvisTheme`, CSS variables

The theme system writes CSS custom properties to `:root`. Wrap your app once in
`<JThemeProvider>`; everything inside inherits the theme.

## 1. Built-in presets — `JThemePreset`
`Cyan` (default, JARVIS blue) · `Amber` (industrial orange) · `Green` (matrix/military) ·
`Red` (danger/critical) · `Purple` (neon) · `White` (high-contrast light) · `Custom`.

```razor
<JThemeProvider Preset="JThemePreset.Amber">
    @* app *@
</JThemeProvider>
```

## 2. Live theme switching — `JThemePicker`
```razor
<JThemePicker @bind-Preset="_preset" Provider="_provider" />
```
Renders color swatches; binding updates the active theme at runtime. (See
`reference/JThemePicker.md` for exact parameters.)

## 3. Fully custom theme — `JarvisTheme`
Build a `JarvisTheme` and feed it to the provider. Key properties (all are hex strings
unless noted):

```csharp
var myTheme = new JarvisTheme {
    Name        = "Neon",
    Accent      = "#a855f7",   // main HUD color — drives borders, glows, icons
    AccentMid   = "#c084fc",
    AccentDim   = "#7c3aed",
    AccentDeep  = "#6d28d9",
    Warn        = "#f97316",
    Err         = "#ef4444",
    Ok          = "#22c55e",
    Bg          = "#050010",   // root background
    BgCard      = "#080018",   // card background
    BgCardAlt   = "#0a001e",
    TextPrimary = "#faf5ff",
    TextSecondary = "#94a3b8",
    TextMuted   = "#475569",
    TextDim     = "#334155",
    // animation durations (CSS time strings)
    DurScan = "3.5s", DurPulse = "2.8s", DurSpin = "4s", DurShine = "2.4s", DurCorner = "3.0s",
    // shape
    Notch = "14px", NotchLg = "20px", RailW = "3px",
};
```

`JarvisTheme.FromPreset(JThemePreset.Purple)` returns a ready preset you can tweak.
`theme.ToCss()` emits the full `:root { … }` block (the provider does this for you).
Opacity ramps (`--j-accent-05` … `--j-accent-70`) are auto-derived from `Accent`.

## 4. Plain-CSS override (no C#)
Set variables on `:root` in your own stylesheet — overrides everything instantly:

```css
:root {
  --j-accent:    #a855f7;
  --j-bg:        #050010;
  --j-bg-card:   #080018;
  --j-dur-scan:  2s;     /* scan line speed */
  --j-dur-pulse: 1.5s;   /* glow pulse speed */
  --j-notch-lg:  24px;   /* corner cut depth */
}
```

## Full CSS variable reference
| Variable | Default | Purpose |
|---|---|---|
| `--j-accent` | `#00e5ff` | primary HUD color |
| `--j-accent-mid` | `#22d3ee` | dimmer accent |
| `--j-accent-dim` | `#0e7490` | dark accent |
| `--j-accent-deep` | `#0891b2` | deepest accent |
| `--j-accent-05..70` | auto | opacity layers (5–70%) |
| `--j-warn` | `#f97316` | warning |
| `--j-err` | `#ef4444` | error/danger |
| `--j-ok` | `#22c55e` | success |
| `--j-bg` | `#020d18` | root background |
| `--j-bg-card` | `#030f1e` | card background |
| `--j-bg-card-alt` | `#04111f` | alt card background |
| `--j-text-primary` | `#e0f7ff` | primary text |
| `--j-text-secondary` | `#94a3b8` | secondary text |
| `--j-text-muted` | `#475569` | muted / label text |
| `--j-text-dim` | `#334155` | dimmest text |
| `--j-border` / `-dim` / `-mid` / `-full` | auto | border opacity ramps |
| `--j-dur-scan` | `3.5s` | scan line duration |
| `--j-dur-pulse` | `2.8s` | glow pulse duration |
| `--j-dur-spin` | `4s` | rotation duration |
| `--j-dur-shine` | `2.4s` | shine sweep duration |
| `--j-dur-corner` | `3.0s` | corner animation duration |
| `--j-notch` | `14px` | small corner notch |
| `--j-notch-lg` | `20px` | large corner notch |
| `--j-rail-w` | `3px` | side-rail width |
