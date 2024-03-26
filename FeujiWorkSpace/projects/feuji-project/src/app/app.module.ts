import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { PmoLayoutComponent } from './layouts/pmo-layout/pmo-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../models/user.service';
import { EmployeeService } from '../models/employee.service';
import { DatePipe } from '@angular/common';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginLayoutComponent } from './pages/loginPage/login-layout.component';

import { SaveEmployee } from '../models/saveemployee.model';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { TimesheetHomeService } from '../models/timesheetHomeService.service';
import { DailyStatusComponent} from './pages/project-manager/daily-status/daily-status.component';


@NgModule({
  declarations: [
  AppComponent,
    NavbarComponent,
    FooterComponent,
    SidemenuComponent,
    AdminLayoutComponent,
    EmployeeLayoutComponent,
    ManagerLayoutComponent,
    PmoLayoutComponent,
    AuthLayoutComponent,
    LoginLayoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbCollapseModule,
    FormsModule
  ],

  providers: [UserService,TimesheetHomeService,
  EmployeeService,DatePipe, provideAnimationsAsync()],
 
 


  bootstrap: [AppComponent],

})
export class AppModule { }
