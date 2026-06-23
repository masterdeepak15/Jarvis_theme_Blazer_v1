# JLineChart

Pure-SVG, zero-JS line/area chart themed with CSS variables.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Data | `List<JChartPoint>` | `new()` | **EditorRequired.** Ordered points (left-to-right). |
| Height | `string` | `"200px"` | CSS height of the chart wrapper. |
| ColorVar | `string` | `"--j-accent"` | CSS custom property for line/area/dot color. |
| ShowArea | `bool` | `false` | Fill the area under the line. |
| ShowDots | `bool` | `true` | Draw a dot at each data point. |
| ShowAxisLabels | `bool` | `true` | Show X labels and Y grid value labels. |
| ShowGrid | `bool` | `true` | Draw horizontal grid lines. |
| GridLines | `int` | `4` | Number of grid divisions. |

## Data models
`JChartPoint(string Label, double Value)` — Y axis auto-scales to the min/max of `Value`; labels render along the X axis. Values auto-formatted (K/M).

## Examples
### Basic
```razor
<JLineChart Data="@_pts" />

@code {
    List<JChartPoint> _pts = new()
    {
        new("00:00", 30), new("06:00", 45),
        new("12:00", 80), new("18:00", 60)
    };
}
```
### Realistic
```razor
<JLineChart Data="@_cpu"
            Height="180px"
            ShowArea="true"
            ColorVar="--j-warn"
            GridLines="5" />

@code {
    List<JChartPoint> _cpu = new()
    {
        new("T-5", 22), new("T-4", 41), new("T-3", 67),
        new("T-2", 58), new("T-1", 73), new("now", 49)
    };
}
```

## Use cases
- Time series / trend visualisation (CPU, traffic, temperature).
- Area mode for cumulative or volume-style metrics.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- Needs at least 2 points to draw the line/area; a single point only renders its dot.
