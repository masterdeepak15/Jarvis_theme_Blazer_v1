using System.Text.Json.Serialization;

namespace JarvisUI.Components;

// ================================================================
//  JARVIS UI — MAP MODELS
//  Shared by both JGoogleMap and JLeafletMap components.
// ================================================================

// ── Marker types ─────────────────────────────────────────────────
public enum JMarkerType
{
    Default,    // Solid circle
    Pulse,      // Animated expanding ring
    Diamond,    // Diamond / HUD shape
    Cluster,    // Count cluster badge
    Hud,        // Alias for Diamond
}

// ── Map control positions ─────────────────────────────────────────
public enum JMapControlPosition
{
    TopLeft,    TopCenter,    TopRight,
    MiddleLeft, MiddleRight,
    BottomLeft, BottomCenter, BottomRight,
}

// ── GeoJSON zoom levels ───────────────────────────────────────────
public enum JIndiaLevel
{
    Country,
    State,
    District,
    Taluka,
    Village,
}

/// <summary>Marker definition for both Google Maps and Leaflet</summary>
public class JMapMarker
{
    public string  Id          { get; set; } = Guid.NewGuid().ToString("N")[..8];
    public double  Lat         { get; set; }
    public double  Lng         { get; set; }
    public string? Title       { get; set; }
    public string? Label       { get; set; }
    public string? Color       { get; set; }   // null = use --j-accent
    public JMarkerType Type    { get; set; } = JMarkerType.Default;
    public int     Size        { get; set; } = 12;
    public double  Scale       { get; set; } = 1.0;

    /// <summary>Animate the marker on load (drop-in effect)</summary>
    public bool    Animated    { get; set; } = true;

    /// <summary>Show continuous pulse ring animation</summary>
    public bool    Pulse       { get; set; } = false;

    /// <summary>HTML content for the info window / popup when marker is clicked</summary>
    public string? InfoContent { get; set; }

    /// <summary>Tooltip text shown on hover</summary>
    public string? Tooltip     { get; set; }
    public bool    TooltipPermanent { get; set; } = false;

    /// <summary>Custom JSON data passed back to OnMarkerClick</summary>
    public string? Data        { get; set; } = "{}";

    /// <summary>For cluster markers — number shown in badge</summary>
    public int     Count       { get; set; } = 1;

    // Serialise to JSON for JS interop
    // NOTE: JS reads `popup` for auto-bind on marker — map InfoContent → popup
    public string ToJson() => System.Text.Json.JsonSerializer.Serialize(new {
        id    = Id,   lat  = Lat,   lng   = Lng,
        title = Title, label = Label, color = Color,
        type  = Type.ToString().ToLower(), size = Size, scale = Scale,
        animated = Animated, pulse = Pulse,
        popup       = InfoContent,   // JS reads m.popup to bindPopup()
        infoContent = InfoContent,   // kept for GoogleMap compat
        tooltip = Tooltip,
        tooltipPermanent = TooltipPermanent, data = Data, count = Count,
    });
}

/// <summary>Custom HUD-themed control button on the map</summary>
public class JMapControl
{
    public string  Id       { get; set; } = "";
    public string  Label    { get; set; } = "";
    public string? Icon     { get; set; }
    public string? Tooltip  { get; set; }
    public JMapControlPosition Position { get; set; } = JMapControlPosition.TopRight;

    internal string PositionJs => Position switch
    {
        JMapControlPosition.TopLeft     => "topleft",
        JMapControlPosition.TopCenter   => "topcenter",
        JMapControlPosition.TopRight    => "topright",
        JMapControlPosition.MiddleLeft  => "LEFT_CENTER",
        JMapControlPosition.MiddleRight => "RIGHT_CENTER",
        JMapControlPosition.BottomLeft  => "bottomleft",
        JMapControlPosition.BottomCenter=> "BOTTOM_CENTER",
        JMapControlPosition.BottomRight => "bottomright",
        _                               => "topright",
    };

    public string ToJson() => System.Text.Json.JsonSerializer.Serialize(new {
        id       = Id,   label    = Label,
        icon     = Icon, tooltip  = Tooltip,
        position = PositionJs,
    });
}

/// <summary>Options for GeoJSON layers (India states/districts etc)</summary>
public record JGeoLayerOptions
{
    public string? StrokeColor   { get; set; }   // null = --j-accent
    public double  StrokeWeight  { get; set; } = 1.0;
    public double  StrokeOpacity { get; set; } = 0.8;
    public string? FillColor     { get; set; }   // null = --j-accent
    public double  FillOpacity   { get; set; } = 0.12;
    public string? DashArray     { get; set; }
    public bool    FitBounds     { get; set; } = true;
    public int     MaxClickZoom  { get; set; } = 8;

    public string ToJson() => System.Text.Json.JsonSerializer.Serialize(new {
        strokeColor   = StrokeColor,
        strokeWeight  = StrokeWeight,
        strokeOpacity = StrokeOpacity,
        fillColor     = FillColor,
        fillOpacity   = FillOpacity,
        dashArray     = DashArray,
        fitBounds     = FitBounds,
        maxClickZoom  = MaxClickZoom,
    });
}

/// <summary>Lat/Lng pair</summary>
public record JLatLng(double Lat, double Lng);

/// <summary>Bounds for fitBounds calls</summary>
public class JMapBounds
{
    public double North { get; set; }
    public double South { get; set; }
    public double East  { get; set; }
    public double West  { get; set; }

    public static JMapBounds India => new() { North=37.1, South=6.7, East=97.4, West=68.2 };

    /// <summary>Double[][] suitable for Leaflet maxBounds (SW corner, NE corner)</summary>
    public static double[][] IndiaMaxBounds => new[]
    {
        new[] { 6.0,  68.0 },   // SW — south-west corner
        new[] { 38.0, 98.0 },   // NE — north-east corner
    };

    public string ToJson() => System.Text.Json.JsonSerializer.Serialize(
        new { north=North, south=South, east=East, west=West });
}

/// <summary>Mini chart data for info window charts</summary>
public class JMapChartData
{
    public string  Title  { get; set; } = "";
    public string  Type   { get; set; } = "bar"; // bar | line | pie
    public List<string> Labels { get; set; } = new();
    public List<double> Values { get; set; } = new();
    public string? Color  { get; set; }
}

// ── Tile providers ──────────────────────────────────────────────
public enum JTileProvider
{
    JarvisDark,     // OSM tiles with dark CSS filter (default)
    CartoDark,      // CartoDB Dark Matter
    CartoLight,     // CartoDB Positron
    OpenStreetMap,  // Standard OSM
    Custom,         // Use TileUrl parameter
}

// ── Event args ────────────────────────────────────────────────
/// <summary>Fired when the map background is clicked</summary>
public record JMapClickEvent(double Lat, double Lng);

/// <summary>Fired when a marker is clicked</summary>
public record JMapMarkerEvent(string MarkerId, double Lat, double Lng);

/// <summary>Fired when a GeoJSON feature (state/district/etc) is clicked</summary>
public record JGeoFeatureEvent(string Name, string? Code, string LayerId);

/// <summary>Single point for a Google Maps heatmap layer</summary>
public class JHeatmapPoint
{
    public double Lat    { get; set; }
    public double Lng    { get; set; }
    /// <summary>Relative weight 0.0–1.0. Defaults to 1.0 (max intensity).</summary>
    public double Weight { get; set; } = 1.0;

    public JHeatmapPoint() { }
    public JHeatmapPoint(double lat, double lng, double weight = 1.0)
    { Lat = lat; Lng = lng; Weight = weight; }
}
