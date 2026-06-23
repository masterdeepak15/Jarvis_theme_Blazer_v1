# JMapInfoWindow

Static helper (not a rendered component) that builds pre-styled HUD HTML for marker popups / info windows used by JGoogleMap and JLeafletMap.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS + `jarvis-maps.css` (it produces HTML that uses Jarvis CSS variables; consumed by the map components)

## Parameters
This component is never placed in markup. It exposes static methods. `Build(...)` arguments:

| Argument | Type | Default | Description |
|---|---|---|---|
| title | `string` | (required) | Main heading. |
| subtitle | `string?` | `null` | Small uppercase label above the title. |
| description | `string?` | `null` | Paragraph body text. |
| rows | `IEnumerable<(string Key, string Value)>?` | `null` | Key/value data rows. |
| state | `JState` | `Active` | Drives accent color and pulse (Active/Warning/Error/Success). |
| badgeText | `string?` | `null` | Small badge pill next to the status dot. |
| chart | `JMapChartData?` | `null` | Optional mini bar chart. |
| actionHtmlButtons | `IEnumerable<string>?` | `null` | Raw HTML button strings (use `ActionButton`). |

Other static methods:
- `ActionButton(string label, string onclick = "", string? color = null)` -> HTML button string.

## Data models
`JMapChartData` — `Title`, `Type` (`bar`/`line`/`pie`; only bar is rendered by the mini chart), `Labels` (`List<string>`), `Values` (`List<double>`), `Color?`. `JState` enum supplies the theme accent.

## Examples
### Basic
```razor
@code {
    string _html = JMapInfoWindow.Build(
        title: "Mumbai",
        subtitle: "Maharashtra",
        rows: new[] { ("Population", "12.5M"), ("Area", "603 km²") });
}
```
### Realistic
```razor
@code {
    async Task ShowPopup(JLeafletMap map, double lat, double lng)
    {
        var html = JMapInfoWindow.Build(
            title: "Sector 7",
            subtitle: "Grid Online",
            description: "Primary substation feeding the north grid.",
            rows: new[] { ("Load", "82%"), ("Uptime", "99.97%") },
            state: JState.Warning,
            badgeText: "ALERT",
            chart: new JMapChartData {
                Title  = "Hourly Load",
                Labels = new() { "1h", "2h", "3h", "4h" },
                Values = new() { 40, 65, 58, 82 }
            },
            actionHtmlButtons: new[] {
                JMapInfoWindow.ActionButton("DETAILS", "showDetails()"),
                JMapInfoWindow.ActionButton("MUTE", "mute()", "var(--j-err)")
            });

        await map.OpenPopupAsync(lat, lng, html);
    }
}
```

## Use cases
- Consistent HUD-styled marker popups across both map components.
- Rich info windows with data rows, a mini bar chart and action buttons.

## Notes
- Not a visual component — do not place `<JMapInfoWindow />` in markup; call `JMapInfoWindow.Build(...)`.
- Pass the returned HTML to `JGoogleMap.OpenInfoWindowAsync(markerId, html)` or `JLeafletMap.OpenPopupAsync(lat, lng, html)`.
- Output relies on Jarvis CSS variables, so the page must load core CSS (and typically `jarvis-maps.css`).
- `onclick` handlers in `ActionButton` run in the global JS scope of the host page.
