# JButton

Angular HUD button with 9 distinct shapes, variants, sizes, icon support and pure-CSS animations.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Shape | JButtonShape | `JButtonShape.LeftNotch` | Button shape — one of 9 designs |
| Variant | JVariant | `JVariant.Outline` | Visual variant (Outline/Solid/Ghost/Danger/Scan) |
| Color | JColor | `JColor.Cyan` | Accent color |
| Size | JSize | `JSize.Md` | Size scale (Xs–Xl) |
| AnimSpeed | JAnimSpeed | `JAnimSpeed.Normal` | Animation speed scale |
| Label | string? | `null` | Text label (alternative to ChildContent) |
| Icon | string? | `null` | Icon glyph/text |
| IconPosition | JButton.JIconPosition | `JIconPosition.Left` | Icon placement (`Left` or `Right`) |
| ShowShine | bool | `true` | Show animated shine overlay (notch/parallelogram/scan shapes) |
| Disabled | bool | `false` | Disable the button |
| StopPropagation | bool | `false` | Stop click event propagation |
| Type | string | `"button"` | Native button `type` attribute |
| ChildContent | RenderFragment? | `null` | Button content (default slot) |

The 9 `JButtonShape` values: `JButtonShape.LeftNotch`, `JButtonShape.RightNotch`, `JButtonShape.BothNotch`, `JButtonShape.BracketFrame`, `JButtonShape.Parallelogram`, `JButtonShape.GhostSkew`, `JButtonShape.Hexagonal`, `JButtonShape.IconSquare`, `JButtonShape.ScanFull`.

## Events
| Event | Type | Description |
|---|---|---|
| OnClick | EventCallback | Fired when the button is clicked |

## Content slots
- `ChildContent` (default slot) — button label content; optional (can use `Label` or `Icon` instead).

## Examples
### Basic
```razor
<JButton Shape="JButtonShape.LeftNotch" OnClick="HandleClick">Execute</JButton>
```
### Realistic
```razor
<JButton Shape="JButtonShape.Parallelogram"
         Variant="JVariant.Danger"
         Color="JColor.Red"
         Size="JSize.Lg"
         Icon="⚠"
         IconPosition="JButton.JIconPosition.Left"
         OnClick="Shutdown">
    Shutdown
</JButton>

<JButton Shape="JButtonShape.IconSquare" Icon="⚙" OnClick="OpenSettings" />
```

## Use cases
- Primary/secondary HUD action buttons.
- Icon-only square buttons (`JButtonShape.IconSquare`).
- Full-width scan buttons (`JButtonShape.ScanFull`).

## Notes
- `JIconPosition` is a nested enum (`JButton.JIconPosition`).
- If `Icon` is set and no `Label`/`ChildContent`, the icon is rendered as the sole content.
- `Variant == JVariant.Danger` adds the `j-state-error` class to the root.
