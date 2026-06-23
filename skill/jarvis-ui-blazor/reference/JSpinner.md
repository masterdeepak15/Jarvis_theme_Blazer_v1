# JSpinner

Concentric rotating-ring loading spinner with a diamond center and optional inner label, with speed driven by state.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Size | string | `"64px"` | Spinner diameter (CSS length) |
| Color | JColor | `JColor.Cyan` | Accent color |
| State | JState | `JState.Active` | System state — drives ring rotation speeds |
| Label | string? | `null` | Optional label shown inside the spinner |
| ShowLabel | bool | `true` | Whether to render the label (when set) |

## Examples
### Basic
```razor
<JSpinner />
```
### Realistic
```razor
<JSpinner Size="80px"
          Label="JARVIS"
          State="JState.Processing"
          Color="JColor.Cyan" />

<JSpinner Size="40px" ShowLabel="false" Color="JColor.Amber" />
```

## Use cases
- Loading / processing indicator.
- Compact inline busy spinner (small `Size`, `ShowLabel="false"`).

## Notes
- Ring durations change with `State` (Processing = fast, Idle = slow).
- Label only renders when `ShowLabel` is true and `Label` is non-empty.
