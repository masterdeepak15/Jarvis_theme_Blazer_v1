# JGoogleMap

HUD-themed Google Maps component with custom controls, animated markers, info windows and an optional heatmap layer.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS + `jarvis-maps.css` + the map JS/CDN scripts listed in Notes

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| ApiKey | `string` | `""` | Google Maps API key (the Maps JS API `<script>` itself must be loaded in App.razor; see Notes). |
| Lat | `double` | `20.5937` | Initial centre latitude. |
| Lng | `double` | `78.9629` | Initial centre longitude. |
| Zoom | `int` | `5` | Initial zoom level. |
| Height | `string` | `"400px"` | CSS height of the map. |
| Label | `string?` | `null` | Footer caption (defaults to "JARVIS — GEOSPATIAL"). |
| MapType | `string` | `"roadmap"` | Initial map type: `roadmap`, `satellite`, `terrain`, `hybrid`. |
| Markers | `List<JMapMarker>` | `new()` | Markers added on first render. |
| UseCustomStyle | `bool` | `true` | Apply the dark HUD Google Maps style. |

## Data models
- `JMapMarker` — `Id`, `Lat`, `Lng`, `Title?`, `Label?`, `Color?` (null = `--j-accent`), `Type` (`JMarkerType`: Default/Pulse/Diamond/Cluster/Hud), `Size`, `Scale`, `Animated`, `Pulse`, `InfoContent?` (HTML popup), `Tooltip?`, `Data?` (JSON passed back), `Count`.
- `JHeatmapPoint(double Lat, double Lng, double Weight = 1.0)` — used by `SetHeatmapAsync`.
- Event records: `JMapClickEvent(double Lat, double Lng)`, `JMapMarkerEvent(string MarkerId, double Lat, double Lng)`.

## Events
| Event | Payload | Fires when |
|---|---|---|
| OnMapClick | `JMapClickEvent` | Map background is clicked. |
| OnMarkerClick | `JMapMarkerEvent` | A marker is clicked. |
| OnZoomChange | `int` | Zoom level changes. |

## Public methods (via `@ref`)
- `AddMarkerAsync(JMapMarker)`, `RemoveMarkerAsync(string id)`, `ClearMarkersAsync()`
- `PanToAsync(double lat, double lng, int? z = null)`
- `OpenInfoWindowAsync(string markerId, string html)`
- `SetHeatmapAsync(List<JHeatmapPoint>?)` — pass null/empty to clear.

## Examples
### Basic
```razor
<JGoogleMap ApiKey="@_key" Lat="19.07" Lng="72.87" Zoom="10" Height="420px" />

@code {
    string _key = "YOUR_GOOGLE_MAPS_API_KEY";
}
```
### Realistic
```razor
<JGoogleMap @ref="_map"
            ApiKey="@_key"
            Lat="19.07" Lng="72.87" Zoom="11"
            Height="500px"
            Label="MUMBAI OPS"
            Markers="@_markers"
            OnMarkerClick="HandleMarker"
            OnMapClick="HandleMapClick" />

@code {
    JGoogleMap? _map;
    string _key = "YOUR_GOOGLE_MAPS_API_KEY";

    List<JMapMarker> _markers = new()
    {
        new() { Lat = 19.076, Lng = 72.877, Title = "HQ",
                Type = JMarkerType.Pulse, InfoContent = "<b>HQ</b>" }
    };

    Task HandleMarker(JMapMarkerEvent e)
        => _map!.OpenInfoWindowAsync(e.MarkerId, $"<b>{e.MarkerId}</b>");

    void HandleMapClick(JMapClickEvent e)
        => Console.WriteLine($"{e.Lat}, {e.Lng}");
}
```

## Use cases
- Geospatial dashboards with branded dark styling.
- Live asset/marker tracking with HUD info windows.
- Density/heatmap overlays via `SetHeatmapAsync`.

## Notes
- App.razor `<head>` / `<body>` must load:
  - `_content/JarvisUI/css/jarvis-maps.css`
  - `_content/JarvisUI/js/jarvis-maps.js`
  - `_content/JarvisUI/js/jarvis-gmap.js` (defines `window.JarvisGMap`)
  - The Google Maps JS API script, e.g. `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=visualization"></script>` (the `visualization` library is needed for the heatmap layer).
- The component polls for `window.google.maps` before init, so the Google script may load async.
- Implements `IAsyncDisposable`; calls `JarvisGMap.destroy` on teardown (swallows errors when the circuit/page is gone).
- Works in Blazor Server and WebAssembly (JS interop only; no HttpClient needed).
