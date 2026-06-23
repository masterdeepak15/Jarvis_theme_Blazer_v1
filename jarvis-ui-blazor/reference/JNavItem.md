# JNavItem

A single angular HUD navigation entry (icon + label + optional badge) that renders as an `<a>` link when `Href` is set, otherwise as a `<button>` raising `OnClick`.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Href | `string?` | `null` | If set, renders an `<a href>`; if null/blank, renders a `<button>`. |
| Icon | `string?` | `null` | Leading icon/glyph (e.g. an emoji or symbol); omitted if blank. |
| Label | `string` | `""` | Text label (rendered uppercase via CSS). |
| Badge | `string?` | `null` | Optional badge text (e.g. a count); omitted if blank. |
| Active | `bool` | `false` | Highlights the item as the current selection (accent rail + glow). |
| Color | `JColor` | `JColor.Cyan` | Accent color token. |
| State | `JState` | `JState.Active` | State token (accepted; styling primarily uses accent vars). |

## Events
- `OnClick` (`EventCallback`) — fired when rendered as a button (i.e. `Href` not set) and clicked.

## Examples
### Basic
```razor
<JNavItem Href="/dashboard" Icon="⊞" Label="Dashboard" Active="true" />
```
### Realistic
```razor
<JNavItem Href="/skills" Icon="⚡" Label="Skills" Badge="12" />
<JNavItem OnClick="HandleSettings" Icon="⚙" Label="Settings" Color="JColor.Amber" />

@code {
    void HandleSettings() { /* ... */ }
}
```

## Use cases
- Items inside a sidebar's nav slot.
- Routed links (with `Href`) or action buttons (with `OnClick`).

## Notes
- `JarvisUI.Tokens` enums used: `JColor`, `JState`.
- Intended to live inside `JSidebar`'s `NavContent` slot (or `JPageLayout`'s `SidebarNav` slot).
- `OnClick` only fires in button mode; if `Href` is set the item is a plain link and `OnClick` is ignored.
