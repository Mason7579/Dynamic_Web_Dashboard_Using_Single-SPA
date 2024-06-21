using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SignalRWebpack.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
        .WithOrigins("http://localhost:5148", "http://localhost:9000", "http://localhost")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });

});
builder.Services.AddHostedService<UIUpdateService>(); // Add this line to register the UIUpdateService

var app = builder.Build();
app.UseCors();
app.MapHub<MessengerHub>("/api/rig-messenger-api/hub");

app.Run();