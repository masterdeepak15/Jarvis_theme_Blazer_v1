# JModal

A notched-corner HUD modal dialog with backdrop blur, animated corner brackets and scan line, a header (title/subtitle/close), body slot, and optional footer slot.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Visible` | `bool` | `false` | Whether the modal is shown. Supports two-way binding via `@bind-Visible`. |
| `Title` | `string` | `""` | Uppercase dialog title. |
| `SubTitle` | `string?` | `null` | Small overline shown above the title. |
| `Closable` | `bool` | `true` | Shows the ✕ close button in the header. |
| `CloseOnBackdrop` | `bool` | `true` | Closes the modal when the backdrop is clicked. |
| `Width` | `string` | `"480px"` | Dialog width (capped to viewport). |
| `NotchSize` | `string` | `"18px"` | Size of the corner notch / triangle accent. |
| `Color` | `JColor` | `JColor.Cyan` | Accent color token (overridden by non-Active `State`). |
| `State` | `JState` | `JState.Active` | Drives accent color: `Warning`/`Error`/`Success` change the accent. |
| `ChildContent` | `RenderFragment?` | `null` | Modal body content (default slot). |
| `FooterContent` | `RenderFragment?` | `null` | Footer content (typically action buttons). |

## Events
| Event | Type | Description |
|---|---|---|
| `VisibleChanged` | `EventCallback<bool>` | Fired when visibility changes (powers `@bind-Visible`). |

## Two-way binding
- `@bind-Visible` (bool) — `Visible` + `VisibleChanged`.

## Content slots
- `ChildContent` (default slot) — the dialog body.
- `FooterContent` — optional footer; the footer region is only rendered when provided. Place action buttons here.

## Examples
### Basic
```razor
<JModal @bind-Visible="showModal" Title="Details">
    <p>Some content here.</p>
</JModal>

@code { private bool showModal; }
```
### Realistic
```razor
<JModal @bind-Visible="showModal" Title="Confirm Shutdown" SubTitle="SYSTEM"
        State="JState.Error" CloseOnBackdrop="false">
    <p>Are you sure you want to shut down all systems?</p>
    <FooterContent>
        <JButton Shape="JButtonShape.LeftNotch" Variant="JVariant.Danger"
                 OnClick="HandleConfirm">Confirm</JButton>
        <JButton Shape="JButtonShape.GhostSkew"
                 OnClick="() => showModal = false">Cancel</JButton>
    </FooterContent>
</JModal>

@code {
    private bool showModal;
    private void HandleConfirm() { showModal = false; }
}
```

## Use cases
- Confirmation dialogs, forms, and detail panels overlaid on the page.
- State-colored modals for destructive (Error) or success confirmations.

## Notes
- Uses `JarvisUI.Tokens.JState` and `JColor`.
- Setting `Visible = false` in calling code (e.g. a Cancel button) also closes it because of two-way binding.
