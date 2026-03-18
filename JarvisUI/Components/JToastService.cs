using JarvisUI.Tokens;

namespace JarvisUI.Components;

// ================================================================
//  JToastService — injectable toast trigger
//  Registered as Scoped by AddJarvisUI()
//
//  USAGE:
//  @inject JToastService Toast
//  Toast.Show("Skill loaded",  JState.Success);
//  Toast.Show("Memory high",   JState.Warning, duration: 6000);
//  Toast.Show("Engine error",  JState.Error,   title: "CRITICAL");
// ================================================================

public class JToastService
{
    private readonly List<JToastModel> _toasts = new();

    public IReadOnlyList<JToastModel> Toasts => _toasts.AsReadOnly();

    public event Action? OnChange;

    public void Show(
        string  message,
        JState  state    = JState.Active,
        string? title    = null,
        int     duration = 4000)
    {
        var toast = new JToastModel(
            Id:       Guid.NewGuid(),
            Message:  message,
            Title:    title,
            State:    state,
            Duration: duration
        );

        _toasts.Add(toast);
        OnChange?.Invoke();

        if (duration <= 0) return;

        // Auto-remove after duration + animation buffer
        _ = Task.Delay(duration + 500).ContinueWith(_ =>
        {
            Remove(toast.Id);
        });
    }

    public void Remove(Guid id)
    {
        _toasts.RemoveAll(t => t.Id == id);
        OnChange?.Invoke();
    }

    public void Clear()
    {
        _toasts.Clear();
        OnChange?.Invoke();
    }
}

public record JToastModel(
    Guid    Id,
    string  Message,
    string? Title,
    JState  State,
    int     Duration
);
