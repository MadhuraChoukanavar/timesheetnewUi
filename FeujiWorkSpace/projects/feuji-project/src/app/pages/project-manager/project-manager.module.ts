import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManagerViewProfileComponent } from "./manager-view-profile/manager-view-profile.component";
import { TimesheetapproveComponent } from "./timesheetapprove/timesheetapprove.component";
import { TimesheetHomeComponent } from "./timesheet-home/timesheet-home.component";
import { TimesheetHistoryComponent } from "./timesheet-history/timesheet-history.component";
import { ProjectManagerRoutingModule } from "./project-manager-routing.module";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
<<<<<<< HEAD
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component';
=======
import { TimesheetDayhistoryComponent } from "./timesheet-dayhistory/timesheet-dayhistory.component";
import { HolidayComponent } from "./holiday/holiday.component";
>>>>>>> master


@NgModule({
  declarations: [
    ManagerViewProfileComponent,
    TimesheetapproveComponent,
    TimesheetHomeComponent,
    TimesheetHistoryComponent,
    DailyStatusComponent,
<<<<<<< HEAD
    ManagerLandingPageComponent
=======
    TimesheetDayhistoryComponent,
    HolidayComponent
>>>>>>> master
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectManagerRoutingModule,
  ],
  providers:[
    DatePipe
  ]
})
export class projectManagerModule { }
