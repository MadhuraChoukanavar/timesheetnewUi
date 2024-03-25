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
<<<<<<< HEAD
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { MatDialogModule } from "@angular/material/dialog";
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
=======
import { EditholidayComponent } from './editholiday-component/editholiday-component.component';
import { UpdateEmlpoyeeComponent } from './update-emlpoyee/update-emlpoyee.component';
>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1

@NgModule({
  declarations: [
    AddEmployeeComponent,
    AdminViewProfileComponent,
    EmployeeDisplayComponent,
    AccountDisplayComponent,
    AccountAddComponent,
    UpdateAccountComponent,
    AddHolidayComponent,
    HolidayComponent,
<<<<<<< HEAD
    EditEmployeeComponent,
    AdminLandingPageComponent
  ],
=======
     EditholidayComponent,
     UpdateEmlpoyeeComponent
    ],
>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatDialogModule
  ]
})
export class adminModule { }
