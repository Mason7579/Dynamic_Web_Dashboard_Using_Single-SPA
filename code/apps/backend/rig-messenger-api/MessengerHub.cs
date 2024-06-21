using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs
{
  public class MessengerHub : Hub
  {

    private Random _random;

    public MessengerHub()
    {
      Console.WriteLine("MessengerHub constructor");
      _random = new Random();
    }
    public override Task OnConnectedAsync()
    {
      Console.WriteLine($"Client connected: {Context.ConnectionId}");
      return base.OnConnectedAsync();
    }

    public async Task newMessage(string username, string message)
    {
      Console.WriteLine($"{username}: {message}");
      await Clients.All.SendAsync("messageReceived", username, message);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
      Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
      return base.OnDisconnectedAsync(exception);
    }

    protected override void Dispose(bool disposing)
    {
      base.Dispose(disposing);
    }
  }
  public class UIUpdateService : BackgroundService
  {
    private readonly IHubContext<MessengerHub> _hubContext;
    private readonly Random _random;

    private List<string> messageOptions = new List<string>
    {
      "Rig is online",
      "Rig is offline",
      "Rig is in critical condition",
      "Rig is resuming operations",
      "Rig is initiating operations",
      "Rig is shutting down",
    };
    private int messageId = 0;

    public UIUpdateService(IHubContext<MessengerHub> hubContext)
    {
      _hubContext = hubContext;
      _random = new Random();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var timer = new PeriodicTimer(TimeSpan.FromSeconds(2));

      while (await timer.WaitForNextTickAsync(stoppingToken))
      {
        var messageData = GenerateMessageData();
        await _hubContext.Clients.All.SendAsync("messageData", messageData);
      }
    }

    private MessageData GenerateMessageData()
    {
      return new MessageData
      {
        id = messageId++,
        timestamp = FormattedDateTime(),
        wellId = _random.Next(1, 100),
        message = messageOptions[_random.Next(messageOptions.Count)]
      };
    }

    public static string FormattedDateTime()
    {
        DateTime localDateTime = DateTime.Now;
        return localDateTime.ToString("yyyy-MM-dd HH:mm:ss");
    }
  }

  public class MessageData
  {
    public int id { get; set; }
    public string timestamp { get; set; } = string.Empty;
    public int wellId { get; set; }
    public string message { get; set; } = string.Empty;

  }
}