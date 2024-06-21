using System;
namespace Debugger_King.Models
{
	public class Employee
	{
		public int employee_ID { get; set; }
		public string? name { get; set; }
		public int age { get; set; }
		public string? address { get; set; }
    }

	public static class ListOfEmployee
	{
		public static List<Employee> list = new List<Employee> ();
	}
}

