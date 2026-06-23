# JCheckbox

A HUD-style checkbox with an angular clip-path box, corner brackets, and a diamond tick when checked.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `bool` | `false` | Checked state. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<bool>` | — | Fired on change; backs `@bind-Value`. |
| Label | `string?` | `null` | Optional text label beside the box. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| Disabled | `bool` | `false` | Disables and dims the checkbox. |

## Events
- `ValueChanged` (`EventCallback<bool>`) — backs `@bind-Value`.

## Content slots
None.

## Two-way binding
`@bind-Value` (`bool`).

## Examples
### Basic
```razor
<JCheckbox @bind-Value="isEnabled" Label="Enable voice commands" />

@code { private bool isEnabled; }
```
### Realistic
```razor
<JCheckbox @bind-Value="autoStart" Label="Auto-start on boot" Color="JColor.Amber" />
<JCheckbox @bind-Value="telemetry" Label="Send telemetry" Disabled="@(!autoStart)" />

@code {
    private bool autoStart = true;
    private bool telemetry;
}
```

## Use cases
- Boolean opt-in options in settings and forms.

## Notes
- The whole label area is clickable; a native (hidden) checkbox handles change events.
