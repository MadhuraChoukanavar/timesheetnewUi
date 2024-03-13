import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { NgModule } from "@angular/core";
import { EmpViewProfileComponent } from "./emp-view-profile/emp-view-profile.component";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { HolidayComponent } from "./holiday/holiday.component";

@NgModule({
  declarations: [
    EmpViewProfileComponent,
    TimesheetHomeComponent,
    TimesheetHistoryComponent,
    HolidayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeeRoutingModule,
    CommonModule
  ]
})
export class employeeModule { }
