using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs
{
  public class ChatHub : Hub
  {
    private Random _random;

    public ChatHub()
    {
      Console.WriteLine("ChatHub constructor");
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
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly Random _random;

    public UIUpdateService(IHubContext<ChatHub> hubContext)
    {
      _hubContext = hubContext;
      _random = new Random();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var timer = new PeriodicTimer(TimeSpan.FromSeconds(5));

      while (await timer.WaitForNextTickAsync(stoppingToken))
      {
        var environmentData = GenerateEnvironmentData();
        await _hubContext.Clients.All.SendAsync("environmentData", environmentData);

        var machineData = GenerateMachineData();
        await _hubContext.Clients.All.SendAsync("machineData", machineData);

        var overviewData = GenerateOverviewData();
        await _hubContext.Clients.All.SendAsync("overviewData", overviewData);
      }
    }

    private EnvironmentData GenerateEnvironmentData()
    {
      return new EnvironmentData
      {
        Temperature = _random.Next(60, 80),
        NoiseLevel = _random.Next(30, 79),
        Co2Level = _random.Next(350, 1000),
        AirQuality = _random.Next(0, 200)
      };
    }

    private MachineStatusData GenerateMachineData()
    {
      return new MachineStatusData
      {
        drillingSpeed = _random.Next(80, 300),
        pressure = _random.Next(30, 79),
        failures = _random.Next(0, 20),
        fluidLevels = _random.Next(80, 100)
      };
    }

    private OverviewData GenerateOverviewData()
    {
      return new OverviewData
      {
        efficiency = _random.Next(80, 100),
        activeDrills = _random.Next(10, 30),
      };
    }
  }

  public class EnvironmentData
  {
    public int Temperature { get; set; }
    public int NoiseLevel { get; set; }

    public int Co2Level { get; set; }
    public int AirQuality { get; set; }
  }

  public class MachineStatusData
  {
    public int drillingSpeed { get; set; }
    public int pressure { get; set; }

    public int failures { get; set; }
    public int fluidLevels { get; set; }
  }

  public class OverviewData
  {
    public int activeDrills { get; set; }
    public int efficiency { get; set; }
  }
}
