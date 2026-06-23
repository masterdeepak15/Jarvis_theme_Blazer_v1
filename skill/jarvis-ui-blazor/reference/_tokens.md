# Design Tokens — `JarvisUI.Tokens`

Every component is configured with these C# enums instead of raw CSS strings. Always
pass the enum member (`JColor.Amber`), never a string. Import with
`@using JarvisUI.Tokens`.

## `JColor` — accent color intent
| Member | Hex family | Use |
|---|---|---|
| `Cyan` | `#00e5ff` | primary HUD color (default) |
| `Blue` | `#0891b2` | secondary accent |
| `Amber` | `#f97316` | warning |
| `Red` | `#ef4444` | danger / error |
| `Green` | `#22c55e` | success / ok |
| `Ghost` | transparent | dim / subtle |
| `White` | high-contrast | light text |

## `JSize` — component scale
`Xs` (28px) · `Sm` (34px) · `Md` (40px, default) · `Lg` (48px) · `Xl` (56px)

## `JVariant` — fill/border style (buttons & similar)
`Solid` (filled) · `Outline` (border only) · `Ghost` (no border, subtle hover) ·
`Danger` (red pulse border) · `Scan` (full-width with scan-sweep shine)

## `JCardStyle` — 9 card frame designs
| Member | Look |
|---|---|
| `CornerBracket` | 4 L-shaped corner brackets + scan line (default) |
| `Notched` | cut TL + BR corners with filled triangle accents |
| `SideRail` | thick left rail + partial top/bottom tabs |
| `GlowBorder` | full glowing border + inner radial glow (selected/focus) |
| `PartialBorder` | partial L borders + roving border dot |
| `DangerPulse` | red/amber pulsing animated border (warning/error) |
| `Hexagonal` | hexagon clip-path panel |
| `Radar` | circular radar with rotating rings + sweep |
| `DoubleFrame` | outer + inner double border frame |

## `JButtonShape` — 9 angular button shapes
| Member | Look |
|---|---|
| `LeftNotch` | cut top-left corner + triangle accent (default) |
| `RightNotch` | cut top-right corner |
| `BothNotch` | cut both corners |
| `Parallelogram` | skewed with left rail |
| `GhostSkew` | dashed parallelogram, no fill |
| `BracketFrame` | double-bracket L-frame, no diagonal |
| `Hexagonal` | hexagon clip-path |
| `IconSquare` | small square w/ cut corner (icon-only) |
| `ScanFull` | full-width solid block + scan-sweep shine |

## `JState` — system state (color + animation intensity)
| Member | Color | Motion |
|---|---|---|
| `Idle` | dim | slow pulse |
| `Active` | cyan | normal |
| `Processing` | cyan | faster + scan |
| `Warning` | amber | moderate pulse |
| `Error` | red | fast pulse + blink |
| `Success` | green | gentle pulse |

## `JAnimSpeed` — animation speed
`Off` (reduced motion / accessibility) · `Slow` (2× slower) · `Normal` · `Fast` (1.5× faster)

## Global defaults (`AddJarvisUI(options => …)`)
`JarvisUIOptions`: `DefaultColor` (JColor.Cyan), `AnimSpeed` (JAnimSpeed.Normal),
`DefaultCardStyle` (JCardStyle.CornerBracket), `DefaultButtonShape` (JButtonShape.LeftNotch),
`ClassPrefix` (`"j-"`, change only on CSS conflicts).

## CSS utility classes (use on any plain element)
- Animations: `j-scan-v` (vertical scan line), `j-glitch` (glitch text), `j-blink` (digital blink)
- States: `j-state-idle` · `j-state-active` · `j-state-warning` · `j-state-error`
- Speed: `j-anim-off` · `j-anim-slow` · `j-anim-fast`
- Typography: `j-text-xs` (9px tracked label) · `j-text-val` (22px bold value) ·
  `j-text-sub` (muted sub) · `j-text-ok` / `j-text-warn` / `j-text-err`
- Layout: `j-dashboard-grid` (fixed-height panel grid filling the content area),
  `j-scroll` (scrollable panel region)
