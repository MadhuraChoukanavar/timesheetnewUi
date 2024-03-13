import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../models/employee.service';
import { Employee } from '../../../../models/employee.model';
import { UserService } from '../../../../models/user.service';

@Component({
  selector: 'app-admin-view-profile',
  templateUrl: './admin-view-profile.component.html',
  styleUrl: './admin-view-profile.component.css'
})
export class AdminViewProfileComponent implements OnInit{
  employee: Employee | undefined;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private userService :UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID from route parameters:', id);

      if (id !== null && !isNaN(+id)) {
        const empid = +id;

        this.userService.getEmployeeByid(empid).subscribe(
          (loggedInEmployee: Employee) => {
            console.log("fetched employee data:", loggedInEmployee);

            this.employee = loggedInEmployee;

            if (this.employee) {
              const employeeId = this.employee.employeeId;
              console.log('Employee ID:', employeeId);
            } else {
              console.error('Logged-in employee data is null.');
            }
          },
          (error) => {
            console.error('Error fetching logged-in employee details:', error);
          }
        );
      } else {
        console.error('ID is null.');
      }
    });
  }
}
