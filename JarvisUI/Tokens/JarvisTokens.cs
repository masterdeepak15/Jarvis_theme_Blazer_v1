namespace JarvisUI.Tokens;

// ═══════════════════════════════════════════════════════════════
//  JARVIS UI — DESIGN TOKENS
//  All design decisions live here. Components reference only these.
//  No magic strings anywhere else in the library.
// ═══════════════════════════════════════════════════════════════

/// <summary>Color intent — maps to CSS custom property ramps</summary>
public enum JColor
{
    Cyan,       // primary HUD color  — #00e5ff family
    Blue,       // secondary accent   — #0891b2 family
    Amber,      // warning            — #f97316 family
    Red,        // danger / error     — #ef4444 family
    Green,      // success / ok       — #22c55e family
    Ghost,      // transparent / dim
    White,      // high-contrast text
}

/// <summary>Component size scale</summary>
public enum JSize
{
    Xs,   // 28px height
    Sm,   // 34px height
    Md,   // 40px height  (default)
    Lg,   // 48px height
    Xl,   // 56px height
}

/// <summary>Button / component visual variant</summary>
public enum JVariant
{
    Solid,      // filled background
    Outline,    // border only, transparent bg
    Ghost,      // no border, subtle hover
    Danger,     // red pulse border
    Scan,       // full-width with scan sweep shine
}

/// <summary>Card frame style — 9 distinct HUD frame designs</summary>
public enum JCardStyle
{
    CornerBracket,   // S1 — 4 L-shape corner brackets + scan line
    Notched,         // S2 — cut top-left + bottom-right + filled triangle accents
    SideRail,        // S3 — thick left rail bar + partial top/bottom tabs
    GlowBorder,      // S4 — full glowing border + inner radial glow (selected/focus)
    PartialBorder,   // S5 — partial L borders only + roving border dot
    DangerPulse,     // S6 — red/amber pulsing animated border (warning/error)
    Hexagonal,       // S7 — hexagon clip-path panel
    Radar,           // S8 — circular radar with rotating rings + sweep
    DoubleFrame,     // S9 — outer + inner double border frame
}

/// <summary>Button shape — 9 distinct angular HUD button shapes</summary>
public enum JButtonShape
{
    LeftNotch,      // cut top-left corner, filled triangle accent
    RightNotch,     // cut top-right corner
    BothNotch,      // cut both corners
    Parallelogram,  // skewed/parallelogram with left rail
    GhostSkew,      // dashed parallelogram, no fill
    BracketFrame,   // double-bracket L-frame, no diagonal
    Hexagonal,      // hexagon clip-path
    IconSquare,     // small square with cut corner (icon-only)
    ScanFull,       // full-width solid block with scan sweep shine
}

/// <summary>System state — drives color + animation intensity</summary>
public enum JState
{
    Idle,       // dim, slow pulse
    Active,     // cyan, normal animations
    Processing, // cyan, faster animations + scan
    Warning,    // amber, moderate pulse
    Error,      // red, fast pulse + blink
    Success,    // green, gentle pulse
}

/// <summary>Animation speed scale</summary>
public enum JAnimSpeed
{
    Off,     // no animations (reduced motion)
    Slow,    // 2× slower
    Normal,  // default
    Fast,    // 1.5× faster
}

// ═══════════════════════════════════════════════════════════════
//  CSS CLASS RESOLVER
//  Maps token enums → Tailwind/CSS class strings
//  All Tailwind purge-safe: classes are full strings, never constructed
// ═══════════════════════════════════════════════════════════════

public static class JarvisClasses
{
    // ── Color → CSS variable class ──────────────────────────────
    public static string Color(JColor c) => c switch
    {
        JColor.Cyan   => "j-color-cyan",
        JColor.Blue   => "j-color-blue",
        JColor.Amber  => "j-color-amber",
        JColor.Red    => "j-color-red",
        JColor.Green  => "j-color-green",
        JColor.Ghost  => "j-color-ghost",
        JColor.White  => "j-color-white",
        _             => "j-color-cyan",
    };

    // ── Size → height / padding classes ─────────────────────────
    public static string Size(JSize s) => s switch
    {
        JSize.Xs => "j-size-xs",
        JSize.Sm => "j-size-sm",
        JSize.Md => "j-size-md",
        JSize.Lg => "j-size-lg",
        JSize.Xl => "j-size-xl",
        _        => "j-size-md",
    };

    // ── Variant → button appearance ──────────────────────────────
    public static string Variant(JVariant v) => v switch
    {
        JVariant.Solid   => "j-variant-solid",
        JVariant.Outline => "j-variant-outline",
        JVariant.Ghost   => "j-variant-ghost",
        JVariant.Danger  => "j-variant-danger",
        JVariant.Scan    => "j-variant-scan",
        _                => "j-variant-outline",
    };

    // ── Card style → frame class ─────────────────────────────────
    public static string CardStyle(JCardStyle s) => s switch
    {
        JCardStyle.CornerBracket => "j-card-s1",
        JCardStyle.Notched       => "j-card-s2",
        JCardStyle.SideRail      => "j-card-s3",
        JCardStyle.GlowBorder    => "j-card-s4",
        JCardStyle.PartialBorder => "j-card-s5",
        JCardStyle.DangerPulse   => "j-card-s6",
        JCardStyle.Hexagonal     => "j-card-s7",
        JCardStyle.Radar         => "j-card-s8",
        JCardStyle.DoubleFrame   => "j-card-s9",
        _                        => "j-card-s1",
    };

    // ── Button shape → shape class ───────────────────────────────
    public static string ButtonShape(JButtonShape s) => s switch
    {
        JButtonShape.LeftNotch     => "j-btn-left-notch",
        JButtonShape.RightNotch    => "j-btn-right-notch",
        JButtonShape.BothNotch     => "j-btn-both-notch",
        JButtonShape.Parallelogram => "j-btn-parallelogram",
        JButtonShape.GhostSkew     => "j-btn-ghost-skew",
        JButtonShape.BracketFrame  => "j-btn-bracket",
        JButtonShape.Hexagonal     => "j-btn-hex",
        JButtonShape.IconSquare    => "j-btn-icon-sq",
        JButtonShape.ScanFull      => "j-btn-scan-full",
        _                          => "j-btn-left-notch",
    };

    // ── State → state modifier class ────────────────────────────
    public static string State(JState s) => s switch
    {
        JState.Idle       => "j-state-idle",
        JState.Active     => "j-state-active",
        JState.Processing => "j-state-processing",
        JState.Warning    => "j-state-warning",
        JState.Error      => "j-state-error",
        JState.Success    => "j-state-success",
        _                 => "j-state-active",
    };

    // ── Animation speed → anim class ────────────────────────────
    public static string AnimSpeed(JAnimSpeed a) => a switch
    {
        JAnimSpeed.Off    => "j-anim-off",
        JAnimSpeed.Slow   => "j-anim-slow",
        JAnimSpeed.Normal => "j-anim-normal",
        JAnimSpeed.Fast   => "j-anim-fast",
        _                 => "j-anim-normal",
    };

    // ── Utility: combine multiple classes cleanly ────────────────
    public static string Combine(params string?[] classes)
        => string.Join(" ", classes.Where(c => !string.IsNullOrWhiteSpace(c)));
}
