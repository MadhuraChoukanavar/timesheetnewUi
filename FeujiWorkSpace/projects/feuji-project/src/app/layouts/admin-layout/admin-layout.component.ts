import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  ngOnInit(): void {
    console.log('AdminLayoutComponent initialized');
  }
  adminMenuOptions = [
    {
      mainOption: 'Dashboard',icon: 'fa-solid fa-tachometer-alt',
      routerLink: '/admin/admin-home-page'
    },
    { mainOption: 'User', icon: 'bi bi-person',subOptions: [
      { label: 'View Profile', link: '/admin/admin-profile'},
    ] },
    { mainOption: 'Employee',icon: 'bi bi-people', subOptions: [
      // { label: 'Add Employee', link: '/admin/add-employee' },
      { label: 'View Employee', link: '/admin/display-employee' }
    ] }
    ,
    { mainOption: 'Account',icon: 'fa-solid fa-file-invoice-dollar', subOptions: [
      // { label: 'Add account', link: '/admin/add-account' },
      { label: ' View Account ', link: '/admin/account-display' },
      // { label: 'Update Account', link: '/admin/update-account' }
    ] }
    ,
    { mainOption: 'Holiday',icon: 'fas fa-gifts', subOptions: [
      { label: 'Holiday List', link: '/admin/holiday-list' },
      // { label: 'Add Holiday', link: '/admin/add-holiday' },
    ] }
  ];


}
