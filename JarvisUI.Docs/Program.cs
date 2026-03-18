using JarvisUI.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Register JarvisUI — includes JToastService
builder.Services.AddJarvisUI();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<JarvisUI.Docs.Components.App>()
    .AddInteractiveServerRenderMode();

app.Run();
