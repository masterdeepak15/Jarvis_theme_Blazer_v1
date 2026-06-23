# JTextArea

A HUD-style multi-line text input with angular corner brackets, optional line count, and an optional character counter.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `string?` | `null` | Current text value. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<string?>` | — | Fired on input; backs `@bind-Value`. |
| Placeholder | `string` | `""` | Placeholder text. |
| Label | `string?` | `null` | Optional uppercase label above the textarea. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| Rows | `int` | `4` | Visible text rows. |
| Disabled | `bool` | `false` | Disables and dims the textarea. |
| ShowLineCount | `bool` | `false` | Shows a line count next to the label (when Label and Value are set). |
| MaxLength | `int` | `int.MaxValue` | Max character length; a `current / max` counter shows when this is below `int.MaxValue`. |

## Events
- `ValueChanged` (`EventCallback<string?>`) — backs `@bind-Value`.

## Content slots
None.

## Two-way binding
`@bind-Value` (`string?`). The textarea uses `@bind` with `oninput`, so binding updates as you type.

## Examples
### Basic
```razor
<JTextArea @bind-Value="prompt" Label="Command input" Rows="4" />

@code { private string? prompt; }
```
### Realistic
```razor
<JTextArea @bind-Value="notes"
           Label="Mission log"
           Placeholder="Enter log entry..."
           Rows="6"
           ShowLineCount="true"
           MaxLength="500" />

@code { private string? notes; }
```

## Use cases
- Multi-line command prompts, mission/notes logs, and free-form text entry.
- Inputs needing a visible line or character count.

## Notes
- The character counter appears only when `MaxLength` is set below `int.MaxValue`.
- The textarea is vertically resizable by the user.
