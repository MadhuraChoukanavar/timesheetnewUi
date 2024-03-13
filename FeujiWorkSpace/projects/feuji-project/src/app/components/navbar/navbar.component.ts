import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
// export class NavbarComponent {
//   // user: any;
//   // constructor(private router: Router

//   // ) {
//   //   const storedUser = localStorage.getItem('user');

//   //   // Check if storedUser is not null before parsing
//   //   this.user = storedUser ? JSON.parse(storedUser) : undefined;
//   //   // const user = JSON.parse(localStorage.getItem("user"));
//   //   // const token = localStorage.getItem("token");
//   //   if (this.user) {
//   //     this.router.navigate(["/dashboard"]);
//   //   } else {
//   //     this.router.navigate(["/login"]);
//   //   }
//   // }
//   // logout() {
//   //   localStorage.removeItem('user');
//   //   this.router.navigate(['/login']);
//   // }


//   user: any;

//   constructor(private router: Router) {}

//   ngOnInit() {
//     this.checkUser();
//   }

//   checkUser() {
//     const storedUser = localStorage.getItem('user');
//     this.user = storedUser ? JSON.parse(storedUser) : undefined;

//     // if (this.user) {
//     //   // User is logged in, show the logout button
//     //   this.router.navigate(['/dashboard']);
//     // } else {
//     //   // User is not logged in, show the login button
//     //   this.router.navigate(['/login']);
//     // }
//   }

//   logout() {
//     localStorage.removeItem('user');
//     this.checkUser(); // Redirect based on the user status
//   }
// }

export class NavbarComponent {
  user: any;

  constructor(private router: Router) {
    this.checkUser();

   }

  ngOnInit() {
  }

  checkUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : undefined;

    if (this.user) {
      const designation = this.user.designation;
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

    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.checkUser();
  }
}
