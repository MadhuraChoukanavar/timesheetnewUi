import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../models/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrl: './employee-display.component.css'
})
export class EmployeeDisplayComponent  implements OnInit {
  public employee:any[]=[];
  constructor(private empService: EmployeeService,private router: Router ){}
  ngOnInit(){
    console.log("loaded");
    this.getEmployeeDetails();
  }
  getEmployeeDetails(){
    this.empService.getEmployeeDetails().subscribe(data=>{
     console.log(data);
     this.employee=data;
     console.log(this.employee);
   })
}

editItem(id: string) {
  console.log(id);
  
  this.router.navigate(['/admin/update-employee', id]);
}

removeTask(employeeId:number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this holiday!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("component deleted", employeeId);
      this.empService.deleteEmployee(employeeId).subscribe(res => {
        console.log(res);
        // Handle success message or any other action after deletion
        this.getEmployeeDetails();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancel action
      // No deletion occurred
    }
  });
}
}
