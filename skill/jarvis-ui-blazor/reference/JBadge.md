# JBadge

Small angular tag/badge with parallelogram, hexagonal, diamond or pill shapes, optional status dot and blink.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Color | JColor | `JColor.Cyan` | Accent color (Cyan/Amber/Red/Green/Ghost) |
| Size | JSize | `JSize.Sm` | Size scale (Xs/Sm/Md/Lg) |
| Shape | JBadge.JBadgeShape | `JBadgeShape.Angular` | Badge shape (Angular/Hex/Diamond/Pill) |
| State | JState | `JState.Active` | System state |
| Blink | bool | `false` | Apply blink animation |
| ShowDot | bool | `false` | Show a status dot before content |
| ChildContent | RenderFragment? | `null` | Badge content (default slot) |

## Content slots
- `ChildContent` (default slot) — badge label content; optional.

## Examples
### Basic
```razor
<JBadge Color="JColor.Cyan">Active</JBadge>
```
### Realistic
```razor
<JBadge Color="JColor.Red" Blink="true" ShowDot="true">ERROR</JBadge>
<JBadge Color="JColor.Amber" Shape="JBadge.JBadgeShape.Hex" Size="JSize.Md">WRN</JBadge>
```

## Use cases
- Inline status tags (Active / Warning / Error).
- Compact labels inside cards and tables.

## Notes
- `JBadgeShape` is a nested enum (`JBadge.JBadgeShape`) with values `Angular`, `Hex`, `Diamond`, `Pill`.
- `JColor.Ghost` renders a muted/dim badge.
- The status dot color follows `Color` (Amber/Red/Green).
