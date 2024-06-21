import { Component, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { employee } from './models/employee.model';
import { EmployeeService } from './employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
Chart.register(...registerables);

const EMPLOYEE_DATA: employee[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-spa';
  displayedColumns: string[] = ['employee_ID', 'name', 'age', 'address'];
  dataSource = new MatTableDataSource<employee>(EMPLOYEE_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: EmployeeService) {}
  ngOnInit(): void {
    this.service.CreateConnection();
    this.service.employees$.subscribe((employees: employee[]) => {
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
    });
  }

  unloadWidget() {
    const unloadEvent = new Event('unloadEmployeeInfo');
    window.dispatchEvent(unloadEvent);
  }
}
