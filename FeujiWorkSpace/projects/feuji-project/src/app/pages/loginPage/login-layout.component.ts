import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../models/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRepo } from '../../../models/user.repo';



@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css',
})
export class LoginLayoutComponent {

  public formData: FormGroup;
  empDataById: any;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private userRepo: UserRepo) {
    this.formData = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }

  login() {

    const userEmail = this.formData.get('userEmail')?.value;
    const userPassword = this.formData.get('userPassword')?.value;

    console.log("userEmail", userEmail);
    console.log("userPassword", userPassword);

    if (!userEmail || !userPassword) {
      console.error('Invalid email or password');
      return;
    }

    const data = { userEmail, userPassword };

    this.userService.login(data).subscribe((user: any) => {
      // if (user) {
        console.log("user>>>>>>>>>>>>>>>>>>>>>", user);
        this.userService.getEmployeeByid(user.userEmpId).subscribe(
          (result: any) => {
            console.log('Employee Details:', result);
            this.empDataById = result[0];
            console.log("this.empId DATA", this.empDataById);
            localStorage.setItem('user', JSON.stringify(this.empDataById));
           
          },
          (error) => {
            console.error('Error fetching employee details', error);
          }
        );

        // this.sendUser(user);
        const designation = user.designation;
        console.log('User designation:', designation);
        switch (designation) {
          case 'Admin':
            console.log("Navigated to admin page");
            this.router.navigate(['/admin/add-employee']);
            break;
          case 'Manager':
            console.log("Navigated to manager page");
            this.router.navigate(['/manager/manager-profile']);
            break;
          case 'PMO':
            console.log("Navigated to pmo page");
            this.router.navigate(['/add-account']);
            break;
          default:
            console.log("Navigated to employee page");
            this.router.navigate(['/employee/timesheet-home']);
            break;
        }
    },
    (error) => {
      alert('User Not registered')
      console.error('Error fetching employee details', error);
    }
    );
  }

  // sendUser(loggedInuser: any) {
  //   console.log(loggedInuser);
  //   const loggedInUserData = this.userRepo.getUserData(loggedInuser);
  //   console.log("loggedInUserData###########>>>", loggedInUserData);

  // }

}