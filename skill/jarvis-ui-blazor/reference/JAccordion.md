# JAccordion

Collapsible HUD panel with a notched header, rotating-diamond chevron, and a scan animation on open.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Title` | `string` | `""` | Header title text. |
| `Icon` | `string?` | `null` | Optional icon/glyph in the header. |
| `Badge` | `string?` | `null` | Optional badge text in the header. |
| `DefaultOpen` | `bool` | `false` | If true, the panel starts expanded (applied in `OnInitialized`). |
| `IsOpen` | `bool` | `false` | Current open state. Supports two-way binding. |
| `Color` | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color (Amber/Red map to warn/error). |
| `State` | `JState` (`JarvisUI.Tokens`) | `JState.Active` | State color override (Warning/Error/Success change the accent). |
| `ChildContent` | `RenderFragment?` | `null` | Body content shown when open. |

## Events
| Event | Type | Description |
|---|---|---|
| `IsOpenChanged` | `EventCallback<bool>` | Fires with the new open state when the header is toggled. Backs `@bind-IsOpen`. |

## Content slots
- `ChildContent` — the panel body, rendered only while open.

## Two-way binding
- `@bind-IsOpen` — binds the open/closed boolean. Uses `IsOpenChanged`.

## Examples
### Basic
```razor
<JAccordion Title="System Information" DefaultOpen="true">
    <JDataRow Key="OS" Value="Ubuntu 24.04" />
    <JDataRow Key="Kernel" Value="6.8.0" />
</JAccordion>
```
### Realistic
```razor
<JAccordion Title="Skill Config" Icon="⚙" Badge="BETA" State="JState.Warning" @bind-IsOpen="configOpen">
    <p>Configuration content here...</p>
</JAccordion>

@code {
    private bool configOpen;
}
```

## Use cases
- Expandable detail/config sections.
- Grouping `JDataRow` lists under a titled header.
- Status-colored collapsible panels (warning/error states).

## Notes
- `State` takes precedence over `Color` for the accent color; if `State` is `Active`, `Color` (Amber/Red) is used as a fallback.
- `DefaultOpen` only sets the initial state; runtime control should use `IsOpen`/`@bind-IsOpen`.
