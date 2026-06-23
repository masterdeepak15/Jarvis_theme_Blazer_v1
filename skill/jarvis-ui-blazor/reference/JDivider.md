# JDivider

A themed horizontal or vertical separator line with an optional centered diamond dot or uppercase label.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Orientation | `JDivider.JDividerOrientation` | `JDividerOrientation.Horizontal` | `Horizontal` or `Vertical`. |
| Color | `JColor` | `JColor.Cyan` | Accent color token. |
| Label | `string?` | `null` | Centered label text (horizontal only); when set it replaces the dot. |
| ShowDot | `bool` | `true` | Show the centered diamond dot (when no label). |
| Height | `string` | `"40px"` | CSS height of the vertical divider. |
| Margin | `string` | `"8px 0"` | CSS margin for the horizontal divider container. |
| Opacity | `string` | `"0.30"` | Opacity of the gradient lines. |

## Examples
### Basic
```razor
<JDivider />
```
### Realistic
```razor
<JDivider Label="System Config" Color="JColor.Cyan" />
<JDivider Orientation="JDivider.JDividerOrientation.Vertical" Height="60px" />
```

## Use cases
- Separating sections of a panel or form.
- Vertical separator between inline HUD elements.

## Notes
- `JarvisUI.Tokens` used: `JColor`.
- `JDividerOrientation` is a nested enum: reference as `JDivider.JDividerOrientation.Horizontal` / `.Vertical`.
- `Label` only renders in horizontal orientation; vertical dividers only support the dot.
