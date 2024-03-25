import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManagerViewProfileComponent } from "./manager-view-profile/manager-view-profile.component";
import { TimesheetapproveComponent } from "./timesheetapprove/timesheetapprove.component";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { ProjectManagerRoutingModule } from "./project-manager-routing.module";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component';


@NgModule({
  declarations: [
    ManagerViewProfileComponent,
    TimesheetapproveComponent,
    TimesheetHomeComponent,
    TimesheetHistoryComponent,
    DailyStatusComponent,
    ManagerLandingPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectManagerRoutingModule,
  ]
})
export class projectManagerModule { }
