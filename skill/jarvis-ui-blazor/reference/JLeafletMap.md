# JLeafletMap

HUD-themed Leaflet map (no API key) with India GeoJSON drill-down (country to village), breadcrumbs, animated markers and custom controls.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS + `jarvis-maps.css` + the map JS/CDN scripts listed in Notes

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Lat | `double` | `20.5937` | Initial centre latitude. |
| Lng | `double` | `78.9629` | Initial centre longitude. |
| Zoom | `int` | `5` | Initial zoom. |
| Height | `string` | `"100%"` | CSS height. |
| Width | `string` | `"100%"` | CSS width. |
| MinHeight | `string?` | `"300px"` | CSS min-height (applied when not null). |
| UseTheme | `bool` | `true` | Apply the JarvisDark tile filter (only when TileProvider is JarvisDark). |
| ShowBuiltinControls | `bool` | `true` | Show built-in zoom / reset / India / back buttons. |
| ShowFeatureInfo | `bool` | `true` | Show the selected-feature info panel. |
| TileUrl | `string?` | `null` | Explicit tile URL template (overrides TileProvider). |
| TileProvider | `JTileProvider` | `JarvisDark` | JarvisDark / CartoDark / CartoLight / OpenStreetMap / Custom. |
| FitBoundsOnLoad | `bool` | `false` | Auto-fit to GeoJSON extents after load. |
| MinZoom | `int` | `1` | Minimum zoom (use 4 to lock to India). |
| MaxBounds | `double[][]?` | `null` | Pan restriction; pass `JMapBounds.IndiaMaxBounds`. |
| GeoJsonUrl | `string?` | `null` | GeoJSON URL fetched over HttpClient on mount. |
| GeoJsonData | `string?` | `null` | Inline GeoJSON string (alternative to GeoJsonUrl). |
| LayerOptions | `JGeoLayerOptions` | `new()` | Styling options for the base GeoJSON layer. |
| Markers | `List<JMapMarker>?` | `null` | Markers added on mount. |
| Controls | `List<JMapControl>?` | `null` | Custom HUD control buttons. |
| FeatureInfoContent | `RenderFragment<string>?` | `null` | **Slot.** Custom content in the selected-feature panel (receives the feature name). |
| ChildContent | `RenderFragment?` | `null` | **Slot.** Arbitrary overlay content rendered inside the map wrapper. |

## Data models
- `JMapMarker` — see JGoogleMap; serialised via `ToJson()` (`InfoContent` becomes the popup).
- `JGeoLayerOptions` — `StrokeColor?`, `StrokeWeight`, `StrokeOpacity`, `FillColor?`, `FillOpacity`, `DashArray?`, `FitBounds`, `MaxClickZoom`.
- `JMapControl` — `Id`, `Label`, `Icon?`, `Tooltip?`, `Position` (`JMapControlPosition`).
- `JMapBounds` — `North/South/East/West`; statics `JMapBounds.India`, `JMapBounds.IndiaMaxBounds`.
- `JTileProvider`, `JIndiaLevel` (Country/State/District/Taluka/Village) enums.

## Events
| Event | Payload (tuple) | Fires when |
|---|---|---|
| OnFeatureClick | `(string LayerId, string Name, string Code, string PropsJson)` | A GeoJSON feature is clicked. |
| OnFeatureHover | `(string LayerId, string Name, string PropsJson)` | Hovering a feature. |
| OnMarkerClick | `(string Id, double Lat, double Lng, string Title, string Data)` | A marker is clicked. |
| OnMapClick | `(double Lat, double Lng)` | Map background is clicked. |
| OnZoomChanged | `int` | Zoom changes (also updates the `Zoom` field). |
| OnControlClick | `string` | A custom control button is clicked (control id). |

## Public methods (via `@ref`)
- `LoadGeoJsonAsync(layerId, geoJson, opts?)`, `RemoveLayerAsync(layerId)`, `ClearLayersAsync()`
- `AddMarkerAsync(JMapMarker)`, `RemoveMarkerAsync(id)`, `ClearMarkersAsync()`
- `SetViewAsync(lat, lng, zoom)`, `FitBoundsAsync(JMapBounds)`, `OpenPopupAsync(lat, lng, html)`
- `HighlightFeatureAsync(layerId, name)`
- `AddBreadcrumb(name, layerId, level)`, `ClearBreadcrumbs()`

## Examples
### Basic
```razor
<JLeafletMap Height="500px" Zoom="5" />
```
### Realistic
```razor
<JLeafletMap @ref="_map"
             Height="600px"
             GeoJsonUrl="/geojson/india-states.geojson"
             TileProvider="JTileProvider.JarvisDark"
             MinZoom="4"
             MaxBounds="@JMapBounds.IndiaMaxBounds"
             Markers="@_markers"
             OnFeatureClick="OnState"
             OnMarkerClick="OnMarker">
    <FeatureInfoContent Context="name">
        <div style="font-size:10px;">Selected: @name</div>
    </FeatureInfoContent>
</JLeafletMap>

@code {
    JLeafletMap? _map;
    List<JMapMarker> _markers = new()
    {
        new() { Lat = 28.61, Lng = 77.21, Title = "Delhi", Type = JMarkerType.Pulse }
    };

    async Task OnState((string LayerId, string Name, string Code, string PropsJson) e)
    {
        var districts = await Http.GetStringAsync($"/geojson/{e.Name}-districts.geojson");
        await _map!.LoadGeoJsonAsync("districts", districts);
        _map.AddBreadcrumb(e.Name, "districts", JIndiaLevel.State);
    }

    void OnMarker((string Id, double Lat, double Lng, string Title, string Data) e)
        => Console.WriteLine(e.Title);
}
```

## Use cases
- India administrative drill-down dashboards (state to district to taluka to village).
- No-API-key map needs using OpenStreetMap / Carto tiles.
- Choropleth-style GeoJSON overlays with HUD styling and breadcrumbs.

## Notes
- App.razor `<head>` must load Leaflet CSS/JS from CDN plus the Jarvis scripts:
  ```html
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha384-..." crossorigin="anonymous" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha384-..." crossorigin="anonymous"></script>
  <link rel="stylesheet" href="_content/JarvisUI/css/jarvis-maps.css" />
  <script src="_content/JarvisUI/js/jarvis-maps.js"></script>
  <script src="_content/JarvisUI/js/jarvis-leaflet.js"></script>
  ```
  Add Subresource Integrity (`integrity="sha384-..." crossorigin="anonymous"`) to the CDN tags to guard against CDN compromise.
- GeoJSON is fetched over `HttpClient` using the named client `"JarvisUI"`. URLs are made absolute via injected `NavigationManager` (works in Server and WASM).
- **Blazor WebAssembly:** the named `HttpClient` has no base address, so the component relies on `NavigationManager.ToAbsoluteUri` to resolve relative GeoJSON paths. Register a default/named `HttpClient` with a `BaseAddress` (the WASM host origin) and serve GeoJSON files from the app's `wwwroot` (e.g. `/geojson/...` resolves to `wwwroot/geojson/...`).
- Drill-up/breadcrumb navigation clears layers; the consuming page re-adds child layers via `OnFeatureClick` + `LoadGeoJsonAsync`/`AddBreadcrumb`.
- Implements `IAsyncDisposable`; calls `JarvisLeaflet.destroy` on teardown.
