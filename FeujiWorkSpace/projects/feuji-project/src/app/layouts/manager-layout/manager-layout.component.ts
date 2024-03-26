import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrl: './manager-layout.component.css'
})
export class ManagerLayoutComponent {

  ngOnInit() {
    console.log(this.managerMenuOptions);
    throw new Error('Method not implemented.');
  }
  managerMenuOptions = [
    { mainOption: 'User', icon: 'bi bi-person',subOptions: [
      { label: 'View Profile', link: '/manager/manager-profile' },
    ] },
    { mainOption: 'My Team',icon: 'bi bi-people', subOptions: [
      { label: 'New Team', link: '/manager/sub2.1' },
      { label: 'Create Team', link: '/manager/sub2.2' },
      { label: 'My Team', link: '/manager/sub2.2' },
    ] },
    { mainOption: 'Projects',icon: 'fa-solid fa-list-check', subOptions: [
      { label: 'Add Projects', link: '/manager/sub2.1' },
      { label: 'Projects History', link: '/manager/sub2.2' },
      { label: 'Project Approval', link: '/manager/sub2.3' },
    ] },
    { mainOption: 'Timesheet',icon: 'bi bi-calendar-check', subOptions: [
      { label: 'New Timesheet', link: '/manager/timesheet-homemanager' },
      { label: 'Timesheet History', link: '/manager/timsheet-historyamanager' },
      { label: 'Timesheet Approval', link: '/manager/timesheet-approval' },
      { link: '/manager/DailyStatusComponent' },

    ] },
    { mainOption: 'Skills', icon: 'bi bi-journal-text',subOptions: [
      { label: 'Add Skills', link: '/manager/sub2.1' },
      { label: 'Skill Gap', link: '/manager/sub2.2' }
    ] },
    { mainOption: 'Reports',icon: 'bi bi-bar-chart', subOptions: [
      { label: 'New Report', link: '/manager/sub2.1' },
      { label: 'Report History', link: '/manager/sub2.2' },
    ] },
  ];


}
