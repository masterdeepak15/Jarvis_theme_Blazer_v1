# JThemePicker

Visual theme switcher with preset swatches and an optional custom accent/background/card color picker; works standalone or wired to a `JThemeProvider`.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Preset` | `JThemePreset` (`JarvisUI.Tokens`) | `JThemePreset.Cyan` | Currently selected preset. Supports two-way binding. |
| `Provider` | `JThemeProvider?` | `null` | Optional reference to a `JThemeProvider` for live switching. |
| `Compact` | `bool` | `false` | Icon-only mode (small swatches, no labels, no custom section). |
| `ShowCustom` | `bool` | `true` | Show the custom accent/background/card color section (hidden in Compact mode). |

## Events
| Event | Type | Description |
|---|---|---|
| `PresetChanged` | `EventCallback<JThemePreset>` | Fires when a preset (or custom) is selected. Backs `@bind-Preset`. |

## Content slots
(none)

## Two-way binding
- `@bind-Preset` — binds the selected `JThemePreset`. Uses `PresetChanged`.

## Examples
### Basic
```razor
<JThemePicker @bind-Preset="currentPreset" />

@code {
    private JThemePreset currentPreset = JThemePreset.Cyan;
}
```
### Realistic
```razor
<JThemeProvider @ref="themeProvider" Preset="@currentPreset">
    @Body
</JThemeProvider>

<JThemePicker Provider="@themeProvider" @bind-Preset="currentPreset" />

@* compact icon-only variant *@
<JThemePicker Compact="true" @bind-Preset="currentPreset" />

@code {
    private JThemeProvider? themeProvider;
    private JThemePreset currentPreset = JThemePreset.Cyan;
}
```

## Use cases
- Letting users switch the HUD theme live.
- Compact theme toggle in a toolbar/HUD bar.
- Building a custom accent/background/card color scheme (Apply Custom).

## Notes
- Built-in presets: Cyan, Amber, Green, Red, Purple, White (maps to `JThemePreset`).
- When `Provider` is set, selecting a preset calls `Provider.SetPresetAsync`, and Apply Custom calls `Provider.SetThemeAsync` with a `JThemePreset.Custom` theme.
- The custom section (color inputs + Apply Custom) only appears when `ShowCustom` is true and `Compact` is false.
