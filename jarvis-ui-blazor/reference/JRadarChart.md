# JRadarChart

Pure-SVG, zero-JS radar / spider chart themed with CSS variables.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Axes | `List<JRadarAxis>` | `new()` | **EditorRequired.** One spoke/axis per entry. |
| Size | `string` | `"200px"` | CSS width/height (square). |
| ColorVar | `string` | `"--j-accent"` | CSS custom property for the data polygon fill/stroke and dots. |
| Rings | `int` | `4` | Number of concentric web rings. |
| ShowLabels | `bool` | `true` | Render the axis labels around the perimeter. |

## Data models
`JRadarAxis(string Label, double Value, double Max = 100)` — each axis scales independently: the plotted radius is `Value / Max` (clamped to 1.0). A minimum of 3 axes is enforced internally for geometry.

## Examples
### Basic
```razor
<JRadarChart Axes="@_axes" />

@code {
    List<JRadarAxis> _axes = new()
    {
        new("Speed", 80), new("Power", 65), new("Range", 90),
        new("Armor", 55), new("Stealth", 70)
    };
}
```
### Realistic
```razor
<JRadarChart Axes="@_skills"
             Size="240px"
             ColorVar="--j-ok"
             Rings="5" />

@code {
    List<JRadarAxis> _skills = new()
    {
        new("Attack",  42, 50),
        new("Defense", 38, 50),
        new("Magic",   29, 50),
        new("Speed",   46, 50),
        new("Luck",    21, 50),
        new("HP",      48, 50)
    };
}
```

## Use cases
- Multi-attribute comparisons (skill profiles, product scorecards).
- Capability/coverage radars on HUD dashboards.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- Use per-axis `Max` to normalise mixed-scale metrics onto the same web.
