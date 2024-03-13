import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../models/user.service';
import { UserRepo } from '../../../../models/user.repo';

@Component({
  selector: 'app-manager-view-profile',
  templateUrl: './manager-view-profile.component.html',
  styleUrl: './manager-view-profile.component.css'
})
export class ManagerViewProfileComponent implements OnInit {
  employee: Employee | undefined;
  empId: Employee = new Employee(0, '', '', '', '', '', '', '', '', new Date(), 0, '', '', 0, '', new Date(), '', '', '', 0, new Date(), '', new Date());
  public id: String = "";
  currentUser: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private userRepo: UserRepo) {
    const storedUser = localStorage.getItem('user');

    const user = storedUser ? JSON.parse(storedUser) : undefined;
    if (user !== null) {
      this.currentUser = user;
    }

    this.id = this.currentUser.userEmpId;
  }

  ngOnInit(): void {
    console.log(this.empId);

    this.userService.getEmployeeByid(this.id).subscribe
      (
        (result: any) => {
          this.employee = result[0];
          console.log("this.employee data", this.employee);

        },
        (error) => {
          console.error('Error fetching employee details', error);
        }
      );
  }
}
