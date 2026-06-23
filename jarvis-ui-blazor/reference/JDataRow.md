# JDataRow

A single key → optional animated fill bar → value row for use inside cards and panels.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`) — relies on `.j-data-row`/`.j-data-key`/`.j-data-bar`/`.j-data-val` classes.

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Key` | `string` | `""` | Label shown on the left. |
| `Value` | `string` | `""` | Value shown on the right. |
| `BarPercent` | `int?` | `null` | If set, renders a fill bar at this percentage (0–100). |
| `Color` | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color (declared parameter). |
| `State` | `JState` (`JarvisUI.Tokens`) | `JState.Active` | Colors the bar fill and value text (Warning/Error/Success). |

## Events
(none)

## Content slots
(none — text-only via `Key`/`Value`)

## Examples
### Basic
```razor
<JDataRow Key="Uptime" Value="4h 32m" />
```
### Realistic
```razor
<JAccordion Title="System" DefaultOpen="true">
    <JDataRow Key="CPU" Value="74%" BarPercent="74" />
    <JDataRow Key="Memory" Value="91%" BarPercent="91" State="JState.Warning" />
    <JDataRow Key="Model" Value="llama3" BarPercent="80" Color="JColor.Green" />
</JAccordion>
```

## Use cases
- Key/value stat rows inside cards, panels, and accordions.
- Progress/usage indicators (CPU, memory, disk) via `BarPercent`.

## Notes
- The fill bar only appears when `BarPercent` has a value; it sets a `--j-w` CSS variable to the percentage.
- `State` drives both the bar gradient and the value text color; `Active` uses the default theme accent.
