# JWaveform

Animated audio waveform visualizer rendering a configurable row of pulsing bars.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| BarCount | int | `20` | Number of bars to render |
| Height | string | `"32px"` | Overall waveform height (CSS length) |
| Color | JColor | `JColor.Cyan` | Accent color |
| Active | bool | `true` | When false, bars collapse, pause animation, and dim |

## Examples
### Basic
```razor
<JWaveform />
```
### Realistic
```razor
<JWaveform BarCount="30"
           Height="40px"
           Color="JColor.Amber"
           Active="@_micActive" />
```

## Use cases
- Mic / audio activity visualization.
- Decorative animated bottom-bar element on a HUD.

## Notes
- Setting `Active="false"` flattens bars to 15% scale, pauses the animation, and lowers opacity to 0.3.
- Bar heights and animation durations cycle through fixed internal patterns based on bar index.
