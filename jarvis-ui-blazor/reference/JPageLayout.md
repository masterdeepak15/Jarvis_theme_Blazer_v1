# JPageLayout

Full-application HUD shell with a fixed top/bottom HudBar, optional left sidebar, and an internally-scrolling main content area; use it as the root layout of a JARVIS-styled app (window never scrolls).

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| SystemName | `string` | `"JARVIS"` | Brand/system name shown in sidebar and top bar label. |
| Version | `string` | `"v4.2.1"` | Version string shown in sidebar and top bar label. |
| State | `JState` | `JState.Active` | Overall system state; drives sidebar status dot and top-bar LIVE indicator (LIVE shown when `Active`). |
| ShowSidebar | `bool` | `true` | Whether the left `JSidebar` is rendered. |
| SidebarWidth | `string` | `"220px"` | CSS width passed to the sidebar. |
| NavLabel | `string?` | `"Navigation"` | Section label above the sidebar nav slot. |
| ShowBootScreen | `bool` | `false` | If true, plays `JBootScreen` before showing the shell. |
| ShowWaveform | `bool` | `false` | Show waveform animation in the bottom HUD bar. |
| ShowTicks | `bool` | `true` | Show tick bars in the bottom HUD bar. |
| ShowRec | `bool` | `false` | Show blinking REC indicator in the bottom HUD bar. |
| ContentPadding | `string` | `"12px"` | CSS padding for the scrollable main content area. |

## Content slots
- `SidebarNav` (RenderFragment) — nav items for the sidebar; typically `JNavItem` elements.
- `SidebarFooter` (RenderFragment) — footer content inside the sidebar.
- `MainContent` (RenderFragment) — the main page content (scrolls internally).
- `TopBarContent` (RenderFragment) — extra content injected into the top HUD bar.
- `BottomBarContent` (RenderFragment) — extra content injected into the bottom HUD bar.

(No single default `ChildContent` slot — content goes into the named slots above.)

## Examples
### Basic
```razor
<JPageLayout SystemName="JARVIS" Version="v4.2.1">
    <MainContent>
        <h1>Dashboard</h1>
    </MainContent>
</JPageLayout>
```
### Realistic
```razor
<JPageLayout SystemName="JARVIS" Version="v4.2.1"
             State="JState.Active"
             NavLabel="Navigation"
             ShowWaveform="true" ShowTicks="true">
    <SidebarNav>
        <JNavItem Href="/" Icon="⊞" Label="Dashboard" Active="true" />
        <JNavItem Href="/skills" Icon="⚡" Label="Skills" Badge="12" />
        <JNavItem Href="/settings" Icon="⚙" Label="Settings" />
    </SidebarNav>
    <SidebarFooter>
        <JStatCard Title="CPU" Value="74%" />
    </SidebarFooter>
    <MainContent>
        <h1>System Overview</h1>
    </MainContent>
</JPageLayout>
```

## Use cases
- Root layout / `MainLayout.razor` for a JARVIS-themed Blazor app.
- Single-page HUD console with fixed chrome and a scrolling work area.

## Notes
- Internally composes `JBootScreen`, `JHudBar` (top + bottom), `JSidebar`, and a `JToastProvider`. Those CSS animations (`j-corner-blink`) come from the core CSS.
- `JarvisUI.Tokens` enum used: `JState`.
- Put `JNavItem` components inside the `SidebarNav` slot; they render correctly within the sidebar nav.
- The outer window does not scroll; only the `MainContent` panel scrolls (`overflow-auto`).
