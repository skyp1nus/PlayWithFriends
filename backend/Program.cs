var builder = WebApplication.CreateBuilder(args);

// Додаємо сервіси до контейнера
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true) // Дозволити будь-яке джерело
            .AllowCredentials();
    });
});

var app = builder.Build();

// Налаштовуємо HTTP-запити і маршрут SignalR
app.UseCors("CorsPolicy");
app.MapControllers();
app.MapHub<LobbyHub>("/lobbyHub");

app.Run();