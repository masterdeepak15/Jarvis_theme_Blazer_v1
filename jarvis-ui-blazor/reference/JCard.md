# JCard

HUD-style frame card supporting 9 distinct visual styles with animated overlays and optional title/sub-label.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Style | JCardStyle | `JCardStyle.CornerBracket` | Frame style — one of 9 HUD designs |
| Color | JColor | `JColor.Cyan` | Active color — drives `--j-accent` CSS variable |
| State | JState | `JState.Active` | System state — overrides color + animation speed |
| AnimSpeed | JAnimSpeed | `JAnimSpeed.Normal` | Animation speed scale |
| ShowScan | bool | `true` | Show animated scan line overlay |
| Title | string? | `null` | Optional title label rendered above child content |
| SubLabel | string? | `null` | Optional sub-label rendered below value |
| Style_Css | string? | `null` | Inline style override (e.g. width, min-height) |
| Class | string? | `null` | Additional CSS classes merged onto root element |
| ChildContent | RenderFragment? | `null` | Child content — value, data rows, etc. |
| ContentTemplate | RenderFragment? | `null` | Overrides full inner content (replaces Title/SubLabel/ChildContent) |
| RadarPings | List&lt;JCard.RadarPing&gt; | 2 default pings | Radar ping dot positions (only used for `JCardStyle.Radar`) |

The 9 `JCardStyle` values: `JCardStyle.CornerBracket`, `JCardStyle.Notched`, `JCardStyle.SideRail`, `JCardStyle.GlowBorder`, `JCardStyle.PartialBorder`, `JCardStyle.DangerPulse`, `JCardStyle.Hexagonal`, `JCardStyle.Radar`, `JCardStyle.DoubleFrame`.

## Content slots
- `ChildContent` (default slot) — main card body; optional.
- `ContentTemplate` — full-replacement slot; when supplied, Title/SubLabel/ChildContent are ignored.

## Examples
### Basic
```razor
<JCard Style="JCardStyle.Notched" Title="CPU Load" Color="JColor.Cyan">
    <p class="j-text-val">74%</p>
</JCard>
```
### Realistic
```razor
<JCard Style="JCardStyle.DangerPulse"
       State="JState.Error"
       Color="JColor.Red"
       Title="THREAT LEVEL"
       SubLabel="sector 4 breach"
       Style_Css="width:240px;">
    <p class="j-text-val j-text-err">ALERT</p>
</JCard>
```

## Use cases
- Dashboard metric panels with a HUD frame.
- Status/threat panels driven by `State`.
- Radar-style centerpiece display (use `JCardStyle.Radar` with `RadarPings`).

## Notes
- `RadarPing` is a nested record: `RadarPing(string Top, string Left, string Delay)`.
- `JCardStyle.Radar` renders content in a centered overlay; `JCardStyle.DoubleFrame` wraps content in an inner frame.
- `ShowScan` is honored only by styles that include scan-line overlays (CornerBracket, Notched, SideRail, GlowBorder, DangerPulse).
