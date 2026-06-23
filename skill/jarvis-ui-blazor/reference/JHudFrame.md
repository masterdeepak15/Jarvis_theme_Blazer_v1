# JHudFrame

A full-screen HUD wrapper that overlays animated corner brackets and connecting edge lines around your content, with optional top and bottom `JHudBar`s.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Color | `JColor` | `JColor.Cyan` | Accent color passed to the embedded HUD bars. |
| SystemLabel | `string?` | `"JARVIS · SYS"` | Label shown in the top HUD bar. |
| ShowTop | `bool` | `true` | Render the top `JHudBar`. |
| ShowBottom | `bool` | `true` | Render the bottom `JHudBar`. |
| ShowDots | `bool` | `true` | Show marching dots in the top bar. |
| ShowLive | `bool` | `false` | Show LIVE indicator in the top bar. |
| ShowWaveform | `bool` | `false` | Show waveform in the bottom bar. |
| ShowTicks | `bool` | `false` | Show tick bars in the bottom bar. |
| ShowRec | `bool` | `false` | Show REC indicator in the bottom bar. |
| ContentPadding | `string` | `"16px"` | CSS padding for the main content region. |

## Content slots
- `ChildContent` (RenderFragment) — main content rendered inside the frame (default slot).
- `TopContent` (RenderFragment) — extra content injected into the top HUD bar.
- `BottomContent` (RenderFragment) — extra content injected into the bottom HUD bar.

## Examples
### Basic
```razor
<JHudFrame SystemLabel="JARVIS · SYS">
    <p>Main content</p>
</JHudFrame>
```
### Realistic
```razor
<JHudFrame Color="JColor.Cyan"
           SystemLabel="MARK II · ONLINE"
           ShowLive="true"
           ShowBottom="true" ShowWaveform="true" ShowTicks="true"
           ContentPadding="24px">
    <TopContent><span class="j-text-xs">SECTOR 7</span></TopContent>
    <ChildContent>
        <h1>Telemetry</h1>
    </ChildContent>
</JHudFrame>
```

## Use cases
- Cinematic full-screen overlay framing for a whole page or app.
- Wrapping content that needs animated corner brackets plus top/bottom HUD bars.

## Notes
- `JarvisUI.Tokens` used: `JColor`.
- Composes two `JHudBar` instances; corner-bracket animation (`j-corner-blink`) comes from the core CSS.
- When supplying the default content alongside named bar slots, wrap it explicitly in `<ChildContent>` (Razor requires all-named slots once one named slot is used).
