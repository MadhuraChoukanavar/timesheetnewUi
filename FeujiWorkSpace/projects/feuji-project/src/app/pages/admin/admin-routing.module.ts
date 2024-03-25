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

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent  },
  { path: 'admin-profile',component: AdminViewProfileComponent  },
  { path: 'update-employee',component: EmployeeDisplayComponent},
  { path: 'add-account', component: AccountAddComponent  },
  { path: 'account-display',component: AccountDisplayComponent  },
  { path: 'update-account/:id',component:UpdateAccountComponent},
  { path: 'add-holiday',component:AddHolidayComponent},
  { path: 'holiday-list',component:HolidayComponent},
  { path: 'admin-home-page',component:AdminLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }







