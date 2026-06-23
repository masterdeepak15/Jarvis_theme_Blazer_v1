# JTimePicker

A pure-Blazor HUD-style time picker with scrollable hour/minute/second columns, optional AM/PM toggle, and an optional input trigger.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Value` | `TimeSpan?` | `null` | The selected time. Supports two-way binding via `@bind-Value`. |
| `Color` | `JColor` | `JColor.Cyan` | Accent color token. |
| `Label` | `string?` | `null` | Uppercase label shown above the input trigger (only when `ShowInput`). |
| `Placeholder` | `string` | `"SELECT TIME"` | Text shown in the input trigger when no time is selected. |
| `ShowInput` | `bool` | `false` | When true, renders a clickable input trigger with the panel as a dropdown; when false, the panel is rendered inline. |
| `ShowSeconds` | `bool` | `true` | Shows the seconds column. |
| `Use24Hour` | `bool` | `true` | 24-hour mode; when false, shows a 12-hour grid plus an AM/PM toggle. |
| `Width` | `string` | `"240px"` | Width of the input trigger (only applies when `ShowInput`). |

## Events
| Event | Type | Description |
|---|---|---|
| `ValueChanged` | `EventCallback<TimeSpan?>` | Fired when the selected time changes (powers `@bind-Value`). |

## Two-way binding
- `@bind-Value` (TimeSpan?) — `Value` + `ValueChanged`.

## Examples
### Basic
```razor
<JTimePicker @bind-Value="_time" />

@code { private TimeSpan? _time; }
```
### Realistic
```razor
<JTimePicker @bind-Value="_time"
             ShowInput="true"
             Label="MISSION TIME"
             ShowSeconds="false"
             Use24Hour="false"
             Width="220px" />

@code { private TimeSpan? _time = new TimeSpan(14, 30, 0); }
```

## Use cases
- Picking a time of day (with or without seconds) inline or as a dropdown field.
- Supporting 12-hour (AM/PM) or 24-hour input.

## Notes
- Selecting any column value commits immediately (fires `ValueChanged`); the NOW button sets the current time, CLEAR sets null.
- In 12-hour mode the AM/PM toggle re-maps the stored 24-hour value accordingly.
- Closes on focus-out (150 ms delay).
