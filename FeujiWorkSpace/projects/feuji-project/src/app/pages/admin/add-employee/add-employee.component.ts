import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../models/employee.service';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SaveEmployee } from '../../../../models/saveemployee.model';
import { SharedService } from '../../../../models/shared.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls:[ './add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  referenceUrl:string;
  genderReference:any
  gender:any
  businessUnitReference:any
  businessUnit:any
  deliveryUnitReference:any
  deliveryUnit:any
  statusReference:any
  status:any
  reportingManager:any
  reportingManagerReference:any
  public referenceData: SaveEmployee[]=[]
  public employee:any=Employee;
  public employmentTypes: SaveEmployee[]=[]
  public selectedEmploymentType: string = '';

  emp:Employee=new Employee(0,'','','','','','','','',new Date(),0,'','',0,'',new Date(),'','','',0,new Date(),'',new Date(),0,'');
  employeeTypeReference: any;

  constructor(private empService:EmployeeService,private shared : SharedService) {
    this.getAllReferenceType();
   this.referenceUrl = this.shared.referenceUrl
  }

  ngOnInit() {
  }

  sendEmployee() {
    console.log('Employee saved:',this.emp);
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

  fetchEmploymentTypes(referenceTypeId: number): void {
    this.empService.getByReferenceTypeId(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.employmentTypes = data;

      });
  }

  fetchGender(referenceTypeId: number): void {
    this.empService.getByReferenceTypeId(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.gender = data;
      });
  }

  fetchBusinessUnit(referenceTypeId: number): void {
    this.empService.getByReferenceTypeId(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.businessUnit = data;
      });
  }

  fetchDeliveryUnit(referenceTypeId: number): void {
    this.empService.getByReferenceTypeId(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.deliveryUnit = data;
      });
  }

  fetchStatus(referenceTypeId: number): void {
    this.empService.getByReferenceTypeId(referenceTypeId)
      .subscribe((data: SaveEmployee[]) => {
        this.status = data;
      });
  }

  fetchReportingManager(){
    this.empService.getReportingManager().subscribe(
        (resp:any) => {
            this.reportingManager=resp;
            console.log("Reporting Manager: ", this.reportingManager);
        },
        (error) => {
            console.error("Error fetching reporting managers:", error);
        }
    );
  }

  onSubmit() {
    // Retrieve the selected reporting manager ID directly from the select element
    const selectedReportingManagerId = (document.getElementById('reportingManager') as HTMLSelectElement).value;
    // Use the selectedReportingManagerId as needed, such as sending it to the server
    console.log("Selected Reporting Manager ID: ", selectedReportingManagerId);
    // Other submission logic...
  }

  getAllReferenceType(){
    this.empService.getAllReferenceType().subscribe((resp:any)=>{
      this.employeeTypeReference=resp.filter((item:any) => item.referenceTypeName === 'Employee Type').reverse().pop()
        console.log("employee Type",this.employeeTypeReference);
        if (this.employeeTypeReference.referenceTypeId) {
            this.fetchEmploymentTypes(this.employeeTypeReference.referenceTypeId)
        }

        this.genderReference=resp.filter((item:any) => item.referenceTypeName === 'Gender').reverse().pop()
        console.log("Gender",this.genderReference);
        if (this.genderReference.referenceTypeId) {
            this.fetchGender(this.genderReference.referenceTypeId)
        }

        this.businessUnitReference=resp.filter((item:any) => item.referenceTypeName === 'Business Unit').reverse().pop()
        console.log("Business Unit",this.businessUnitReference);
        if (this.businessUnitReference.referenceTypeId) {
            this.fetchBusinessUnit(this.businessUnitReference.referenceTypeId)
        }

        this.deliveryUnitReference=resp.filter((item:any) => item.referenceTypeName === 'Delivery Unit').reverse().pop()
        console.log("Delivery Unit",this.deliveryUnitReference);
        if (this.deliveryUnitReference.referenceTypeId) {
            this.fetchDeliveryUnit(this.deliveryUnitReference.referenceTypeId)
        }
        this.statusReference=resp.filter((item:any) => item.referenceTypeName === 'Employee Status').reverse().pop()
        console.log("Employee Status",this.statusReference);
        if (this.statusReference.referenceTypeId) {
            this.fetchStatus(this.statusReference.referenceTypeId)
        }

        this.reportingManagerReference=resp.filter((item:any) => item.referenceTypeName === 'Employee Status').reverse().pop()
        console.log("Employee Status",this.statusReference);
        if (this.statusReference.referenceTypeId) {
            this.fetchStatus(this.statusReference.referenceTypeId)
        }
      })
    }

    // checkEmailUnique(e:any){
    //   console.log(e);
    // }

    checkEmailUnique(email: any) {
      console.log(email);
console.log(this.emp.email);

      // this.empService.checkEmployeeEmail(email).subscribe(isUnique => {
      //   if (isUnique) {
      //     console.log('Email is unique.');
      //   } else {
      //     console.log('Email already exists.');
      //   }
      // });
    }

  }

