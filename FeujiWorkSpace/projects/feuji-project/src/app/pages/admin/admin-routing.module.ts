import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AdminViewProfileComponent } from "./admin-view-profile/admin-view-profile.component";
import { EmployeeDisplayComponent } from "./employee-display/employee-display.component";
import { AccountAddComponent } from "./account-add/account-add.component";
import { AccountDisplayComponent } from "./account-display/account-display.component";
import { UpdateAccountComponent } from "./update-account/update-account.component";
import { AddHolidayComponent } from "./add-holiday/add-holiday.component";
import { HolidayComponent } from "./holiday/holiday.component";
<<<<<<< HEAD
import { AdminLandingPageComponent } from "./admin-landing-page/admin-landing-page.component";
=======
import { UpdateEmlpoyeeComponent } from "./update-emlpoyee/update-emlpoyee.component";
import { EditholidayComponent } from "./editholiday-component/editholiday-component.component";
>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent  },
  { path: 'admin-profile',component: AdminViewProfileComponent  },
  { path: 'display-employee',component: EmployeeDisplayComponent},
  { path: 'add-account', component: AccountAddComponent  },
  { path: 'account-display',component: AccountDisplayComponent  },
  { path: 'update-account/:id',component:UpdateAccountComponent},
  { path: 'add-holiday',component:AddHolidayComponent},
  { path: 'holiday-list',component:HolidayComponent},
<<<<<<< HEAD
  { path: 'admin-home-page',component:AdminLandingPageComponent}
=======
  {path: 'update-employee/:id',component:UpdateEmlpoyeeComponent},
  {path: 'edit-holiday',component:EditholidayComponent},

>>>>>>> 3a3f51af0db80ac59b2ef5a8f23f1ff226c5a4b1
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }







