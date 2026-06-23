# JSlider

A HUD-style range slider with a skewed angular track, accent fill, glowing diamond thumb, and optional ticks/value/min-max labels.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `double` | `0` | Current value. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<double>` | — | Fired on input; backs `@bind-Value`. |
| Min | `double` | `0` | Minimum value. |
| Max | `double` | `100` | Maximum value. |
| Step | `double` | `1` | Step increment. |
| Label | `string?` | `null` | Optional uppercase label above the track. |
| Unit | `string` | `""` | Suffix appended to the displayed value (e.g. `%`, `°C`). |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| ShowValue | `bool` | `true` | Shows the current value (with `Unit`) next to the label. |
| ShowTicks | `bool` | `false` | Shows tick marks above the track. |
| ShowMinMax | `bool` | `false` | Shows Min/Max labels below the track. |
| TickCount | `int` | `10` | Number of tick segments when `ShowTicks` is true. |
| Disabled | `bool` | `false` | Disables the slider. |

## Events
- `ValueChanged` (`EventCallback<double>`) — fired on `oninput` when the value parses as a double; backs `@bind-Value`.

## Content slots
None.

## Two-way binding
`@bind-Value` (`double`).

## Examples
### Basic
```razor
<JSlider @bind-Value="volume" Label="Volume" Min="0" Max="100" />

@code { private double volume = 50; }
```
### Realistic
```razor
<JSlider @bind-Value="temp"
         Label="Thermostat"
         Min="0" Max="40" Step="0.5"
         Unit="°C"
         Color="JColor.Amber"
         ShowValue="true"
         ShowTicks="true"
         ShowMinMax="true"
         TickCount="8" />

@code { private double temp = 21; }
```

## Use cases
- Numeric controls such as volume, brightness, temperature, and thresholds.

## Notes
- The visible fill/thumb position is clamped to the `Min`–`Max` range.
- A native `range` input sits invisibly on top to capture drag input.
