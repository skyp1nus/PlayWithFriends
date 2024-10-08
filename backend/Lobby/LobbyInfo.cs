namespace backend.Lobby;

public class LobbyInfo
{
    public string GameName { get; set; }
    public List<string> Players { get; set; } = new List<string>();
}