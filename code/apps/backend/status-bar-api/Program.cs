using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(builder =>
  {
    builder
    .WithOrigins("http://localhost:5126", "http://localhost:9000", "http://localhost")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
  });
});

builder.Services.AddHostedService<BroadcastService>();

var app = builder.Build();

app.UseCors();

app.MapHub<StatusBarHub>("/api/status-bar-api/randomNumberHub");

app.Run();
