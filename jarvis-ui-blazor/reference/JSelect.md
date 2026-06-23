# JSelect

A HUD-style dropdown select with angular clip-path styling, corner brackets, and a custom arrow.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| Value | `string?` | `null` | Selected option value. Supports `@bind-Value`. |
| ValueChanged | `EventCallback<string?>` | — | Fired on selection change; backs `@bind-Value`. |
| Options | `List<JSelectOption>` | `new()` | Selectable options. `JSelectOption` is a record `(string Value, string Label)`. |
| Label | `string?` | `null` | Optional uppercase label above the select. |
| Placeholder | `string?` | `null` | Optional disabled placeholder option shown when no value. |
| Color | `JColor` (`JarvisUI.Tokens`) | `JColor.Cyan` | Accent color. |
| Disabled | `bool` | `false` | Disables and dims the select. |

## Events
- `ValueChanged` (`EventCallback<string?>`) — backs `@bind-Value`.

## Content slots
None — options are supplied via the `Options` parameter, not child content.

## Two-way binding
`@bind-Value` (`string?`).

## Examples
### Basic
```razor
<JSelect @bind-Value="selectedModel" Label="Model" Options="@models" />

@code {
    private string? selectedModel;
    private List<JSelect.JSelectOption> models = new()
    {
        new("llama3:8b", "LLaMA 3 8B"),
        new("phi3:mini", "Phi-3 Mini"),
    };
}
```
### Realistic
```razor
<JSelect @bind-Value="selectedModel"
         Label="Inference model"
         Placeholder="Select a model..."
         Color="JColor.Amber"
         Options="@models" />

@code {
    private string? selectedModel;
    private List<JSelect.JSelectOption> models = new()
    {
        new("llama3:8b",  "LLaMA 3 8B"),
        new("phi3:mini",  "Phi-3 Mini"),
        new("mistral:7b", "Mistral 7B"),
    };
}
```

## Use cases
- Choosing from a fixed list (models, modes, profiles) in HUD forms.

## Notes
- `JSelectOption` is a nested record: reference it as `JSelect.JSelectOption`.
- Provide a `Placeholder` to show a disabled prompt option when `Value` is empty.
