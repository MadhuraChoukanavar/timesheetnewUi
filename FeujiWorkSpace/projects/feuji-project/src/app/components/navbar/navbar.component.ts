import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any;

  // constructor(private router: Router) {
  //   this.checkUser();

  //  }
  constructor(private router: Router, private titleService: Title) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitleFromRoute();
      }
    });
  }



  checkUser() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? storedUser : undefined;

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

  title: string = '';


  setTitleFromRoute() {
    // Get the current route URL
    const currentUrl = this.router.url;

    // Split the URL by '/' and get the last segment
    const segments = currentUrl.split('/');
    const lastSegment = segments[segments.length - 1];

    // Define logic to set the title based on the last segment of the route URL
    switch (lastSegment) {
      case 'add-employee':
        this.title = 'Add Employee';
        break;
      case 'admin-home-page':
        this.title = 'Home Page';
        break;
      case 'timesheetapproval':
        this.title = 'Timesheet Approval';
        break;
      case 'showEmpSkills':
        this.title = 'Update Skills';
        break;
      case 'employeeGap':
        this.title = 'Skill Gap';
        break;
      case 'training':
        this.title = 'Training Recommendations';
        break;
        case 'addSkills':
          this.title = 'Add Skills';
        break;
        case 'empskillgap':
          this.title = 'Employees Skill Gap';
        break;
        case 'trainingsrecommended':
          this.title = 'Employees Recommended For Training';
        break;

      default:
        this.title = 'Dashboard';
        break;
    }

    // Set the title in the browser tab
    this.titleService.setTitle(this.title);
  }

}