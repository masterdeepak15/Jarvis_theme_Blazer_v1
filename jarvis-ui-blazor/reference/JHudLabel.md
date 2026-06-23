# JHudLabel

A sci-fi callout/label element with five visual styles (Chip, Callout, Circuit, Badge, Panel) for tagging values, lower-thirds, and annotated HUD readouts.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| LabelStyle | `JHudLabel.LabelType` | `LabelType.Chip` | Visual style: `Chip`, `Callout`, `Circuit`, `Badge`, or `Panel`. |
| Color | `JColor` | `JColor.Cyan` | Accent color token. |
| Text | `string` | `""` | Main text/label. |
| SubText | `string?` | `null` | Secondary text (used by Callout and Panel styles). |
| Value | `string?` | `null` | Value text (used by Chip/Circuit/Badge/Panel styles). |
| ShowDot | `bool` | `true` | Show the leading pip/dot (Chip style). |
| ShowLine | `bool` | `true` | Show the connecting line/arm (Chip/Callout/Circuit styles). |
| Animate | `bool` | `true` | Enable entrance/scan animation (accepted by the component). |
| CustomStyle | `string?` | `null` | Extra inline CSS applied to the root element. |

## Examples
### Basic
```razor
<JHudLabel Text="UPLOAD" LabelStyle="JHudLabel.LabelType.Chip" />
```
### Realistic
```razor
<JHudLabel Text="NH-90 ITS" SubText="HARIDWAR" LabelStyle="JHudLabel.LabelType.Callout" Color="JColor.Cyan" />
<JHudLabel Text="SENSOR-04" Value="99.8%" LabelStyle="JHudLabel.LabelType.Circuit" />
<JHudLabel Text="CONNECT" Value="90" LabelStyle="JHudLabel.LabelType.Badge" />
```

## Use cases
- Overlay annotations / lower-thirds on a HUD or map.
- Tagging sensors, zones, or metrics with a styled chip or badge.

## Notes
- `JarvisUI.Tokens` used: `JColor`, plus `JarvisClasses.Color()` helper.
- `LabelType` is a nested enum: reference as `JHudLabel.LabelType.Chip` etc.
- Which fields apply depends on style: `SubText` is for Callout/Panel; `Value` for Chip/Circuit/Badge/Panel; for Badge, `Value` falls back to `Text` if not set.
