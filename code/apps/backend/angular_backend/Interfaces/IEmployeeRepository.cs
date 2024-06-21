using System;
using Debugger_King.Models;

namespace Debugger_King.Interfaces
{
	public interface IEmployeeRepository
	{
		public Task<List<Employee>> GetEmployees();
	}
}

