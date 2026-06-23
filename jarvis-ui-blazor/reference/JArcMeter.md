# JArcMeter

Segmented arc level meter (default 6 arcs) that illuminates based on an input level, for mic/audio level or signal strength.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Level | int | `0` | Active level (0–TotalArcs) |
| TotalArcs | int | `6` | Total number of arc segments |
| Color | JColor | `JColor.Cyan` | Accent color |
| Orientation | JArcMeter.JArcOrientation | `JArcOrientation.Horizontal` | Layout direction (Horizontal/Vertical) |
| ShowLabel | bool | `false` | Show the label above the arcs |
| Label | string | `"LEVEL"` | Label text |
| ShowValue | bool | `false` | Show numeric `Level / TotalArcs` readout |
| ArcWidth | string | `"8px"` | Width of each arc segment |
| ArcGap | string | `"3px"` | Gap between arc segments |

## Examples
### Basic
```razor
<JArcMeter Level="@micLevel" />
```
### Realistic
```razor
<JArcMeter Level="4"
           TotalArcs="6"
           ShowLabel="true"
           Label="MIC"
           ShowValue="true"
           Color="JColor.Amber"
           Orientation="JArcMeter.JArcOrientation.Vertical" />
```

## Use cases
- Microphone / audio input level indicator.
- Signal strength or discrete gauge readout.

## Notes
- `JArcOrientation` is a nested enum (`JArcMeter.JArcOrientation`) with values `Horizontal` and `Vertical`.
- The top (peak) active segment pulses and gets a brighter glow.
