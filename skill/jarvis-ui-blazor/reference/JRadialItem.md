# JRadialItem

A single, non-visual child of `JRadialMenu` that registers one fly-out action (icon, label, angle, click handler) with its parent.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Icon | `string` | `"⊞"` | Glyph/emoji shown in the item circle. |
| Label | `string` | `""` | Hover label text; also part of the item's unique key. |
| Angle | `double` | `0` | Position angle in degrees (0 = top, clockwise); also part of the unique key. |
| State | `JState` (`JarvisUI.Tokens`) | `JState.Active` | Visual state/accent (e.g. `Error` for destructive actions). |
| OnClick | `EventCallback` | — | Invoked when the item is clicked (parent then closes). |

## Events
- `OnClick` (`EventCallback`) — fired when the user clicks this item.

## Content slots
None — this component renders no markup of its own; it only registers its definition with the parent `JRadialMenu` during `OnInitialized`.

## Two-way binding
None.

## Examples
### Basic
```razor
<JRadialMenu @bind-Open="open">
    <JRadialItem Icon="⚙" Label="Settings" Angle="0" OnClick="OpenSettings" />
</JRadialMenu>

@code {
    private bool open;
    private void OpenSettings() { }
}
```
### Realistic
```razor
<JRadialMenu @bind-Open="open" Radius="100">
    <JRadialItem Icon="📊" Label="Metrics"  Angle="0"   OnClick="ShowMetrics" />
    <JRadialItem Icon="🎙" Label="Voice"    Angle="120" OnClick="ToggleVoice" />
    <JRadialItem Icon="⏻" Label="Shutdown" Angle="240" OnClick="Shutdown" State="JState.Error" />
</JRadialMenu>

@code {
    private bool open;
    private void ShowMetrics() { }
    private void ToggleVoice() { }
    private void Shutdown() { }
}
```

## Use cases
- Declaring individual actions inside a `JRadialMenu`.
- Marking destructive/critical actions with `State="JState.Error"`.

## Notes
- Must be placed inside a `JRadialMenu`; it relies on a `[CascadingParameter]` reference to the parent.
- The item's identity key is `"{Label}-{Angle}"`; duplicate Label+Angle pairs are ignored, so keep them unique.
