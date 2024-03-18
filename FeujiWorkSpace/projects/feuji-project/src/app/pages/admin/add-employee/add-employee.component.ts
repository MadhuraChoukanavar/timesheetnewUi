import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../models/employee.service';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SaveEmployee } from '../../../../models/saveemployee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls:[ './add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  public referenceData: SaveEmployee[]=[]
  public employee:any=Employee;
  public employmentTypes: SaveEmployee[]=[]
  public selectedEmploymentType: string = '';


  ngOnInit() {

    this.fetchEmploymentTypes(1);
    // this.fetchReferenceData(1);
    // this.getEmploymentTypes();
  }

  emp:Employee=new Employee(0,'','','','','','','','',new Date(),0,'','',0,'',new Date(),'','','',0,new Date(),'',new Date(),0,'');

  constructor(private empService:EmployeeService) { }

  sendEmployee() {
    this.empService.saveEmployee(this.emp).subscribe(res => {
      console.log('Employee saved:', res);
    },
    error => {
      console.error('Error saving employee:', error);
    }
    );
  }

  employeeCodeControl = new FormControl('', [Validators.required, this.checkForUniqueEmployeeCode()]);

  checkForUniqueEmployeeCode(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value; // Get the value of the control
      // Implement your logic to check for uniqueness here
      const isNotUnique = false; // Replace this with your actual logic
      // If the employee code is not unique, return an error object
      return isNotUnique ? { notUnique: true } : null;
    };
  }

  // fetchEmploymentTypes(referenceTypeId: number): void {
  //   this.empService.getEmploymentType(2)
  //   .subscribe((resp:any)=>{console.log(resp);
  //   })
  // }

  fetchEmploymentTypes(referenceTypeId: number): void {
    this.empService.getEmploymentType(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.employmentTypes = data;
      });
  }
}
