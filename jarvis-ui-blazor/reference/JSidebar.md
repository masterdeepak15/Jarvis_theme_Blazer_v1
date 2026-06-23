# JSidebar

HUD-styled left navigation sidebar with a brand header (spinner + name/version + status dot), a nav slot, an optional footer slot, and a system/time footer label.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| SystemName | `string` | `"JARVIS"` | Brand name shown in the header. |
| Version | `string` | `"v4.2.1"` | Version string shown under the brand name. |
| NavLabel | `string?` | `"Navigation"` | Uppercase section label above the nav slot; hidden if blank. |
| Width | `string` | `"220px"` | CSS width of the sidebar. |
| Color | `JColor` | `JColor.Cyan` | Accent color for the header spinner. |
| State | `JState` | `JState.Active` | Drives the brand status dot color/animation and the header spinner. |

## Content slots
- `NavContent` (RenderFragment) — navigation items (typically `JNavItem`).
- `FooterContent` (RenderFragment) — optional footer content (e.g. a `JStatCard`); section hidden if null.

## Examples
### Basic
```razor
<JSidebar SystemName="JARVIS" Version="v4.2.1">
    <NavContent>
        <JNavItem Href="/" Icon="⊞" Label="Dashboard" Active="true" />
    </NavContent>
</JSidebar>
```
### Realistic
```razor
<JSidebar SystemName="JARVIS" Version="v4.2.1" State="JState.Active" Color="JColor.Cyan" Width="240px">
    <NavContent>
        <JNavItem Href="/dashboard" Icon="⊞" Label="Dashboard" Active="true" />
        <JNavItem Href="/skills"    Icon="⚡" Label="Skills"    Badge="12" />
        <JNavItem Href="/settings"  Icon="⚙" Label="Settings" />
    </NavContent>
    <FooterContent>
        <JStatCard Title="CPU" Value="74%" />
    </FooterContent>
</JSidebar>
```

## Use cases
- Persistent left navigation in a HUD application.
- Used internally by `JPageLayout` (its `SidebarNav`/`SidebarFooter` feed this component's slots).

## Notes
- `JarvisUI.Tokens` enums used: `JColor`, `JState`.
- Composes `JSpinner` for the header indicator.
- Renders a fixed-height (`min-height:100vh`) flex column with an internally scrolling nav region.
- A footer "SYS · HH:mm" label reflects the current time at render and a static blinking LIVE marker.
