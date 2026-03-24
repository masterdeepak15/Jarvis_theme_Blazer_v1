namespace JarvisUI.Tokens;

// ================================================================
//  JARVIS UI — THEME MODEL
//  Defines preset themes and custom theme configuration.
//  Used by JThemeProvider to write CSS variables to :root.
// ================================================================

/// <summary>Built-in preset themes</summary>
public enum JThemePreset
{
    Cyan,    // Default — JARVIS blue
    Amber,   // Industrial orange / warning
    Green,   // Matrix / military green
    Red,     // Danger / critical red
    Purple,  // Neon purple
    White,   // High-contrast light mode
    Custom,  // Fully custom via JarvisTheme properties
}

/// <summary>
/// Full theme configuration.
/// All color properties map directly to CSS custom properties on :root.
/// </summary>
public class JarvisTheme
{
    // ── Identity ──────────────────────────────────────────────────
    public string Name   { get; set; } = "JARVIS";
    public JThemePreset Preset { get; set; } = JThemePreset.Cyan;

    // ── Primary accent color ──────────────────────────────────────
    /// <summary>Main HUD accent — drives all borders, glows, icons</summary>
    public string Accent     { get; set; } = "#00e5ff";
    public string AccentMid  { get; set; } = "#22d3ee";
    public string AccentDim  { get; set; } = "#0e7490";
    public string AccentDeep { get; set; } = "#0891b2";

    // ── Semantic colors ───────────────────────────────────────────
    public string Warn { get; set; } = "#f97316";
    public string Err  { get; set; } = "#ef4444";
    public string Ok   { get; set; } = "#22c55e";

    // ── Backgrounds ───────────────────────────────────────────────
    public string Bg        { get; set; } = "#020d18";
    public string BgCard    { get; set; } = "#030f1e";
    public string BgCardAlt { get; set; } = "#04111f";

    // ── Text ──────────────────────────────────────────────────────
    public string TextPrimary   { get; set; } = "#e0f7ff";
    public string TextSecondary { get; set; } = "#94a3b8";
    public string TextMuted     { get; set; } = "#475569";
    public string TextDim       { get; set; } = "#334155";

    // ── Animation speeds ─────────────────────────────────────────
    public string DurScan   { get; set; } = "3.5s";
    public string DurPulse  { get; set; } = "2.8s";
    public string DurSpin   { get; set; } = "4s";
    public string DurShine  { get; set; } = "2.4s";
    public string DurCorner { get; set; } = "3.0s";

    // ── Shape ─────────────────────────────────────────────────────
    public string Notch   { get; set; } = "14px";
    public string NotchLg { get; set; } = "20px";
    public string RailW   { get; set; } = "3px";

    // ── Presets factory ───────────────────────────────────────────
    public static JarvisTheme FromPreset(JThemePreset preset) => preset switch
    {
        JThemePreset.Amber  => new JarvisTheme
        {
            Name = "Amber", Preset = JThemePreset.Amber,
            Accent = "#f97316", AccentMid = "#fb923c", AccentDim = "#c2410c", AccentDeep = "#9a3412",
            Bg = "#0f0800", BgCard = "#160c02", BgCardAlt = "#1a1004",
            TextPrimary = "#fff7ed",
        },
        JThemePreset.Green  => new JarvisTheme
        {
            Name = "Green", Preset = JThemePreset.Green,
            Accent = "#22c55e", AccentMid = "#4ade80", AccentDim = "#15803d", AccentDeep = "#166534",
            Bg = "#010f04", BgCard = "#021308", BgCardAlt = "#03180a",
            TextPrimary = "#f0fdf4",
        },
        JThemePreset.Red    => new JarvisTheme
        {
            Name = "Red", Preset = JThemePreset.Red,
            Accent = "#ef4444", AccentMid = "#f87171", AccentDim = "#b91c1c", AccentDeep = "#991b1b",
            Bg = "#0f0002", BgCard = "#160205", BgCardAlt = "#1a0306",
            TextPrimary = "#fff1f2",
        },
        JThemePreset.Purple => new JarvisTheme
        {
            Name = "Purple", Preset = JThemePreset.Purple,
            Accent = "#a855f7", AccentMid = "#c084fc", AccentDim = "#7c3aed", AccentDeep = "#6d28d9",
            Bg = "#050010", BgCard = "#080018", BgCardAlt = "#0a001e",
            TextPrimary = "#faf5ff",
        },
        JThemePreset.White  => new JarvisTheme
        {
            Name = "White", Preset = JThemePreset.White,
            Accent = "#0891b2", AccentMid = "#06b6d4", AccentDim = "#0e7490", AccentDeep = "#164e63",
            Bg = "#f0f9ff", BgCard = "#ffffff", BgCardAlt = "#f8fafc",
            TextPrimary = "#0c1a2e", TextSecondary = "#334155",
            TextMuted = "#64748b", TextDim = "#94a3b8",
            Warn = "#d97706", Err = "#dc2626", Ok = "#16a34a",
        },
        _ => new JarvisTheme
        {
            Name = "Cyan", Preset = JThemePreset.Cyan,
        },
    };

