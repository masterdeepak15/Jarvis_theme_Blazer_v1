# JDatePicker

A pure-Blazor HUD-style single-date picker with a month/year-navigable calendar grid, optional input trigger, and quick selectors.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Value` | `DateTime?` | `null` | The selected date. Supports two-way binding via `@bind-Value`. |
| `MinDate` | `DateTime?` | `null` | Earliest selectable date; earlier days are disabled. |
| `MaxDate` | `DateTime?` | `null` | Latest selectable date; later days are disabled. |
| `Color` | `JColor` | `JColor.Cyan` | Accent color token. |
| `Label` | `string?` | `null` | Uppercase label shown above the input trigger (only when `ShowInput`). |
| `Placeholder` | `string` | `"SELECT DATE"` | Text shown in the input trigger when no date is selected. |
| `ShowInput` | `bool` | `false` | When true, renders a clickable input trigger and shows the calendar as a dropdown; when false, the calendar is always rendered inline. |
| `ShowQuick` | `bool` | `true` | Shows the TODAY / CLEAR (and CLOSE when `ShowInput`) quick buttons. |
| `Width` | `string` | `"280px"` | Width of the input trigger (only applies when `ShowInput`). |

## Events
| Event | Type | Description |
|---|---|---|
| `ValueChanged` | `EventCallback<DateTime?>` | Fired when the selected date changes (powers `@bind-Value`). |

## Two-way binding
- `@bind-Value` (DateTime?) — `Value` + `ValueChanged`.

## Examples
### Basic
```razor
<JDatePicker @bind-Value="_date" />

@code { private DateTime? _date; }
```
### Realistic
```razor
<JDatePicker @bind-Value="_date"
             ShowInput="true"
             Label="MISSION DATE"
             MinDate="DateTime.Today"
             MaxDate="DateTime.Today.AddDays(30)"
             Width="300px" />

@code { private DateTime? _date = DateTime.Today; }
```

## Use cases
- Selecting a single date inline (dashboard filters) or as a dropdown field.
- Constraining selection to a range with `MinDate`/`MaxDate`.

## Notes
- With `ShowInput="false"` the calendar is always visible (inline mode) and never closes.
- Closes automatically on focus-out (with a 150 ms delay so click events fire first).
