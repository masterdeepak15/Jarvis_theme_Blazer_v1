# JPagination

Angular page navigator that shows tick-segment indicators for small page counts and numbered buttons (with ellipses) for large counts.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Page` | `int` | `1` | Current page (1-based). Supports two-way binding. |
| `TotalPages` | `int` | `1` | Total number of pages. |
| `PageSize` | `int` | `5` | Number of numbered buttons shown in the windowed view (used when `TotalPages > 10`). |
| `ShowFirstLast` | `bool` | `false` | Show « first and » last buttons. |
| `ShowInfo` | `bool` | `true` | Show the `current / total` text. |
| `Color` | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |

## Events
| Event | Type | Description |
|---|---|---|
| `PageChanged` | `EventCallback<int>` | Fires with the new page when navigation occurs. Backs `@bind-Page`. |

## Content slots
(none)

## Two-way binding
- `@bind-Page` — binds the current page (int). Uses `PageChanged`.

## Examples
### Basic
```razor
<JPagination @bind-Page="currentPage" TotalPages="12" />

@code {
    private int currentPage = 1;
}
```
### Realistic
```razor
<JTable Columns="@cols" Rows="@pagedRows" />
<JPagination @bind-Page="page" TotalPages="@totalPages"
             ShowFirstLast="true" PageSize="5"
             PageChanged="OnPageChanged" />

@code {
    private int page = 1;
    private int totalPages = 24;
    private void OnPageChanged(int p) { /* load page p */ }
}
```

## Use cases
- Paging through `JTable` data or any list view.
- Compact tick-style page indicator for small result sets.

## Notes
- When `TotalPages <= 10`, pages render as angular tick bars; otherwise numbered buttons with `···` ellipses windowed around the current page (`PageSize` wide).
- `GoTo` clamps the target to `[1, TotalPages]` and is a no-op if unchanged, so `PageChanged` only fires on real changes.
- Prev/Next (and First/Last) buttons are disabled at the boundaries.
