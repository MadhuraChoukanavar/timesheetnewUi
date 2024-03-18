import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './pages/loginPage/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { AdminLayoutRoutes } from './layouts/admin-layout/admin-layout.routing';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { PmoLayoutComponent } from './layouts/pmo-layout/pmo-layout.component';

const Routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import("../app/layouts/admin-layout/admin-layout.module").then((n) => n.AdminLayoutModule),
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import("../app/layouts/auth-layout/auth-layout.module").then((n) => n.AuthLayoutModule),
      }
    ]
  },
  {
    path: '',
    component: EmployeeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
         import('../app/layouts/employee-layout/employee-layout.module').then(m => m.EmpLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
         import('../app/layouts/manager-layout/manager-layout.module').then(m => m.ManagerLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: PmoLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
         import('../app/layouts/pmo-layout/pmo-layout.module').then(m => m.PmoLayoutModule)
      }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }