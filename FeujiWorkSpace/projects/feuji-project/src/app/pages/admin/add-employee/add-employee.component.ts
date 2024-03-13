import { Component } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../models/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls:[ './add-employee.component.css']
})
export class AddEmployeeComponent {

  public employee:any=Employee;
  public employeeCodeControl: any

  emp:Employee=new Employee(0,'','','','','','','','',new Date(),0,'','',0,'',new Date(),'','','',0,new Date(),'',new Date());

  constructor(private empService:EmployeeService) { }
  SendEmployee(emp:any){
    console.log(emp);
    this.empService.saveEmployee(emp).subscribe(res=>this.employee=res);
    console.log("hiiiiii");
  }

  checkEmployeeCode() {
    this.empService.checkEmployeeCodeUnique(this.emp.employeeCode)
      .subscribe(isUnique => {
        if (isUnique) {
          // The code is unique, no action needed
        } else {
          // The code is not unique, notify the user
          this.employeeCodeControl.setErrors({ notUnique: true });
        }
      });
  }


}
