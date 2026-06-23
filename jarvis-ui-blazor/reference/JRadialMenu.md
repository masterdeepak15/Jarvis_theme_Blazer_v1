# JRadialMenu

A HUD-style radial fly-out menu whose `JRadialItem` children fly out from a center trigger button when opened.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Open | `bool` | `false` | Whether the menu is expanded. Supports two-way binding via `@bind-Open`. |
| OpenChanged | `EventCallback<bool>` | — | Fired when the open state changes; backs `@bind-Open`. |
| TriggerLabel | `string` | `"MENU"` | Text shown on the center button when closed (shows "CLOSE" when open). |
| Radius | `double` | `90` | Distance in px from center to each item. |
| CenterSize | `string` | `"64px"` | CSS size of the circular center trigger. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| ChildContent | `RenderFragment?` | `null` | Slot for `JRadialItem` children. |

## Events
- `OpenChanged` (`EventCallback<bool>`) — fired on toggle/close; backs `@bind-Open`.

Item clicks are handled by each child `JRadialItem`'s `OnClick`; the menu auto-closes after an item is clicked.

## Content slots
- `ChildContent` (default slot) — place one or more `JRadialItem` components here. This is the intended content; an empty menu renders only the trigger.

## Two-way binding
`@bind-Open` (`bool`) — binds the expanded/collapsed state.

## Examples
### Basic
```razor
<JRadialMenu @bind-Open="menuOpen" TriggerLabel="MENU">
    <JRadialItem Icon="⊞" Label="Dashboard" Angle="0" OnClick="GoToDash" />
    <JRadialItem Icon="⚙" Label="Settings" Angle="120" OnClick="GoToSettings" />
</JRadialMenu>

@code {
    private bool menuOpen = false;
    private void GoToDash() { }
    private void GoToSettings() { }
}
```
### Realistic
```razor
<JRadialMenu @bind-Open="menuOpen" TriggerLabel="MENU" Radius="100" CenterSize="72px">
    <JRadialItem Icon="⊞" Label="Dashboard" Angle="0"   OnClick="GoToDash" />
    <JRadialItem Icon="⚡" Label="Skills"    Angle="60"  OnClick="GoToSkills" />
    <JRadialItem Icon="⚙" Label="Settings"  Angle="120" OnClick="GoToSettings" />
    <JRadialItem Icon="📊" Label="Metrics"   Angle="180" OnClick="GoToMetrics" />
    <JRadialItem Icon="🎙" Label="Voice"     Angle="240" OnClick="ToggleVoice" />
    <JRadialItem Icon="⏻" Label="Shutdown"  Angle="300" OnClick="Shutdown" State="JState.Error" />
</JRadialMenu>

@code {
    private bool menuOpen = false;
    private void GoToDash() { }
    private void GoToSkills() { }
    private void GoToSettings() { }
    private void GoToMetrics() { }
    private void ToggleVoice() { }
    private void Shutdown() { }
}
```

## Use cases
- Tactical/HUD navigation hubs where actions radiate from a central control.
- Compact action menus on dashboards (voice, settings, shutdown, etc.).

## Notes
- Children register themselves via a `CascadingValue` of the parent; each item's unique key is `"{Label}-{Angle}"`, so give items distinct Label/Angle combinations.
- Item position is computed from `Angle` (degrees, 0 = top, clockwise) and `Radius`; distribute angles evenly for a clean fan-out.
- Clicking an item invokes its `OnClick` and then closes the menu automatically.
