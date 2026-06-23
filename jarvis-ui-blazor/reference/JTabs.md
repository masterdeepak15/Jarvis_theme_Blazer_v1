# JTabs

HUD-style tab strip with angular parallelogram tabs and an animated scan underline; hosts `JTab` children to define and render tabbed content.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `ActiveTab` | `string?` | `null` | Key of the currently active tab. Auto-selects the first registered tab if null. Supports two-way binding. |
| `Color` | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color for the tab strip. |
| `ChildContent` | `RenderFragment?` | `null` | Holds the `JTab` child components. |

## Events
| Event | Type | Description |
|---|---|---|
| `ActiveTabChanged` | `EventCallback<string>` | Fires with the new tab key when a tab is selected. Backs `@bind-ActiveTab`. |

## Content slots
- `ChildContent` (required) — must contain one or more `JTab` components. Each `JTab` registers itself with the parent `JTabs` via a cascading value.

## Two-way binding
- `@bind-ActiveTab` — binds the active tab key (string). Uses `ActiveTabChanged`.

## Examples
### Basic
```razor
<JTabs @bind-ActiveTab="activeTab">
    <JTab Key="system" Label="System" Icon="⊞">
        <p>System content</p>
    </JTab>
    <JTab Key="skills" Label="Skills" Icon="⚡" Badge="12">
        <p>Skills content</p>
    </JTab>
</JTabs>

@code {
    private string activeTab = "system";
}
```
### Realistic
```razor
<JTabs @bind-ActiveTab="activeTab" Color="JColor.Amber">
    <JTab Key="overview" Label="Overview" Icon="◰">
        <JDataRow Key="Status" Value="Online" />
    </JTab>
    <JTab Key="logs" Label="Logs" Icon="≡" Badge="3">
        <JTable Columns="@cols" Rows="@rows" />
    </JTab>
    <JTab Key="config" Label="Config" Icon="⚙">
        <p>Configuration panel</p>
    </JTab>
</JTabs>

@code {
    private string activeTab = "overview";
    // cols / rows defined elsewhere
}
```

## Use cases
- Sectioned dashboards (system / skills / logs).
- Switching between panels without navigation.
- HUD-style settings or detail views.

## Notes
- `JTabs` and `JTab` are a parent/child pair: `JTabs` renders the tab buttons (label/icon/badge) from the registered children and shows the active child's content.
- Each `JTab.Key` must be unique; duplicate keys are ignored on registration.
- If `ActiveTab` is left null, the first registered tab is auto-selected.
