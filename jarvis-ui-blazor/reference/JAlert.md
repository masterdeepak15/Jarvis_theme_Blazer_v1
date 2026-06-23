# JAlert

An inline alert/notification panel with a state-driven accent rail, icon, optional title, dismiss button, and optional blink.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `State` | `JState` | `JState.Active` | Drives accent color and icon. `Warning` (⚠), `Error` (✕), `Success` (✓), `Idle`/`Active` (ℹ). `Error` and `Warning` also pulse the rail. |
| `Title` | `string?` | `null` | Optional bold uppercase title line. |
| `Text` | `string?` | `null` | Plain-text message (rendered after `ChildContent`). |
| `Dismissible` | `bool` | `false` | Shows a ✕ dismiss button that hides the alert. |
| `Blink` | `bool` | `false` | Applies the `j-blink-slow` class for a slow blink. |
| `ChildContent` | `RenderFragment?` | `null` | Rich message content (the default slot). |

## Events
| Event | Type | Description |
|---|---|---|
| `OnDismiss` | `EventCallback` | Fired after the user dismisses the alert. |

## Content slots
- `ChildContent` (default slot) — message body. Either `ChildContent` or `Text` (or both) should be provided.

## Examples
### Basic
```razor
<JAlert State="JState.Active">JARVIS is online and listening.</JAlert>
```
### Realistic
```razor
<JAlert State="JState.Warning" Title="MEMORY" Dismissible="true" OnDismiss="OnAlertClosed">
    High memory usage detected on core node.
</JAlert>

@code {
    private void OnAlertClosed() { /* log dismissal */ }
}
```

## Use cases
- Showing inline status, warning, error, or success messages within a page.
- Dismissible banners for transient notices.

## Notes
- Uses `JarvisUI.Tokens.JState` for color/icon selection.
- Dismissal is internal (sets local `_visible = false`); the component is not bindable. Use `OnDismiss` to react.
