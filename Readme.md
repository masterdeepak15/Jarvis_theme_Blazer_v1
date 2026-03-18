# JarvisUI — Getting Started

## What's in this package

```
JarvisUI.sln              ← Open this in Visual Studio or Rider
JarvisUI/                 ← The RCL component library (reference this in your app)
JarvisUI.Docs/            ← Live docs playground (run this to explore all components)
```

---

## Option A — Run the Docs App (fastest way to explore)

```bash
# 1. Open terminal in the root folder (where JarvisUI.sln is)
cd JarvisUI.Docs
dotnet run

# 2. Open browser at https://localhost:5001
# You'll see the full live component playground
```

---

## Option B — Add JarvisUI to your own Blazor Server app

### Step 1 — Reference the RCL

In your app's `.csproj`:
```xml
<ProjectReference Include="..\JarvisUI\JarvisUI.csproj" />
```

Or add both to the same solution file and reference from there.

### Step 2 — Register services

```csharp
// Program.cs
builder.Services.AddJarvisUI();

// Optional — override defaults:
builder.Services.AddJarvisUI(options => {
    options.DefaultColor       = JColor.Cyan;
    options.AnimSpeed          = JAnimSpeed.Normal;
    options.DefaultCardStyle   = JCardStyle.Notched;
    options.DefaultButtonShape = JButtonShape.LeftNotch;
});
```

### Step 3 — Add CSS

In your `App.razor` or `_Layout.cshtml` `<head>`:
```html
<link rel="stylesheet" href="_content/JarvisUI/css/jarvis-ui.css" />
```

### Step 4 — Add global using

In your app's `_Imports.razor`:
```razor
@using JarvisUI.Components
@using JarvisUI.Tokens
```

### Step 5 — Add toast provider

In `App.razor` or `MainLayout.razor` (once, anywhere in the body):
```razor
<JToastProvider />
```

### Step 6 — Use the full app shell

Replace your layout with `JPageLayout`:
```razor
@* MainLayout.razor *@
@inherits LayoutComponentBase

<JPageLayout SystemName="JARVIS"
             Version="v1.0"
             State="JState.Active"
             ShowBootScreen="true"
             ShowTicks="true">

    <SidebarNav>
        <JNavItem Href="/"         Icon="⊞" Label="Dashboard" Active="@IsActive("/")" />
        <JNavItem Href="/skills"   Icon="⚡" Label="Skills"   Badge="12" />
        <JNavItem Href="/settings" Icon="⚙" Label="Settings" />
    </SidebarNav>

    <MainContent>
        @Body
    </MainContent>

</JPageLayout>

@code {
    [Inject] NavigationManager Nav { get; set; } = default!;
    bool IsActive(string href) => Nav.Uri.EndsWith(href);
}
```

---

## Using toast notifications

```csharp
@inject JToastService Toast

// Success
Toast.Show("Skill loaded successfully", JState.Success);

// Warning (stays 6 seconds)
Toast.Show("Memory usage high", JState.Warning, duration: 6000);

// Error with title
Toast.Show("Speech engine failed", JState.Error, title: "Critical");

// Info (default)
Toast.Show("JARVIS is online");
```

---

## Key components at a glance

```razor
@* Identity orb *@
<JOrb SystemName="JARVIS" State="JState.Active" Size="160px" @bind-Listening="listen" />

@* All 9 card styles *@
<JCard Style="JCardStyle.Notched" Title="CPU" Color="JColor.Cyan">
    <p class="j-text-val">74%</p>
</JCard>

@* Pre-built stat card *@
<JStatCard Title="Memory" Value="91%" Sub="high usage"
           Style="JCardStyle.DangerPulse" State="JState.Warning"
           BarValue="91" />

@* All 9 button shapes *@
<JButton Shape="JButtonShape.LeftNotch" OnClick="Execute">Execute</JButton>
<JButton Shape="JButtonShape.Parallelogram" Variant="JVariant.Ghost">Cancel</JButton>
<JButton Shape="JButtonShape.LeftNotch" Variant="JVariant.Danger">Shutdown</JButton>

@* Forms *@
<JFormField Label="Command" Required="true" Error="@err">
    <JInput @bind-Value="cmd" Placeholder="Type or speak..." />
</JFormField>
<JToggle  @bind-Value="listening" Label="Voice listening" />
<JSlider  @bind-Value="volume"    Label="Volume" Unit="%" />
<JCheckbox @bind-Value="autoStart" Label="Auto-start on boot" />

@* Radial menu (LINKS Mark II style) *@
<JRadialMenu @bind-Open="menuOpen" TriggerLabel="MENU">
    <JRadialItem Icon="⊞" Label="Dashboard" Angle="0"   OnClick="GoDash" />
    <JRadialItem Icon="⚡" Label="Skills"   Angle="72"  OnClick="GoSkills" />
    <JRadialItem Icon="⚙" Label="Settings" Angle="144" OnClick="GoSettings" />
    <JRadialItem Icon="📊" Label="Metrics" Angle="216" OnClick="GoMetrics" />
    <JRadialItem Icon="⏻" Label="Shutdown" Angle="288" State="JState.Error" />
</JRadialMenu>

@* Arc meter (LINKS Mark II mic level) *@
<JArcMeter Level="@micLevel" TotalArcs="6" ShowLabel="true" Label="MIC" />

@* Command palette *@
<JCommandPalette @bind-Visible="palOpen" Commands="@cmds" OnExecute="Run" />

@* Accordion *@
<JAccordion Title="Skill Registry" DefaultOpen="true" Icon="⚡" Badge="12">
    <JDataRow Key="TTS Engine"  Value="v2.1" BarPercent="100" />
    <JDataRow Key="Vision"      Value="v1.0" BarPercent="0" State="JState.Error" />
</JAccordion>

@* Table *@
<JTable Columns="@cols" Rows="@rows" StateColumn="status" />

@* Modal *@
<JModal @bind-Visible="showModal" Title="Confirm" State="JState.Error">
    <p>Confirm action?</p>
    <FooterContent>
        <JButton Shape="JButtonShape.LeftNotch" Variant="JVariant.Danger">Confirm</JButton>
    </FooterContent>
</JModal>
```

---

## CSS utility classes (use anywhere)

```html
<!-- Animations -->
<div class="j-scan-v">...</div>       <!-- vertical scan line -->
<div class="j-glitch">...</div>        <!-- glitch text effect -->
<div class="j-blink">...</div>         <!-- hard digital blink -->

<!-- States (override color + animation speed) -->
<div class="j-state-idle">...</div>
<div class="j-state-active">...</div>
<div class="j-state-warning">...</div>
<div class="j-state-error">...</div>

<!-- Animation speeds -->
<div class="j-anim-off">...</div>     <!-- no animations (accessibility) -->
<div class="j-anim-slow">...</div>    <!-- 2x slower -->
<div class="j-anim-fast">...</div>    <!-- 1.5x faster -->

<!-- Typography -->
<div class="j-text-xs">LABEL</div>   <!-- 9px uppercase tracked label -->
<div class="j-text-val">74%</div>    <!-- 22px bold value -->
<div class="j-text-sub">nominal</div><!-- 9px muted sub-text -->
<div class="j-text-ok">Online</div>  <!-- green state text -->
<div class="j-text-warn">High</div>  <!-- amber state text -->
<div class="j-text-err">Error</div>  <!-- red state text -->
```

---

## Requirements

- .NET 8.0 SDK
- Blazor Server (not WASM)
- No JavaScript required
- Tailwind CSS optional (all critical styles are in `jarvis-ui.css`)
