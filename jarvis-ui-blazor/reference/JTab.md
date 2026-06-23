# JTab

A single tab definition and content panel used inside `JTabs`; registers its label/icon/badge with the parent and renders its content only when active.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`). Must be placed inside a `JTabs` component.

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Key` | `string` | `""` | Unique identifier for the tab; matched against `JTabs.ActiveTab`. |
| `Label` | `string` | `""` | Tab button text. |
| `Icon` | `string?` | `null` | Optional icon/glyph shown before the label. |
| `Badge` | `string?` | `null` | Optional badge text (e.g. a count) shown on the tab. |
| `ChildContent` | `RenderFragment?` | `null` | Content rendered when this tab is active. |

## Content slots
- `ChildContent` — the panel content shown when this tab is selected.

## Examples
### Basic
```razor
<JTabs @bind-ActiveTab="activeTab">
    <JTab Key="home" Label="Home">
        <p>Home content</p>
    </JTab>
</JTabs>
```
### Realistic
```razor
<JTabs @bind-ActiveTab="activeTab">
    <JTab Key="alerts" Label="Alerts" Icon="⚠" Badge="5">
        <JTable Columns="@alertCols" Rows="@alertRows" />
    </JTab>
    <JTab Key="metrics" Label="Metrics" Icon="◷">
        <JDataRow Key="CPU" Value="74%" BarPercent="74" />
    </JTab>
</JTabs>
```

## Use cases
- Defining the label/icon/badge and content for one tab.
- Lazy display of content (only the active tab's content is rendered).

## Notes
- Must be a direct child of `JTabs`; it discovers the parent through a `[CascadingParameter]`.
- Registers with the parent in `OnInitialized` and notifies the parent on real label/icon/badge changes only (guards against render loops).
- Renders nothing visible itself except its `ChildContent` when `Key == JTabs.ActiveTab`.
