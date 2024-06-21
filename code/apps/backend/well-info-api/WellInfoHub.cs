using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs
{
  public class WellInfoHub : Hub
  {
    private readonly Random _random;

    public WellInfoHub()
    {
      Console.WriteLine("WellInfoHub constructor");
      _random = new Random();
    }

    public override Task OnConnectedAsync()
    {
      Console.WriteLine($"Client connected: {Context.ConnectionId}");
      return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
      Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
      return base.OnDisconnectedAsync(exception);
    }
  }

  public class UIUpdateService : BackgroundService
  {
    private readonly IHubContext<WellInfoHub> _hubContext;
    private readonly Random _random;

    public UIUpdateService(IHubContext<WellInfoHub> hubContext)
    {
      _hubContext = hubContext;
      _random = new Random();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var timer = new PeriodicTimer(TimeSpan.FromSeconds(5));

      while (await timer.WaitForNextTickAsync(stoppingToken))
      {
        var wellInfoData = GenerateWellInfoGallons();
        await _hubContext.Clients.All.SendAsync("wellInfoData", wellInfoData);
      }
    }

    private WellInfo GenerateWellInfoGallons()
    {
      return new WellInfo
      {
        gallons = _random.Next(60, 80),
        timestamp = GetCurrentUnixTimestampMillis()
      };
    }

    private static readonly DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public static long GetCurrentUnixTimestampMillis()
    {
      DateTime localDateTime = DateTime.Now;
      DateTime univDateTime = localDateTime.ToUniversalTime();
      return (long)(univDateTime - UnixEpoch).TotalMilliseconds;
    }
  }

  public class WellInfo
  {
    public int gallons { get; set; }
    public long timestamp { get; set; }
  }
}
