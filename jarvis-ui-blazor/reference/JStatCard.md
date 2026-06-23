# JStatCard

Pre-wired metric card (label, big value, sub-text, optional progress bar and data rows) that wraps JCard with all 9 frame styles.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Style | JCardStyle | `JCardStyle.CornerBracket` | Card frame style (forwarded to JCard) |
| Color | JColor | `JColor.Cyan` | Accent color |
| State | JState | `JState.Active` | System state — also colors value/sub text |
| AnimSpeed | JAnimSpeed | `JAnimSpeed.Normal` | Animation speed scale |
| ShowScan | bool | `true` | Show animated scan line overlay |
| Class | string? | `null` | Additional CSS classes |
| Style_Css | string? | `null` | Inline style override |
| Title | string | `""` | Label shown above the value |
| Value | string | `""` | Main metric value |
| Sub | string? | `null` | Sub text under value |
| Badge | string? | `null` | Optional badge text shown top-right of card |
| BadgeColor | JColor | `JColor.Cyan` | Color of the optional badge |
| ShowStatusDot | bool | `false` | Show diamond status dot before sub text |
| BarValue | int? | `null` | 0–100; renders a progress bar below value when set |
| DataRows | List&lt;JStatCard.JDataRow&gt;? | `null` | Key/value data rows shown below value |
| ChildContent | RenderFragment? | `null` | Extra slot content rendered below all built-in content |

The 9 `JCardStyle` values are available via the `Style` parameter (see JCard).

## Content slots
- `ChildContent` (default slot) — extra content appended after built-in layout; optional.

## Examples
### Basic
```razor
<JStatCard Title="CPU" Value="74%" Sub="8 cores · nominal"
           Style="JCardStyle.Notched" BarValue="74" />
```
### Realistic
```razor
<JStatCard Title="THREAT"
           Value="Alert"
           Sub="sector 4 breach"
           Style="JCardStyle.DangerPulse"
           State="JState.Error"
           Badge="CRIT"
           BadgeColor="JColor.Red"
           ShowStatusDot="true"
           DataRows="@(new List<JStatCard.JDataRow> {
               new(\"Latency\", \"12ms\", 30),
               new(\"Load\", \"88%\", 88)
           })" />
```

## Use cases
- KPI / metric tiles on a dashboard.
- Status tiles with badge + progress bar + key/value breakdown.

## Notes
- `JDataRow` is a nested record: `JDataRow(string Key, string Value, int? BarPercent = null)`.
- Value and sub text color automatically follow `State` (Warning/Error/Success).
- Badge is rendered via JBadge at `JSize.Xs`.
