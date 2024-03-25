import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../models/employee.service';
import { Employee } from '../../../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrl: './employee-display.component.css'
})
export class EmployeeDisplayComponent   {
//   searchTerm: string = '';
//   employees: Employee[] = [];
//   filteredEmployees: Employee[] = [];

//   constructor(private employeeService: EmployeeService,public dialog: MatDialog,private router: Router) { }

//   ngOnInit(): void {
//     this.loadEmployees();
//   }

//   loadEmployees(): void {
//     // Assuming you have a method in your EmployeeService to fetch all employees
//     this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
//       this.employees = data;
//       this.filteredEmployees = data; // Initially, display all employees
//     });
//   }

//   searchEmployees(): void {
//     if (this.searchTerm.trim() !== '') {
//       console.log('Searching for employees with name:', this.searchTerm);
//       this.employeeService.searchByEmployeeName(this.searchTerm).subscribe((data: any[]) => {
//         this.filteredEmployees = data;
//         console.log('Filtered employees:', this.filteredEmployees);
//       });
//     } else {
//       console.log('No search term provided. Displaying all employees.');
//       this.filteredEmployees = this.employees; // Reset to display all employees if search term is empty
//       console.log('All employees:', this.filteredEmployees);
//     }
//   }
//   editEmployee(employee: any): void {
//     const dialogRef = this.dialog.open(EditEmployeeComponent, {
//       width: '400px',
//       data: employee
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }

//   // Method to navigate to the Add Employee page
// navigateToAddEmployeePage() {
//   this.router.navigate(['/add-employee']); // Navigate to '/add-employee' route
// }

}
