import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagerViewProfileComponent } from "./manager-view-profile/manager-view-profile.component";
import { TimesheetapproveComponent } from "./timesheetapprove/timesheetapprove.component";

const routes: Routes = [
  { path: 'manager-profile',component: ManagerViewProfileComponent},
  { path: 'timesheet-approval', component: TimesheetapproveComponent },
//   { path: 'daily-timesheet',component:TimesheetapproveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
