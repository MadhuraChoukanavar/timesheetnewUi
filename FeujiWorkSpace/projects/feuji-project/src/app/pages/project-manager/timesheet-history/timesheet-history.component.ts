import { Component } from '@angular/core';

@Component({
  selector: 'app-timesheet-history',
  templateUrl: './timesheet-history.component.html',
  styleUrl: './timesheet-history.component.css'
})
export class TimesheetHistoryComponent {
  
  toggleSubmenu(submenuClass: string) {
    const submenu = document.querySelector(`.${submenuClass}`);
    if (submenu) {
      submenu.classList.toggle('show');
    }
  }

}
