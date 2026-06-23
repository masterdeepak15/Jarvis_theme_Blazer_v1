# JStatusPill

Angular parallelogram status indicator with a diamond dot and state-driven pulse animation.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| State | JState | `JState.Active` | System state — drives color and pulse speed |
| Blink | bool | `false` | Apply slow blink animation |
| Text | string? | `null` | Pill text (alternative to ChildContent) |
| ChildContent | RenderFragment? | `null` | Pill content (default slot) |

## Content slots
- `ChildContent` (default slot) — pill label; optional (can use `Text` instead). Both are rendered if supplied.

## Examples
### Basic
```razor
<JStatusPill State="JState.Active">System Online</JStatusPill>
```
### Realistic
```razor
<JStatusPill State="JState.Warning">High Memory Usage</JStatusPill>
<JStatusPill State="JState.Error" Blink="true">Breach Detected</JStatusPill>
<JStatusPill State="JState.Idle" Text="Standby" />
```

## Use cases
- Header/system status line indicators.
- Live connection or service health labels.

## Notes
- Colors and dot pulse timing are derived from `State` (Active/Warning/Error/Success/Idle).
- `JState.Idle` disables the dot pulse animation.
