using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace backend.Lobby
{
    public class LobbyHub : Hub
    {
        private static readonly ConcurrentDictionary<string, LobbyInfo> LobbyGames = new();

        // Створення нового лобі
        public async Task CreateLobby(string lobbyId, string gameName)
        {
            LobbyGames[lobbyId] = new LobbyInfo { GameName = gameName };
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
            await Clients.Group(lobbyId).SendAsync("LobbyCreated", lobbyId, gameName);
        }

        // Приєднання до існуючого лобі
        public async Task JoinLobby(string lobbyId)
        {
            if (LobbyGames.TryGetValue(lobbyId, out var lobbyInfo))
            {
                lobbyInfo.Players.Add(Context.ConnectionId);
                await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
                await Clients.Group(lobbyId).SendAsync("PlayerJoined", lobbyInfo.Players);
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
}