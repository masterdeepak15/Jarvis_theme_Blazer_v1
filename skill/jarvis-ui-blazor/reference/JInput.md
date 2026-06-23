# JInput

A HUD-style single-line text input with angular clip-path styling, corner-bracket accents, and a focus glow.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `string?` | `null` | Current text value. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<string?>` | — | Fired on input/change; backs `@bind-Value`. |
| Placeholder | `string` | `""` | Placeholder text. |
| Label | `string?` | `null` | Optional uppercase label above the input. |
| HelperText | `string?` | `null` | Optional helper text below the input. |
| Type | `string` | `"text"` | HTML input type (e.g. `text`, `password`, `email`). |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color (overridden by non-Active `State`). |
| State | `JState` (`JarvisUI.Tokens`) | `JState.Active` | Visual state; `Warning`/`Error`/`Success` change the accent. |
| Disabled | `bool` | `false` | Disables and dims the input. |
| MaxLength | `int` | `524288` | Max character length. |

## Events
- `ValueChanged` (`EventCallback<string?>`) — fired on both `oninput` and `onchange`; backs `@bind-Value`.

## Content slots
None.

## Two-way binding
`@bind-Value` (`string?`).

## Examples
### Basic
```razor
<JInput @bind-Value="command" Placeholder="Speak or type a command..." />

@code { private string? command; }
```
### Realistic
```razor
<JInput @bind-Value="accessCode"
        Label="Access code"
        Type="password"
        HelperText="6-digit clearance code"
        State="JState.Warning"
        MaxLength="6" />

@code { private string? accessCode; }
```

## Use cases
- Command bars, search fields, and password/access-code entry in HUD layouts.
- Form fields needing validation styling via `State`.

## Notes
- `State` accent takes priority over `Color` when set to `Warning`, `Error`, or `Success`.
