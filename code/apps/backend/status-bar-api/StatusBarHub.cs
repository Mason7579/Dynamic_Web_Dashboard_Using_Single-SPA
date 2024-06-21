using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
  public class StatusBarHub : Hub
  {
    private readonly Random _random;

    public StatusBarHub()
    {
      _random = new Random();
    }
  }

  public class StatusData
  {
    public int safetyIndex { get; set; }
    public bool safetyIndexUp { get; set; }
  }

  public class BroadcastService : BackgroundService {
    private readonly IHubContext<StatusBarHub> _hubContext;
    private readonly Random _random;

    public BroadcastService(IHubContext<StatusBarHub> hubContext)
    {
        _hubContext = hubContext;
        _random = new Random();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
      var timer = new PeriodicTimer(TimeSpan.FromSeconds(5));

      var statusData = new StatusData {
        safetyIndex = _random.Next(0, 100),
      };

      while (await timer.WaitForNextTickAsync(stoppingToken))
      {
        bool safetyIndexUp;

        statusData.safetyIndex = UpdateSafetyIndex(statusData.safetyIndex, out safetyIndexUp);
        statusData.safetyIndexUp = safetyIndexUp;

        await _hubContext.Clients.All.SendAsync("ReceiveRandomNumber", statusData);
      }
    }

    private int UpdateSafetyIndex(int num, out bool isUp)
    {
      isUp = false;

      if (_random.Next() % 2 == 0 && num < 100) {
        num++;
        isUp = (num >= 60) ? true : false;
      }
      else if (num > 0) {
        num--;
        isUp = (num >= 60) ? true : false;
      }

      return num;
    }
  }
}