# JGaugeChart

Pure-SVG, zero-JS half-arc gauge with needle, ticks and min/max labels, themed with CSS variables.

**Namespace:** `JarvisUI.Components.Charts`
**Requires:** core CSS + `jarvis-charts.css`

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `double` | `0` | **EditorRequired.** Current value (clamped between Min and Max). |
| Min | `double` | `0` | Scale minimum. |
| Max | `double` | `100` | Scale maximum. |
| Size | `string` | `"200px"` | CSS width. |
| ColorVar | `string` | `"--j-accent"` | CSS custom property for value arc, needle and hub. |
| Thickness | `double` | `14` | Arc stroke width (SVG units). |
| Label | `string` | `""` | Caption under the centre value. |
| DisplayValue | `string?` | `null` | Override text shown in the centre (defaults to formatted `Value`). |
| ShowNeedle | `bool` | `true` | Draw the needle and centre hub. |
| ShowTicks | `bool` | `true` | Draw tick marks around the arc. |
| ShowMinMax | `bool` | `true` | Show min/max labels at the arc ends. |
| Ticks | `int` | `8` | Number of tick divisions. |

## Data models
None — consumes a single scalar `Value` against `Min`/`Max`.

## Examples
### Basic
```razor
<JGaugeChart Value="72" />
```
### Realistic
```razor
<JGaugeChart Value="@_power"
             Min="0" Max="100"
             Size="200px"
             Label="REACTOR"
             DisplayValue="@($"{_power}%")"
             ColorVar="--j-warn"
             Ticks="10" />

@code {
    double _power = 87;
}
```

## Use cases
- Single-metric KPIs (utilisation, battery, score, load).
- HUD status dials where a needle reads more intuitively than a number.

## Notes
- Reference both core JarvisUI CSS and `_content/JarvisUI/css/jarvis-charts.css`. No JS required.
- Use `DisplayValue` to show units/percent strings while keeping `Value` numeric for the arc.
