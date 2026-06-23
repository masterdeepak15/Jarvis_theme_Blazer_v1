# JBarChart

Pure-SVG, zero-JS bar chart (vertical or horizontal) themed with CSS variables.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Data | `List<JChartPoint>` | `new()` | **EditorRequired.** Bars to render (one per point). |
| Height | `string` | `"220px"` | CSS height of the chart wrapper. |
| ColorVar | `string` | `"--j-accent"` | CSS custom property used for the bar fill (falls back to `--j-accent`). |
| Orientation | `JChartOrientation` | `Vertical` | `Vertical` or `Horizontal` bars. |
| ShowGrid | `bool` | `true` | Reserved grid toggle (grid lines always drawn in vertical mode). |
| ShowAxisLabels | `bool` | `true` | Show axis tick/category labels. |
| ShowValues | `bool` | `false` | Print the numeric value on/near each bar. |
| GridLines | `int` | `4` | Number of grid divisions. |

## Data models
`JChartPoint(string Label, double Value)` — `Label` is the category, `Value` the bar magnitude. Values auto-formatted (K/M suffixes).

## Examples
### Basic
```razor
<JBarChart Data="@_pts" />

@code {
    List<JChartPoint> _pts = new()
    {
        new("Mon", 12), new("Tue", 19), new("Wed", 7), new("Thu", 15)
    };
}
```
### Realistic
```razor
<JBarChart Data="@_revenue"
           Height="260px"
           Orientation="JChartOrientation.Horizontal"
           ColorVar="--j-ok"
           ShowValues="true"
           GridLines="5" />

@code {
    List<JChartPoint> _revenue = new()
    {
        new("Q1", 142_000), new("Q2", 198_500),
        new("Q3", 176_000), new("Q4", 231_000)
    };
}
```

## Use cases
- Category comparisons (sales by region, counts by status).
- Compact dashboard tiles where a JS charting lib would be overkill.
- Horizontal layout for long category labels.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- Bar fill uses `var(ColorVar, var(--j-accent))`; pass any theme token name.
