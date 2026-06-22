# JarvisUI

Cinematic HUD-style Blazor component library (Blazor **Server & WebAssembly**).
43 components. Inspired by JARVIS / LINKS Mark II.

🔴 **Live demo:** https://jarvis-theme-blazer.vercel.app/
📦 **NuGet:** https://www.nuget.org/packages/JarvisUI
💻 **Source (MIT, open source):** https://github.com/masterdeepak15/Jarvis_theme_Blazer_v1

## Install

```bash
dotnet add package JarvisUI
```

Or reference the project directly:

```xml
<ProjectReference Include="..\JarvisUI\JarvisUI.csproj" />
```
```csharp
// Program.cs
builder.Services.AddJarvisUI();
```
```html
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-ui.css" />
```
```razor
@using JarvisUI.Components
@using JarvisUI.Tokens
```

## Full App Shell

```razor
<JPageLayout SystemName="JARVIS" Version="v4.2.1"
             State="JState.Active" ShowBootScreen="true">
    <SidebarNav>
        <JNavItem Href="/"       Icon="⊞" Label="Dashboard" Active="true" />
        <JNavItem Href="/skills" Icon="⚡" Label="Skills" Badge="12" />
        <JNavItem Href="/config" Icon="⚙" Label="Settings" />
    </SidebarNav>
    <MainContent>@Body</MainContent>
</JPageLayout>
```

## All 38 Components

### Identity / HUD
JOrb, JArcMeter, JRadialMenu, JRadialItem, JSpinner, JWaveform,
JHudBar, JHudFrame, JBootScreen

### Cards
JCard (9 styles), JStatCard

### Buttons & Badges
JButton (9 shapes), JBadge, JStatusPill

### Forms
JInput, JTextArea, JSelect, JToggle, JSlider, JCheckbox, JRadio, JFormField

### Feedback
JAlert, JToast, JToastProvider, JToastService, JProgress, JModal

### Navigation & Layout
JPageLayout, JSidebar, JNavItem, JTabs, JTab, JAccordion, JCommandPalette

### Data
JTable, JDataRow, JPagination, JDivider

## Token Enums

```csharp
JColor:      Cyan | Blue | Amber | Red | Green | Ghost | White
JSize:       Xs | Sm | Md | Lg | Xl
JVariant:    Solid | Outline | Ghost | Danger | Scan
JCardStyle:  CornerBracket | Notched | SideRail | GlowBorder |
             PartialBorder | DangerPulse | Hexagonal | Radar | DoubleFrame
JButtonShape:LeftNotch | RightNotch | BothNotch | Parallelogram |
             GhostSkew | BracketFrame | Hexagonal | IconSquare | ScanFull
JState:      Idle | Active | Processing | Warning | Error | Success
JAnimSpeed:  Off | Slow | Normal | Fast
```
