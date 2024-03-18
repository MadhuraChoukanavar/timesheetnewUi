import { NgModule } from "@angular/core";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AdminViewProfileComponent } from "./admin-view-profile/admin-view-profile.component";
import { EmployeeDisplayComponent } from "./employee-display/employee-display.component";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountDisplayComponent } from './account-display/account-display.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { AddHolidayComponent } from "./add-holiday/add-holiday.component";
import { HolidayComponent } from "./holiday/holiday.component";

@NgModule({
  declarations: [
    AddEmployeeComponent,
    AdminViewProfileComponent,
    EmployeeDisplayComponent,
    AccountDisplayComponent,
    AccountAddComponent,
    UpdateAccountComponent,
    AddHolidayComponent,
    HolidayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class adminModule { }