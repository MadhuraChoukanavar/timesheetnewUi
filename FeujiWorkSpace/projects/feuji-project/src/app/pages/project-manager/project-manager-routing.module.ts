import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagerViewProfileComponent } from "./manager-view-profile/manager-view-profile.component";
import { TimesheetapproveComponent } from "./timesheetapprove/timesheetapprove.component";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { ManagerLandingPageComponent } from "./manager-landing-page/manager-landing-page.component";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { HolidayComponent } from "./holiday/holiday.component";
import { TimesheetDayhistoryComponent } from "./timesheet-dayhistory/timesheet-dayhistory.component";

const routes: Routes = [
  { path: 'manager-profile',component: ManagerViewProfileComponent},
  { path: 'timesheet-approval', component: TimesheetapproveComponent },
  { path: 'DailyStatusComponent',component:DailyStatusComponent},
  { path: 'manager-home',component:ManagerLandingPageComponent},
//   { path: 'daily-timesheet',component:TimesheetapproveComponent}
  { path: 'timesheet-homemanager', component: TimesheetHomeComponent},
 
  { path: 'timsheet-historymanager',component:TimesheetDayhistoryComponent},
  { path: 'holiday-list',component:HolidayComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
