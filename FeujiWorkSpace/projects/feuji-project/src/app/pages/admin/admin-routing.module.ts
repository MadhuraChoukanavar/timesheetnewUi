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
import { AdminLandingPageComponent } from "./admin-landing-page/admin-landing-page.component";
import { UpdateEmlpoyeeComponent } from "./update-emlpoyee/update-emlpoyee.component";
import { EditholidayComponent } from "./editholiday-component/editholiday-component.component";
import { AccountProjectDisplayComponent } from "./account-project-display/account-project-display.component";
import { AddAccountProjectComponent } from "./add-account-project/add-account-project.component";
import { UpdateAccountProjectComponent } from "./update-account-project/update-account-project.component";


const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent  },
  { path: 'admin-profile',component: AdminViewProfileComponent  },
  { path: 'display-employee',component: EmployeeDisplayComponent},
  { path: 'add-account', component: AccountAddComponent  },
  { path: 'account-display',component: AccountDisplayComponent  },
  { path: 'update-account/:id',component:UpdateAccountComponent},
  { path: 'add-holiday',component:AddHolidayComponent},
  { path: 'holiday-list',component:HolidayComponent},
  { path: 'admin-home-page',component:AdminLandingPageComponent},
  {path: 'update-employee/:id',component:UpdateEmlpoyeeComponent},
  {path: 'edit-holiday',component:EditholidayComponent},
  { path: 'projects',component:AccountProjectDisplayComponent},
  { path: 'add-projects',component:AddAccountProjectComponent},
  { path: 'update-project/:id',component:UpdateAccountProjectComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }







