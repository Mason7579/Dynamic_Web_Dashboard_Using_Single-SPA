using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

public interface IEmployeeService
{
    List<Employee> GetEmployee();
}

public class EmployeeService : IEmployeeService
{
    public List<Employee> GetEmployee()
    {
        return ListOfEmployee.list;
    }
}

public class EmployeeUpdateService : BackgroundService
{
    private readonly IHubContext<EmployeeHub> _hubContext;
    private readonly IEmployeeService _employeeService;
    private readonly TimeSpan _updateInterval = TimeSpan.FromSeconds(5);

    public EmployeeUpdateService(IHubContext<EmployeeHub> hubContext, IEmployeeService employeeService)
    {
        _hubContext = hubContext;
        _employeeService = employeeService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var employee = _employeeService.GetEmployee();
            await _hubContext.Clients.All.SendAsync("ReceiveEmployee", employee, stoppingToken);
            await Task.Delay(_updateInterval, stoppingToken);
        }
    }
}