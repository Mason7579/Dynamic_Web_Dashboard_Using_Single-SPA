using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

public class RandomNumberHub : Hub
{
    private bool _continueSending = true;

    public async Task StartSendingRandomNumbers()
    {
        _continueSending = true;
        var random = new Random();
        while (_continueSending)
        {
            await Clients.Caller.SendAsync("ReceiveNumber", random.Next(1, 101));
            await Task.Delay(1000);
        }
    }

    public void StopSending()
    {
        _continueSending = false;
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        _continueSending = false;
        await base.OnDisconnectedAsync(exception);
    }
}