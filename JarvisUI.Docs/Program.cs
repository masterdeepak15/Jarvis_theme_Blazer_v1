using JarvisUI.Extensions;
using JarvisUI.Docs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Register JarvisUI services
builder.Services.AddJarvisUI();

// Scoped theme state — persists across page navigations
builder.Services.AddScoped<ThemeState>();

// IHttpContextAccessor — needed by JLeafletMap to build absolute GeoJSON URLs
builder.Services.AddHttpContextAccessor();

// HttpClient for Blazor Server pages — base address set at request time
builder.Services.AddScoped(sp =>
{
    var accessor = sp.GetRequiredService<IHttpContextAccessor>();
    var req      = accessor.HttpContext?.Request;
    var baseUrl  = req != null ? $"{req.Scheme}://{req.Host}" : "http://localhost";
    return new HttpClient { BaseAddress = new Uri(baseUrl) };
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseHttpsRedirection();

// Register .geojson MIME type — ASP.NET Core does not serve unknown
// file extensions by default, causing 404 on /geojson/*.geojson requests.
var contentTypeProvider = new Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider();
contentTypeProvider.Mappings[".geojson"] = "application/json";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = contentTypeProvider,
});

app.UseAntiforgery();

app.MapRazorComponents<JarvisUI.Docs.Components.App>()
    .AddInteractiveServerRenderMode();

app.Run();
