global using Debugger_King.Interfaces;
global using Debugger_King.Models;
global using Debugger_King.Repositories;
using Bogus;
using Debugger_King;
using System;
using System.Text.Json;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:9000", "http://localhost", "http://cdn.localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddHostedService<FakeDateHostedService>();
builder.Services.AddHostedService<EmployeeUpdateService>();
builder.Services.AddSingleton<IEmployeeService, EmployeeService>();
builder.Services.AddSignalR();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapHub<EmployeeHub>("/api/angular-spa-api/hub/EmployeeInfo");

app.Run();

