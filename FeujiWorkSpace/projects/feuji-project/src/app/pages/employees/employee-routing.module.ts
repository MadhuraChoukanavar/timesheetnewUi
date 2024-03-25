import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { EmpViewProfileComponent } from "./emp-view-profile/emp-view-profile.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { HolidayComponent } from "./holiday/holiday.component";
import { DatePipe } from "@angular/common";
<<<<<<< HEAD
import { EmployeeLandingPageComponent } from "./employee-landing-page/employee-landing-page.component";
=======
import { EditholidayComponent } from "../admin/editholiday-component/editholiday-component.component";
>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1

const routes: Routes = [
  { path: 'emp-profile',component: EmpViewProfileComponent},
  { path: 'timesheet-home', component: TimesheetHomeComponent },
  // { path: 'daily-timesheet',component:TimesheetapproveComponent},
  { path: 'timsheet-history',component:TimesheetHistoryComponent},
<<<<<<< HEAD
  { path: 'holiday-list',component:HolidayComponent},
  { path: 'employee-home',component:EmployeeLandingPageComponent}
=======
  { path: 'holiday-list',component:HolidayComponent},  
  
>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }