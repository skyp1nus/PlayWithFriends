var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddControllers();
builder.Services.AddSignalR();

app.MapControllers();
app.MapHub<LobbyHub>("/lobbyHub");

app.Run();