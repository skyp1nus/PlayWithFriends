using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

public class LobbyHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> LobbyGames = new();

    // Створення нового лобі
    public async Task CreateLobby(string lobbyId, string gameName)
    {
        LobbyGames[lobbyId] = gameName;
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
        await Clients.Group(lobbyId).SendAsync("LobbyCreated", lobbyId, gameName);
    }

    // Приєднання до існуючого лобі
    public async Task JoinLobby(string lobbyId)
    {
        if (LobbyGames.TryGetValue(lobbyId, out var gameName))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
            await Clients.Group(lobbyId).SendAsync("PlayerJoined", Context.ConnectionId, gameName);
        }
        else
        {
            await Clients.Caller.SendAsync("LobbyNotFound", lobbyId);
        }
    }

    // Відправлення повідомлень гравцям у лобі
    public async Task SendMove(string lobbyId, string moveData)
    {
        await Clients.Group(lobbyId).SendAsync("ReceiveMove", moveData);
    }
}