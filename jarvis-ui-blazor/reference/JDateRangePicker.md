# JDateRangePicker

A pure-Blazor HUD-style date-range selector showing two side-by-side calendars with range highlighting, hover preview, and quick-range presets.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Start` | `DateTime?` | `null` | Range start date. Supports two-way binding via `@bind-Start`. |
| `End` | `DateTime?` | `null` | Range end date. Supports two-way binding via `@bind-End`. |
| `Color` | `JColor` | `JColor.Cyan` | Accent color token. |
| `Label` | `string?` | `null` | Uppercase label shown above the input trigger (only when `ShowInput`). |
| `ShowInput` | `bool` | `false` | When true, renders a clickable input trigger with the dual calendar as a dropdown; when false, the calendar is rendered inline. |

## Events
| Event | Type | Description |
|---|---|---|
| `StartChanged` | `EventCallback<DateTime?>` | Fired when the start date changes (powers `@bind-Start`). |
| `EndChanged` | `EventCallback<DateTime?>` | Fired when the end date changes (powers `@bind-End`). |

## Two-way binding
- `@bind-Start` (DateTime?) — `Start` + `StartChanged`.
- `@bind-End` (DateTime?) — `End` + `EndChanged`.

## Examples
### Basic
```razor
<JDateRangePicker @bind-Start="_start" @bind-End="_end" />

@code {
    private DateTime? _start;
    private DateTime? _end;
}
```
### Realistic
```razor
<JDateRangePicker @bind-Start="_start" @bind-End="_end"
                  ShowInput="true" Label="MISSION WINDOW" />

@code {
    private DateTime? _start = DateTime.Today;
    private DateTime? _end = DateTime.Today.AddDays(7);
}
```

## Use cases
- Selecting a start/end date window for reports, filters, or scheduling.
- Quick presets: WEEK, 30 DAYS, 90 DAYS, THIS MONTH.

## Notes
- First click sets the start (and clears end); the next click sets the end. Clicking a date before the current start restarts the selection.
- Shows the inclusive day count (e.g. "8 DAYS") when both dates are set.
- Closes on focus-out (150 ms delay).
