# JHudBar

A horizontal top or bottom HUD strip rendering marching dots, an expanding accent line, optional tick bars, waveform, system label, and LIVE/REC blinkers.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Position | `JHudBar.JHudBarPosition` | `JHudBarPosition.Top` | Top or Bottom bar styling (`Top` / `Bottom`). |
| Color | `JColor` | `JColor.Cyan` | Accent color token. |
| AnimSpeed | `JAnimSpeed` | `JAnimSpeed.Normal` | Animation speed token. |
| SystemLabel | `string?` | `null` | Optional leading label text; hidden if blank. |
| ShowDots | `bool` | `true` | Show the marching-dot sequence. |
| ShowWaveform | `bool` | `false` | Show the animated waveform. |
| ShowTicks | `bool` | `false` | Show the tick-bar row plus pulse dot. |
| ShowLive | `bool` | `false` | Show a blinking "● LIVE" label. |
| ShowRec | `bool` | `false` | Show a blinking red "● REC" label. |
| TickCount | `int` | `16` | Total number of tick bars rendered. |
| TickActive | `int` | `12` | Number of leading ticks shown as active. |
| WaveformFlex | `string` | `"1"` | CSS flex value for the waveform container. |
| WaveformMaxWidth | `string` | `"260px"` | CSS max-width for the waveform container. |

## Content slots
- `ChildContent` (RenderFragment) — extra inline content placed in the bar (default slot).

## Examples
### Basic
```razor
<JHudBar Position="JHudBar.JHudBarPosition.Top" SystemLabel="JARVIS · SYS" ShowLive="true" />
```
### Realistic
```razor
<JHudBar Position="JHudBar.JHudBarPosition.Bottom"
         Color="JColor.Cyan"
         ShowWaveform="true"
         ShowTicks="true"
         ShowRec="true"
         WaveformMaxWidth="200px">
    <span class="j-text-xs">CH-04</span>
</JHudBar>
```

## Use cases
- Fixed top/bottom chrome for a HUD layout (used internally by `JPageLayout`, `JHudFrame`, `JBootScreen`).
- A status strip showing live/recording state and signal activity.

## Notes
- `JarvisUI.Tokens` used: `JColor`, `JAnimSpeed`, plus the `JarvisClasses.Color()` / `JarvisClasses.AnimSpeed()` helpers.
- `JHudBarPosition` is a nested enum: reference it as `JHudBar.JHudBarPosition.Top` / `.Bottom`.
- Ticks and waveform are typically used on the bottom bar; dots/label/LIVE on the top bar.
