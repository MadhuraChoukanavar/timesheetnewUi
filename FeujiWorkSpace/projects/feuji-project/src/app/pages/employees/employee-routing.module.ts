import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { EmpViewProfileComponent } from "./emp-view-profile/emp-view-profile.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { HolidayComponent } from "./holiday/holiday.component";
import { DatePipe } from "@angular/common";
import { EditholidayComponent } from "../admin/editholiday-component/editholiday-component.component";

const routes: Routes = [
  { path: 'emp-profile',component: EmpViewProfileComponent},
  { path: 'timesheet-home', component: TimesheetHomeComponent },
  // { path: 'daily-timesheet',component:TimesheetapproveComponent},
  { path: 'timsheet-history',component:TimesheetHistoryComponent},
  { path: 'holiday-list',component:HolidayComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }