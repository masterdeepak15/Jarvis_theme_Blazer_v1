# JRadio

A HUD-style radio button group rendering a list of options with angular diamond indicators and optional descriptions.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `string?` | `null` | Selected option value. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<string>` | — | Fired when a new option is selected; backs `@bind-Value`. |
| Options | `List<JRadioOption>` | `new()` | Options to render. `JRadioOption` is a record `(string Value, string Label, string? Description = null)`. |
| Label | `string?` | `null` | Optional uppercase group label. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| Horizontal | `bool` | `false` | Lays options out in a row instead of a column. |
| Disabled | `bool` | `false` | Disables and dims the whole group. |

## Events
- `ValueChanged` (`EventCallback<string>`) — backs `@bind-Value`. Note the callback type is `string` (non-nullable) while `Value` is `string?`.

## Content slots
None — options are supplied via the `Options` parameter, not child content.

## Two-way binding
`@bind-Value` (`string?`).

## Examples
### Basic
```razor
<JRadio @bind-Value="selectedModel" Label="Select Model" Options="@radioOptions" />

@code {
    private string? selectedModel;
    private List<JRadio.JRadioOption> radioOptions = new()
    {
        new("llama3:8b", "LLaMA 3 8B"),
        new("phi3:mini", "Phi-3 Mini"),
    };
}
```
### Realistic
```razor
<JRadio @bind-Value="selectedModel"
        Label="Select Model"
        Horizontal="true"
        Color="JColor.Amber"
        Options="@radioOptions" />

@code {
    private string? selectedModel = "phi3:mini";
    private List<JRadio.JRadioOption> radioOptions = new()
    {
        new("llama3:8b",  "LLaMA 3 8B",  "Fastest"),
        new("phi3:mini",  "Phi-3 Mini",  "Lightweight"),
        new("mistral:7b", "Mistral 7B",  "Balanced"),
    };
}
```

## Use cases
- Single-choice selection from a small set with optional per-option descriptions.

## Notes
- `JRadioOption` is a nested record: reference it as `JRadio.JRadioOption`; its `Description` is optional.
- Each group gets a unique generated `name`, so multiple `JRadio` groups on a page don't conflict.
