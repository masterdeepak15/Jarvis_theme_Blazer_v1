# JToast

A single toast notification item (state-colored, with accent rail, icon, optional title, message, and auto-dismiss progress bar) rendered internally by `JToastProvider`.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Model` | `JToastModel` | `default!` (required) | The toast data: `Title`, `Message`, `State` (`JState`), `Duration` (ms), `Id`. |
| `OnDismiss` | `EventCallback` | — | Fired when the toast is dismissed (by click or after `Duration` elapses). |

## Events
| Event | Type | Description |
|---|---|---|
| `OnDismiss` | `EventCallback` | Raised on click-to-dismiss or when the auto-dismiss timer fires. |

## Examples
### Basic
You normally do NOT render `JToast` directly. Trigger toasts through the injected service; `JToastProvider` renders the `JToast` items for you.

```razor
@inject JToastService Toast

<JButton OnClick="@(() => Toast.Show("Saved.", JState.Success))">Save</JButton>
```
### Realistic
```razor
@inject JToastService Toast

@code {
    private void OnError(string detail)
    {
        Toast.Show(detail, JState.Error);     // simple message + state
        // Title/Message/Duration are carried on the JToastModel the service builds.
    }
}
```

## Use cases
- Internal building block for the toast system; emitted one-per-active-toast by `JToastProvider`.

## Notes
- Color and icon come from `Model.State` (`JarvisUI.Tokens.JState`): Warning (⚠), Error (✕), Success (✓), else info (ℹ).
- Auto-dismisses after `Model.Duration` ms via a `System.Timers.Timer` (only when `Duration > 0`); clicking the toast also dismisses it. The component implements `IDisposable` to clean up the timer.
- Prefer driving toasts via `JToastService` + `JToastProvider` rather than instantiating `JToast` yourself. `AddJarvisUI()` registers `JToastService`.
