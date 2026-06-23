# JToggle

A HUD-style on/off toggle switch with an angular track and a sliding diamond thumb.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `bool` | `false` | On/off state. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<bool>` | — | Fired when toggled; backs `@bind-Value`. |
| Label | `string?` | `null` | Optional uppercase label beside the switch. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| Disabled | `bool` | `false` | Prevents toggling (shows not-allowed cursor). |

## Events
- `ValueChanged` (`EventCallback<bool>`) — backs `@bind-Value`.

## Content slots
None.

## Two-way binding
`@bind-Value` (`bool`).

## Examples
### Basic
```razor
<JToggle @bind-Value="isListening" Label="Listening" />

@code { private bool isListening; }
```
### Realistic
```razor
<JToggle @bind-Value="hudOverlay" Label="HUD Overlay" Color="JColor.Amber" />
<JToggle @bind-Value="muted" Label="Muted" Disabled="@(!hudOverlay)" />

@code {
    private bool hudOverlay = true;
    private bool muted;
}
```

## Use cases
- Boolean settings such as listening mode, overlays, and feature switches.

## Notes
- Clicking anywhere on the track or label toggles the value (unless disabled).
