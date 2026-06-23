# JNodeGraph

Interactive HUD relation graph: draggable nodes connected by animated SVG bezier edges that redraw in real time as nodes move. Pure Blazor.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Nodes` | `List<NodeDef>` | `new()` | Graph nodes with positions, shapes, labels, and colors. |
| `Edges` | `List<EdgeDef>` | `new()` | Connections between nodes (by node `Id`). |
| `Width` | `string` | `"100%"` | CSS width of the graph container. |
| `Height` | `string` | `"420px"` | CSS height of the graph container. |
| `Title` | `string?` | `null` | Optional title label shown top-left. |
| `ShowLegend` | `bool` | `true` | Show the bottom-right "DRAG NODES" hint legend. |

## Events
(none — dragging is handled internally; node positions are not surfaced via callbacks)

## Content slots
(none — fully data-driven)

## Data models
### `NodeDef`
`record NodeDef(string Id, string Label, double X = 0, double Y = 0, NType Type = NType.Chip, JColor Color = JColor.Cyan, string? Sub = null, string? Value = null, bool Pulse = false)`
- `Id` — unique node id (referenced by edges). `Label` — primary text. `X`/`Y` — initial position (px).
- `Type` — `NType` enum: `Chip` (parallelogram, default), `Hub` (circle), `Diamond`, `Hex`.
- `Color` — `JColor` (`JarvisUI.Tokens`). `Sub` — optional subtext. `Value` — optional right-aligned value (chip only). `Pulse` — pulsing status dot (chip only).

### `EdgeDef`
`record EdgeDef(string From, string To, JColor Color = JColor.Cyan, EdgeStyle Style = EdgeStyle.Solid, bool Arrow = true, bool Animated = true, double AnimDur = 2.0, string? Label = null)`
- `From`/`To` — node ids. `Color` — `JColor`. `Style` — `EdgeStyle` enum: `Solid`, `Dashed`, `Dotted`.
- `Arrow` — draw an arrowhead. `Animated` — moving dot along the edge. `AnimDur` — animation seconds. `Label` — optional edge label.

## Examples
### Basic
```razor
<JNodeGraph Nodes="@nodes" Edges="@edges" Title="MY GRAPH" />

@code {
    private List<JNodeGraph.NodeDef> nodes = new()
    {
        new("core", "CORE", 60, 160, JNodeGraph.NType.Hub),
        new("db", "DATABASE", 280, 80, JNodeGraph.NType.Chip, Sub: "postgres"),
    };
    private List<JNodeGraph.EdgeDef> edges = new()
    {
        new("core", "db"),
    };
}
```
### Realistic
```razor
<JNodeGraph Nodes="@nodes" Edges="@edges" Title="SUBSYSTEMS"
            Width="100%" Height="500px" ShowLegend="true" />

@code {
    private List<JNodeGraph.NodeDef> nodes = new()
    {
        new("core", "CORE", 80, 200, JNodeGraph.NType.Hub, Sub: "v2.1", Pulse: true),
        new("api", "API", 320, 100, JNodeGraph.NType.Chip, JColor.Green, "REST", "OK"),
        new("cache", "CACHE", 320, 300, JNodeGraph.NType.Hex, JColor.Amber),
        new("auth", "AUTH", 560, 200, JNodeGraph.NType.Diamond, JColor.Red),
    };
    private List<JNodeGraph.EdgeDef> edges = new()
    {
        new("core", "api", JColor.Green, JNodeGraph.EdgeStyle.Solid, Label: "serves"),
        new("core", "cache", JColor.Amber, JNodeGraph.EdgeStyle.Dashed, Animated: true),
        new("api", "auth", JColor.Red, JNodeGraph.EdgeStyle.Dotted, Arrow: true, Animated: false),
    };
}
```

## Use cases
- Visualizing system/service topology and data relations.
- Interactive diagrams where users drag nodes to rearrange.
- Animated flow/dependency graphs (moving dots, arrowed edges).

## Notes
- Node positions are tracked internally; dragging updates them but is not reported back via any callback. New nodes (by `Id`) seed from their `X`/`Y`; stale ids are removed in `OnParametersSet`.
- Edge attach points (ports) depend on node type: Hub/Diamond/Hex connect at center; Chip connects at the nearest left/right mid-edge.
- Each instance generates a unique SVG id prefix, so multiple graphs on one page won't collide.
