using JarvisUI.Tokens;

namespace JarvisUI.Docs;

/// <summary>
/// Scoped service — holds the active theme preset across all page navigations.
/// Registered in Program.cs as AddScoped&lt;ThemeState&gt;().
/// </summary>
public class ThemeState
{
    private JThemePreset _preset = JThemePreset.Cyan;

    public JThemePreset Preset => _preset;

    public event Action? OnChange;

    public void SetPreset(JThemePreset preset)
    {
        if (_preset == preset) return;
        _preset = preset;
        OnChange?.Invoke();
    }
}
