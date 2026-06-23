# JOrb

Centerpiece identity orb with concentric animated rings, system-name label, state-driven ring speeds and a click-to-toggle listening indicator.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| SystemName | string | `"JARVIS"` | Name shown in the orb center |
| Size | string | `"160px"` | Orb diameter (CSS length) |
| Color | JColor | `JColor.Cyan` | Accent color |
| State | JState | `JState.Active` | System state — drives ring speeds and state label |
| Listening | bool | `false` | Whether the listening indicator is lit |

## Events
| Event | Type | Description |
|---|---|---|
| OnClick | EventCallback | Fired when the orb (or its indicator) is clicked |

## Examples
### Basic
```razor
<JOrb SystemName="JARVIS" State="JState.Active" />
```
### Realistic
```razor
<JOrb SystemName="JARVIS"
      State="@(_busy ? JState.Processing : JState.Active)"
      Size="200px"
      Color="JColor.Cyan"
      Listening="@_listening"
      OnClick="ToggleListen" />
```

## Use cases
- Main voice-assistant centerpiece.
- Animated status hero element on a HUD dashboard.

## Notes
- Ring rotation speeds change with `State` (Processing = fast, Idle = slow).
- The state label auto-derives from `State`; in the default case it shows "Listening" when `Listening` is true, otherwise "Online".
- The indicator button stops click propagation but still invokes `OnClick`.
