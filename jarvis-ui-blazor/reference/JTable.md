# JTable

HUD-styled data table with angular headers, scan-flash hover, state-colored rows, and an animated accent border; driven by column definitions and dictionary rows.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`). Uses `JSpinner`, `JStatusPill`, and `JBadge` internally.

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Columns` | `List<JTableColumn>` | `new()` | Column definitions (label, key, width, align, badge flag). |
| `Rows` | `List<Dictionary<string,object>>` | `new()` | Row data; each dictionary maps a column `Key` to a cell value. |
| `StateColumn` | `string?` | `null` | Column key whose value determines per-row state (and renders as a `JStatusPill`). |
| `ShowFooter` | `bool` | `true` | Show the record-count footer. |
| `FooterLabel` | `string?` | `null` | Optional extra text on the right side of the footer. |
| `Color` | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |

## Events
(none)

## Content slots
(none — fully data-driven; no templated columns)

## Data models
### `JTableColumn`
`record JTableColumn(string Label, string Key, string? Width = null, string Align = "left", bool IsBadge = false)`
- `Label` — header text. `Key` — maps to the row dictionary key.
- `Width` — optional CSS width (e.g. `"60px"`). `Align` — `"left"`/`"center"`/`"right"`.
- `IsBadge` — render the cell value inside a `JBadge`.

### Rows
Each row is a `Dictionary<string,object>` keyed by column `Key`. Missing keys render as empty cells. Values are rendered via `ToString()`.

### Row state (via `StateColumn`)
The `StateColumn` value (case-insensitive) maps to `JState`:
- `warning`/`warn` → Warning, `error`/`danger` → Error, `success`/`ok` → Success, `idle`/`offline` → Idle, otherwise Active.
That column renders as a `JStatusPill`; the whole row is tinted by its state.

## Examples
### Basic
```razor
<JTable Columns="@cols" Rows="@rows" />

@code {
    private List<JTable.JTableColumn> cols = new()
    {
        new("ID", "id", Width: "60px"),
        new("Name", "name"),
        new("Status", "status", Align: "center"),
    };
    private List<Dictionary<string, object>> rows = new()
    {
        new() { ["id"] = "001", ["name"] = "TTS Engine", ["status"] = "Online" },
        new() { ["id"] = "002", ["name"] = "Speech Input", ["status"] = "Warning" },
    };
}
```
### Realistic
```razor
<JTable Columns="@cols" Rows="@rows" StateColumn="status"
        ShowFooter="true" FooterLabel="LIVE" />

@code {
    private List<JTable.JTableColumn> cols = new()
    {
        new("ID", "id", Width: "60px"),
        new("Service", "name"),
        new("Tier", "tier", IsBadge: true),
        new("Status", "status", Align: "center"),
    };
    private List<Dictionary<string, object>> rows = new()
    {
        new() { ["id"] = "001", ["name"] = "Core", ["tier"] = "P0", ["status"] = "ok" },
        new() { ["id"] = "002", ["name"] = "Cache", ["tier"] = "P1", ["status"] = "warn" },
    };
}
```

## Use cases
- Service/status dashboards with state-colored rows.
- Tabular telemetry where cells are plain text, badges, or status pills.

## Notes
- When `Rows` is null/empty, the body shows a `JSpinner` with a "NO DATA" message spanning all columns.
- Alternating rows and hover get an accent background; non-Active state rows get a colored left border.
- `IsBadge` columns are colored by row state (Active→Cyan, Warning→Amber, otherwise Red).
- There is no built-in sorting, paging, or row-click event — pair with `JPagination` for paging.
