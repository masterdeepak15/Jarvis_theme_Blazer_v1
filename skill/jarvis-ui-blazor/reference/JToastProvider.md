# JToastProvider

The fixed-position container that subscribes to the injectable `JToastService` and renders all active toasts as `JToast` items; place it once near the app root.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`); `JToastService` registered via `AddJarvisUI()`.

## Parameters
(none — it takes no `[Parameter]` properties; it injects `JToastService` internally.)

## Examples
### Basic
Place the provider once (e.g. in `App.razor` or `MainLayout.razor`; it is already included inside `JPageLayout`):

```razor
<JToastProvider />
```
### Realistic
Provider in the layout, plus any component raising toasts through the service:

```razor
@* MainLayout.razor *@
@Body
<JToastProvider />
```

```razor
@* Any page/component *@
@inject JToastService Toast

<JButton OnClick="@(() => Toast.Show("System online.", JState.Success))">Connect</JButton>
<JButton OnClick="@(() => Toast.Show("Link lost.", JState.Error))">Disconnect</JButton>
```

Service registration in `Program.cs`:
```csharp
builder.Services.AddJarvisUI(); // registers JToastService
```

## Use cases
- App-wide toast notifications driven from anywhere via `@inject JToastService Toast; Toast.Show(...)`.

## Notes
- Relationship: user code injects `JToastService` and calls `Toast.Show("msg", JState.Success)`; the service holds the toast list and raises `OnChange`; `JToastProvider` listens to `OnChange`, re-renders, and emits one `JToast` per active toast. Dismissing a toast calls `_service.Remove(toast.Id)`.
- Fixed bottom-right stack (newest on top), `z-index:2000`, `pointer-events:none` on the container (individual toasts re-enable pointer events).
- Implements `IDisposable`; uses `InvokeAsync(StateHasChanged)` because `OnChange` can fire from background threads.
- States come from `JarvisUI.Tokens.JState`.
