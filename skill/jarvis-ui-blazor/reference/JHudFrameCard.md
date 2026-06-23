# JHudFrameCard

A decorative angular HUD card with one of four cinematic frame styles (Alpha/Beta/Gamma/Delta), an optional title with status dot, an ID label, and a content body.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| FrameStyle | `JHudFrameCard.FrameType` | `FrameType.Alpha` | Frame variant: `Alpha`, `Beta`, `Gamma`, or `Delta`. |
| Color | `JColor` | `JColor.Cyan` | Accent color token. |
| Title | `string?` | `null` | Title label (top-left); hidden if blank. |
| FrameId | `string?` | `null` | ID label shown bottom-right; hidden if blank. |
| ShowStatusDot | `bool` | `true` | Show a status dot before the title. |
| Width | `string` | `"100%"` | CSS width of the card. |
| Height | `string` | `"100%"` | CSS height of the card. |
| CustomStyle | `string?` | `null` | Extra inline CSS appended to the card. |

## Content slots
- `ChildContent` (RenderFragment) — card body content (default slot).

## Examples
### Basic
```razor
<JHudFrameCard FrameStyle="JHudFrameCard.FrameType.Alpha" Title="ZONE-4">
    Your content
</JHudFrameCard>
```
### Realistic
```razor
<JHudFrameCard FrameStyle="JHudFrameCard.FrameType.Delta"
               Color="JColor.Amber"
               Title="REACTOR"
               FrameId="ID-0x4F"
               Width="420px" Height="260px">
    <div>Core temperature: 312K</div>
</JHudFrameCard>
```

## Use cases
- Framed panels/tiles in a HUD dashboard grid.
- Highlighting a discrete data zone with a sci-fi border treatment.

## Notes
- `JarvisUI.Tokens` used: `JColor`, plus `JarvisClasses.Color()` helper.
- `FrameType` is a nested enum: reference as `JHudFrameCard.FrameType.Alpha` etc.
- Each frame style swaps in different corner/rail/scan decorations driven entirely by CSS classes; supply your own `Width`/`Height` since defaults are `100%`.
