# JBootScreen

A full-screen cinematic 5-phase startup overlay (scanline, corner brackets, typing boot log, spinner, ready state) that runs once on render then fires `OnComplete`.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| SystemName | `string` | `"JARVIS"` | System name shown during boot and in the ready state. |
| Version | `string` | `"v4.2.1"` | Version string shown in the ready state ("· ONLINE"). |
| Duration | `int` | `4000` | Intended total boot duration in milliseconds. |

## Events
- `OnComplete` (`EventCallback`) — invoked after the sequence finishes and the overlay hides.

## Examples
### Basic
```razor
<JBootScreen OnComplete="HandleBootComplete" />

@code {
    void HandleBootComplete() { /* show app */ }
}
```
### Realistic
```razor
@if (_booting)
{
    <JBootScreen SystemName="JARVIS" Version="v4.2.1" OnComplete="@(() => _booting = false)" />
}
else
{
    <MainApp />
}

@code { private bool _booting = true; }
```

## Use cases
- App-launch splash for a JARVIS-themed application.
- Triggered automatically by `JPageLayout` when `ShowBootScreen="true"`.

## Notes
- `JarvisUI.Tokens` used: `JColor`, `JState` (internally, for the embedded spinner/state).
- Composes `JSpinner` and a bottom `JHudBar`; implements `IDisposable`.
- The sequence runs in `OnAfterRenderAsync` (first render only) via `Task.Delay` phases; the `Duration` parameter is exposed but the built-in phase delays drive actual timing. Conditionally render it and hide it in `OnComplete` so it plays only once.
