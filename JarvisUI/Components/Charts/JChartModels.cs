namespace JarvisUI.Components.Charts;

// ─── Shared chart data models ────────────────────────────────────────────────

/// <summary>A single (X-label, Y-value) data point for line / bar / sparkline charts.</summary>
public record JChartPoint(string Label, double Value);

/// <summary>A segment for donut charts.</summary>
public record JDonutSegment(string Label, double Value, string? Color = null);

/// <summary>One spoke axis + its value for radar charts.</summary>
public record JRadarAxis(string Label, double Value, double Max = 100);

/// <summary>Orientation for bar charts.</summary>
public enum JChartOrientation { Vertical, Horizontal }

/// <summary>Trend hint for sparklines (auto-detected when Trend=Auto).</summary>
public enum JSparkTrend { Auto, Up, Down, Flat }
