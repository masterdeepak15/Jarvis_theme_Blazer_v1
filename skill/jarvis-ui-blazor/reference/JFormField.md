# JFormField

A standardized form-field wrapper that renders a label, required indicator, optional tag, an input slot, and helper/error text around any JarvisUI input.

**Namespace:** `JarvisUI.Components`
**Requires:** core CSS (`jarvis-ui.css` + `jarvis-theme.css`).

## Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `Label` | `string?` | `null` | Uppercase field label shown above the input. Hidden when null/blank. |
| `Helper` | `string?` | `null` | Helper/hint text shown below the input. Only shown when there is no `Error`. |
| `Error` | `string?` | `null` | Error message shown below the input (takes priority over `Helper`); turns the label red. |
| `Tag` | `string?` | `null` | Small badge shown next to the label (e.g. "OPTIONAL", "BETA"). |
| `Required` | `bool` | `false` | Shows a pulsing red diamond next to the label. |
| `ChildContent` | `RenderFragment?` | `null` | The wrapped input element (the field slot). |

## Content slots
- `ChildContent` (default slot) — place the input component here (e.g. `JInput`, `JSelect`). Not strictly required by code, but the component is meaningless without it.

## Examples
### Basic
```razor
<JFormField Label="API Key">
    <JInput @bind-Value="apiKey" Placeholder="sk-..." />
</JFormField>
```
### Realistic
```razor
<JFormField Label="API Key" Required="true" Tag="SECRET" Error="@apiKeyError" Helper="Stored encrypted">
    <JInput @bind-Value="apiKey" Placeholder="sk-..." />
</JFormField>

@code {
    private string apiKey = "";
    private string? apiKeyError =>
        string.IsNullOrWhiteSpace(apiKey) ? "API key is required" : null;
}
```

## Use cases
- Giving form inputs consistent labels, helper text, and validation messaging.
- Marking required fields and surfacing inline error states.
- Tagging fields as optional/beta/secret with a small badge.

## Notes
- `Error` and `Helper` are mutually exclusive in rendering: when `Error` is set, `Helper` is not shown.
