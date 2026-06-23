# JSparkline

Tiny inline SVG sparkline with auto-detected trend coloring (up=green, down=red, flat=accent), zero JS.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Data | `List<double>` | `new()` | **EditorRequired.** Raw values (no labels). |
| Width | `string` | `"80px"` | CSS width of the inline element. |
| Height | `string` | `"28px"` | CSS height. |
| ShowArea | `bool` | `true` | Fill the area under the line. |
| ShowTrend | `bool` | `false` | Append a trend glyph (▲/▼/─) next to the line. |
| Trend | `JSparkTrend` | `Auto` | Force a trend, or `Auto` to detect from the data. |
| ColorVar | `string?` | `null` | Override color var; when null, derived from trend (`--j-ok`/`--j-err`/`--j-accent`). |

## Data models
Consumes `List<double>` directly. `JSparkTrend` enum: `Auto`, `Up`, `Down`, `Flat`. With `Auto`, the last value vs first (±5% of range) decides Up/Down/Flat.

## Examples
### Basic
```razor
<JSparkline Data="@_vals" />

@code {
    List<double> _vals = new() { 4, 6, 5, 8, 7, 9, 11 };
}
```
### Realistic
```razor
<span>Revenue
    <JSparkline Data="@_rev"
                Width="120px" Height="24px"
                ShowTrend="true"
                ShowArea="true" />
</span>

@code {
    List<double> _rev = new() { 120, 118, 125, 131, 128, 140, 152 };
}
```

## Use cases
- Inline micro-trends inside tables, KPI cards or list rows.
- Quick at-a-glance direction indicator next to a metric.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- Renders as an inline-block `<span>`, so it sits naturally beside text.
