using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class LobbyHub : Hub
{
    // Створення нового лобі
    public async Task CreateLobby(string lobbyId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
        await Clients.Group(lobbyId).SendAsync("LobbyCreated", lobbyId);
    }

    // Приєднання до існуючого лобі
    public async Task JoinLobby(string lobbyId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
        await Clients.Group(lobbyId).SendAsync("PlayerJoined", Context.ConnectionId);
    }

    // Відправлення повідомлень гравцям у лобі
    public async Task SendMove(string lobbyId, string moveData)
    {
        await Clients.Group(lobbyId).SendAsync("ReceiveMove", moveData);
    }
}