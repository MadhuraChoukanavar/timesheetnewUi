import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagerViewProfileComponent } from "./manager-view-profile/manager-view-profile.component";
import { TimesheetapproveComponent } from "./timesheetapprove/timesheetapprove.component";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { HolidayComponent } from "./holiday/holiday.component";


const routes: Routes = [
  { path: 'manager-profile',component: ManagerViewProfileComponent},
  { path: 'timesheet-approval', component: TimesheetapproveComponent },
  { path: 'DailyStatusComponent',component:DailyStatusComponent},
  { path: 'timesheet-homemanager', component: TimesheetHomeComponent},
 
  { path: 'timsheet-historymanager',component:TimesheetHistoryComponent},
  { path: 'holiday-list',component:HolidayComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
