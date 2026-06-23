# JThemeProvider

App-level theme provider that writes JARVIS UI CSS custom properties to the page via a `<style>` tag; place once at the app root. Pure Blazor, SSR-compatible.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`). The variables it emits drive all `var(--j-*)` tokens.

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Preset` | `JThemePreset` (`JarvisUI.Tokens`) | `JThemePreset.Cyan` | Built-in theme preset; used when `Theme` is null. |
| `Theme` | `JarvisTheme?` (`JarvisUI.Tokens`) | `null` | Fully custom theme object; overrides `Preset` when set. Supports two-way binding. |
| `ChildContent` | `RenderFragment?` | `null` | The app/content rendered under the theme. |

## Events
| Event | Type | Description |
|---|---|---|
| `ThemeChanged` | `EventCallback<JarvisTheme>` | Fires when the theme changes via `SetThemeAsync`/`SetPresetAsync`. Backs `@bind-Theme`. |

## Public methods
- `Task SetThemeAsync(JarvisTheme theme)` — apply a custom theme at runtime and notify.
- `Task SetPresetAsync(JThemePreset preset)` — apply a preset at runtime.
- `JarvisTheme CurrentTheme { get; }` — the currently active theme.

## Content slots
- `ChildContent` — the application content wrapped by the provider.

## Two-way binding
- `@bind-Theme` — binds a `JarvisTheme`. Uses `ThemeChanged`.

## Data model: `JarvisTheme` (JarvisUI.Tokens)
Custom theme fields seen in usage include: `Name`, `Preset`, `Accent`, `AccentMid`, `AccentDim`, `Bg`, `BgCard`, `BgCardAlt`, `TextPrimary`. Build presets with `JarvisTheme.FromPreset(preset)`; emit CSS with `theme.ToCss()` (done internally).

## Examples
### Basic
```razor
<JThemeProvider Preset="JThemePreset.Amber">
    <Router AppAssembly="@typeof(App).Assembly">
        @* ... *@
    </Router>
</JThemeProvider>
```
### Realistic
```razor
<JThemeProvider @bind-Theme="currentTheme">
    @Body
</JThemeProvider>

@code {
    private JarvisTheme currentTheme = new()
    {
        Accent = "#a855f7",
        Bg = "#050010",
        BgCard = "#080018",
        TextPrimary = "#faf5ff",
    };
}
```

## Use cases
- Setting the global JARVIS UI theme once at the app root (App.razor / MainLayout).
- Runtime theme switching via `@bind-Theme`, `SetThemeAsync`, or by passing a reference to `JThemePicker`.

## Notes
- Place exactly once near the top of the app; it injects a single `<style id="jarvis-theme-vars">` block.
- `Theme` takes precedence over `Preset`. On every parameter change it recomputes CSS in `OnParametersSet`.
- Pairs with `JThemePicker` (pass the provider via `JThemePicker.Provider` for live switching).
