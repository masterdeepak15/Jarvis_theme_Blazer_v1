using Microsoft.Extensions.DependencyInjection;
using JarvisUI.Tokens;

namespace JarvisUI.Extensions;

// ================================================================
//  JARVIS UI — SERVICE REGISTRATION
//  In your Blazor Server Program.cs:
//
//    builder.Services.AddJarvisUI();
//
//  That's it. All components and services are ready.
// ================================================================

public static class JarvisUIServiceExtensions
{
    public static IServiceCollection AddJarvisUI(
        this IServiceCollection services,
        Action<JarvisUIOptions>? configure = null)
    {
        var options = new JarvisUIOptions();
        configure?.Invoke(options);

        services.AddSingleton(options);

        // Toast notification service — scoped per user session
        services.AddScoped<JarvisUI.Components.JToastService>();

        // HttpClient for JLeafletMap GeoJSON loading
        // Base address is configured at runtime from the request context
        services.AddHttpClient("JarvisUI");

        return services;
    }
}

// ================================================================
//  OPTIONS — global defaults the host app can override
// ================================================================

public class JarvisUIOptions
{
    /// <summary>Default color for all components unless overridden per-component</summary>
    public JColor DefaultColor { get; set; } = JColor.Cyan;

    /// <summary>Default animation speed</summary>
    public JAnimSpeed AnimSpeed { get; set; } = JAnimSpeed.Normal;

    /// <summary>Default card style when Style parameter is omitted</summary>
    public JCardStyle DefaultCardStyle { get; set; } = JCardStyle.CornerBracket;

    /// <summary>Default button shape when Shape parameter is omitted</summary>
    public JButtonShape DefaultButtonShape { get; set; } = JButtonShape.LeftNotch;

    /// <summary>
    /// Prefix applied to all CSS class names.
    /// Change only if you have conflicts with existing CSS.
    /// Default: "j-"
    /// </summary>
    public string ClassPrefix { get; set; } = "j-";
}
