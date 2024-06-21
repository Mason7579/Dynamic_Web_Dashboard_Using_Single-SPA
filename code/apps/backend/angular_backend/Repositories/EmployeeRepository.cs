using System;
using System.Net;
using System.Xml.Linq;
using Debugger_King.Interfaces;
using Debugger_King.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Debugger_King.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public Task<List<Employee>> GetEmployees()
        {
            return null;
        }
    }
}

