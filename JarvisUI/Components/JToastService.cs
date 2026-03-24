using JarvisUI.Tokens;
using Microsoft.AspNetCore.Components;

namespace JarvisUI.Components;

// ================================================================
//  JToastService — injectable toast trigger (Scoped)
//
//  USAGE:
//  @inject JToastService Toast
//  Toast.Show("Saved",         JState.Success);
//  Toast.Show("Memory high",   JState.Warning, duration: 6000);
//  Toast.Show("Engine error",  JState.Error,   title: "CRITICAL");
// ================================================================

public class JToastService
{
    private readonly List<JToastModel> _toasts = new();

    public IReadOnlyList<JToastModel> Toasts => _toasts.AsReadOnly();

    // Raised on the calling thread — subscribers must marshal to UI thread themselves
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
        NotifyChange();

        if (duration <= 0) return;

        // Auto-remove after duration + slide-out buffer
        var id = toast.Id;
        _ = Task.Delay(duration + 600).ContinueWith(_ => Remove(id));
    }

    public void Remove(Guid id)
    {
        _toasts.RemoveAll(t => t.Id == id);
        NotifyChange();
    }

    public void Clear()
    {
        _toasts.Clear();
        NotifyChange();
    }

    private void NotifyChange()
    {
        try { OnChange?.Invoke(); }
        catch { /* subscriber may have been disposed */ }
    }
}

public record JToastModel(
    Guid    Id,
    string  Message,
    string? Title,
    JState  State,
    int     Duration
);
