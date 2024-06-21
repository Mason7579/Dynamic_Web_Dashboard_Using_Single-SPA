using System;
using System.Text.Json;
using Bogus;
using Debugger_King.Models;
using System.Threading.Tasks;

namespace Debugger_King
{
    public class FakeDateHostedService : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //while (!stoppingToken.IsCancellationRequested)
            //{
                var Ids = 0;
                var FakeEmployee = new Faker<Employee>()
                    .RuleFor(o => o.employee_ID, f => Ids++)
                    .RuleFor(o => o.name, f => f.Name.FullName())
                    .RuleFor(o => o.age, f => f.Random.Number(18, 60))
                    .RuleFor(o => o.address, f => f.Address.FullAddress());
                /*foreach (var Employees in FakeEmployee.GenerateForever())
                {
                    ListOfEmployee.list.Add(Employees);
                    await Task.Delay(10000);
                }*/
                
                for (int i = 0; i < 20; i++)
                {
                    if (stoppingToken.IsCancellationRequested)
                        break;

                    var employee = FakeEmployee.Generate();
                    ListOfEmployee.list.Add(employee);

                    await Task.Delay(5000);
                }
            //}
        }
    }
}

