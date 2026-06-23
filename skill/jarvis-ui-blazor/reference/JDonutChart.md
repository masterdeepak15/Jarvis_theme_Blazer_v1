# JDonutChart

Pure-SVG, zero-JS donut chart with optional centre value and legend, themed with CSS variables.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Data | `List<JDonutSegment>` | `new()` | **EditorRequired.** Segments of the donut. |
| Size | `string` | `"160px"` | CSS width (chart is square). |
| Thickness | `double` | `20` | Ring stroke width (SVG units, 0–100 viewBox). |
| CenterValue | `string` | `""` | Big value shown in the centre. |
| CenterLabel | `string` | `""` | Small label under the centre value. |
| ShowLegend | `bool` | `true` | Render the per-segment legend with percentages. |

## Data models
`JDonutSegment(string Label, double Value, string? Color = null)` — `Color` is any CSS color (defaults to `var(--j-accent)` when null). Percentages are computed from the sum of all `Value`s.

## Examples
### Basic
```razor
<JDonutChart Data="@_segs" />

@code {
    List<JDonutSegment> _segs = new()
    {
        new("Active", 60), new("Idle", 25), new("Error", 15)
    };
}
```
### Realistic
```razor
<JDonutChart Data="@_traffic"
             Size="200px"
             Thickness="24"
             CenterValue="341"
             CenterLabel="TOTAL"
             ShowLegend="true" />

@code {
    List<JDonutSegment> _traffic = new()
    {
        new("Direct",  142, "var(--j-accent)"),
        new("Search",  121, "var(--j-ok)"),
        new("Social",   48, "var(--j-warn)"),
        new("Referral", 30, "var(--j-err)")
    };
}
```

## Use cases
- Part-to-whole breakdowns (status mix, traffic sources, budget split).
- KPI tiles where a centre total plus legend reads at a glance.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- If `CenterLabel` is empty but `CenterValue` is set, only the value is shown (vertically centred).
