using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using JarvisUI.Docs;
using JarvisUI.Extensions;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Mount the root component(s) onto the static index.html host page
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// JarvisUI component library services
builder.Services.AddJarvisUI();

// Theme preset state — singleton in WASM (one user per browser tab)
builder.Services.AddSingleton<ThemeState>();

// HttpClient pointed at the app's own origin — used to fetch GeoJSON assets.
// In WASM there is no HttpContext; BaseAddress is the host environment origin.
builder.Services.AddScoped(sp =>
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();
