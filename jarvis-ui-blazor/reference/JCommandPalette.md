# JCommandPalette

Full-screen command overlay with live filtering and keyboard navigation (arrow keys, Enter, Escape); pure Blazor, no JS.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Visible` | `bool` | `false` | Whether the overlay is shown. Supports two-way binding. |
| `Commands` | `List<JCommand>` | `new()` | The command list to display/filter. |
| `Placeholder` | `string` | `"Type a command..."` | Search input placeholder text. |
| `IsListening` | `bool` | `false` | If true, shows a mic glyph (🎙) instead of the search glyph (⌕). |

## Events
| Event | Type | Description |
|---|---|---|
| `VisibleChanged` | `EventCallback<bool>` | Fires when the palette opens/closes (closing also fires it with `false`). Backs `@bind-Visible`. |
| `OnExecute` | `EventCallback<JCommand>` | Fires with the chosen command when executed (click or Enter). The palette then closes. |

## Content slots
(none — content is data-driven via `Commands`)

## Two-way binding
- `@bind-Visible` — binds overlay visibility. Uses `VisibleChanged`.

## Data model: `JCommand`
`record JCommand(string Label, string Key, string? Icon = null, string? Group = "General", JState State = JState.Active, string? Description = null)`

- `Label` — display text (filterable).
- `Key` — identifier (filterable).
- `Icon` — optional glyph.
- `Group` — section header used to group rows.
- `State` — `JState` (`JarvisUI.Tokens`); colors the row accent (Warning/Error/Success).
- `Description` — optional subtext (filterable).

Filtering is case-insensitive across `Label`, `Key`, and `Description`.

## Examples
### Basic
```razor
<JCommandPalette @bind-Visible="showPalette"
                 Commands="@commands"
                 OnExecute="HandleCommand" />

@code {
    private bool showPalette;
    private List<JCommandPalette.JCommand> commands = new()
    {
        new("Open Dashboard", "dashboard", "⊞", "Navigation"),
        new("Load Skills", "skills", "⚡", "System"),
    };
    private void HandleCommand(JCommandPalette.JCommand cmd) { /* ... */ }
}
```
### Realistic
```razor
<JCommandPalette @bind-Visible="showPalette"
                 Commands="@commands"
                 OnExecute="HandleCommand"
                 Placeholder="Speak or type a command..." />

@code {
    private bool showPalette;
    private List<JCommandPalette.JCommand> commands = new()
    {
        new("Open Dashboard", "dashboard", "⊞", "Navigation"),
        new("Load Skills", "skills", "⚡", "System"),
        new("Shutdown JARVIS", "shutdown", "⏻", "System", JState.Error, "Powers down all subsystems"),
    };

    private async Task HandleCommand(JCommandPalette.JCommand cmd)
    {
        // route on cmd.Key
        await Task.CompletedTask;
    }
}
```

## Use cases
- Keyboard-driven command launcher (Ctrl/Cmd+K style).
- Voice command UI (`IsListening` mic mode).
- Quick navigation/action menus.

## Notes
- Keyboard: ArrowUp/ArrowDown move selection, Enter executes the selected command, Escape closes.
- Clicking the backdrop closes the palette.
- Commands are grouped visually by `Group`; rows display group headers when the group changes.
- Filtering happens internally on the search box; there is no external query parameter.