    // ── CSS variable output ───────────────────────────────────────
    /// <summary>Generates the full CSS :root override block for this theme</summary>
    public string ToCss()
    {
        // Build opacity variants from accent hex
        var a = ParseHex(Accent);
        var w = ParseHex(Warn);
        var e = ParseHex(Err);
        var o = ParseHex(Ok);

        return $@"
            :root {{
              --j-accent:       {Accent};
              --j-accent-mid:   {AccentMid};
              --j-accent-dim:   {AccentDim};
              --j-accent-deep:  {AccentDeep};

              --j-accent-05:    rgba({a}, 0.05);
              --j-accent-08:    rgba({a}, 0.08);
              --j-accent-12:    rgba({a}, 0.12);
              --j-accent-18:    rgba({a}, 0.18);
              --j-accent-25:    rgba({a}, 0.25);
              --j-accent-35:    rgba({a}, 0.35);
              --j-accent-50:    rgba({a}, 0.50);
              --j-accent-70:    rgba({a}, 0.70);

              --j-warn:         {Warn};
              --j-warn-05:      rgba({w}, 0.05);
              --j-warn-12:      rgba({w}, 0.12);
              --j-warn-25:      rgba({w}, 0.25);
              --j-warn-50:      rgba({w}, 0.50);

              --j-err:          {Err};
              --j-err-05:       rgba({e}, 0.05);
              --j-err-12:       rgba({e}, 0.12);
              --j-err-25:       rgba({e}, 0.25);
              --j-err-50:       rgba({e}, 0.50);

              --j-ok:           {Ok};
              --j-ok-05:        rgba({o}, 0.05);
              --j-ok-12:        rgba({o}, 0.12);
              --j-ok-25:        rgba({o}, 0.25);

              --j-bg:           {Bg};
              --j-bg-card:      {BgCard};
              --j-bg-card-alt:  {BgCardAlt};
              --j-bg-danger:    {DarkenBg(Bg)};
              --j-bg-overlay:   {BgOverlay(Bg)};

              --j-text-primary:   {TextPrimary};
              --j-text-secondary: {TextSecondary};
              --j-text-muted:     {TextMuted};
              --j-text-dim:       {TextDim};

              --j-border-dim:   rgba({a}, 0.07);
              --j-border:       rgba({a}, 0.18);
              --j-border-mid:   rgba({a}, 0.35);
              --j-border-full:  rgba({a}, 0.70);

              --j-dur-scan:     {DurScan};
              --j-dur-pulse:    {DurPulse};
              --j-dur-spin:     {DurSpin};
              --j-dur-shine:    {DurShine};
              --j-dur-corner:   {DurCorner};

              --j-notch:        {Notch};
              --j-notch-lg:     {NotchLg};
              --j-rail-w:       {RailW};
            }}
            ";
    }

    // ── Helpers ───────────────────────────────────────────────────
    private static string ParseHex(string hex)
    {
        hex = hex.TrimStart('#');
        if (hex.Length == 3)
            hex = $"{hex[0]}{hex[0]}{hex[1]}{hex[1]}{hex[2]}{hex[2]}";
        int r = Convert.ToInt32(hex[..2], 16);
        int g = Convert.ToInt32(hex[2..4], 16);
        int b = Convert.ToInt32(hex[4..6], 16);
        return $"{r},{g},{b}";
    }

    private static string DarkenBg(string bg)
    {
        // Slightly darker than bg for danger cards
        try
        {
            var hex = bg.TrimStart('#');
            if (hex.Length == 3) hex = $"{hex[0]}{hex[0]}{hex[1]}{hex[1]}{hex[2]}{hex[2]}";
            int r = Math.Max(0, Convert.ToInt32(hex[..2], 16) - 4);
            int g = Math.Max(0, Convert.ToInt32(hex[2..4], 16) - 2);
            int b = Math.Max(0, Convert.ToInt32(hex[4..6], 16) - 2);
            return $"#{r:x2}{g:x2}{b:x2}";
        }
        catch { return bg; }
    }

    private static string BgOverlay(string bg)
    {
        try
        {
            var hex = bg.TrimStart('#');
            if (hex.Length == 3) hex = $"{hex[0]}{hex[0]}{hex[1]}{hex[1]}{hex[2]}{hex[2]}";
            int r = Convert.ToInt32(hex[..2], 16);
            int g = Convert.ToInt32(hex[2..4], 16);
            int b = Convert.ToInt32(hex[4..6], 16);
            return $"rgba({r},{g},{b},0.92)";
        }
        catch { return "rgba(2,13,24,0.92)"; }
    }
}
