

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5036); // Replace 9000 with your port
});
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:9000", "http://localhost", "http://cdn.localhost") // Frontend application's URL
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials()); 
});
var app = builder.Build();
app.UseCors("AllowSpecificOrigin");


app.MapGet("/", () => "Hello World!");

app.MapHub<RandomNumberHub>("api/bar-chart-backend/randomNumberHub");

app.Run();
