# JProgress

A progress indicator with two styles: an angular skewed fill bar (with optional indeterminate animation) or a tick-segment row.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Value` | `int` | `0` | Progress percentage, 0–100. |
| `Label` | `string?` | `null` | Uppercase label shown above the bar. |
| `Color` | `JColor` | `JColor.Cyan` | Accent color token. |
| `State` | `JState` | `JState.Active` | Tints the tick segments: `Warning` (amber), `Error` (red), `Success` (green). |
| `ProgressStyle` | `JProgress.JProgressStyle` | `JProgressStyle.Bar` | `Bar` or `Ticks`. Enum is nested in this component. |
| `Indeterminate` | `bool` | `false` | Bar-style only: shows a sweeping indeterminate animation instead of a fixed fill. |
| `ShowPercent` | `bool` | `true` | Shows the percentage next to the label (hidden when `Indeterminate`). |
| `Total` | `int` | `16` | Number of tick segments (Ticks style only). |

## Examples
### Basic
```razor
<JProgress Value="72" Label="System Load" />
```
### Realistic
```razor
<JProgress Value="cpu" Label="CPU" State="@(cpu > 85 ? JState.Error : JState.Active)" />
<JProgress Value="92" ProgressStyle="JProgress.JProgressStyle.Ticks" Total="20" State="JState.Warning" />
<JProgress Indeterminate="true" Label="Processing..." />

@code { private int cpu = 91; }
```

## Use cases
- Showing determinate progress (downloads, system load) as a bar or tick meter.
- Indeterminate "working" state with a sweeping animation.

## Notes
- `JProgressStyle` is a public enum declared inside this component; reference it as `JProgress.JProgressStyle.Bar` / `.Ticks`.
- Uses `JarvisUI.Tokens.JState` and `JColor`.
