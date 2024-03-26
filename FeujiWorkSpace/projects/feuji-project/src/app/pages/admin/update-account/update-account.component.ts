import { Component, OnInit } from '@angular/core';
import { AccountserviceService } from '../../../../models/accountservice.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../../models/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent  implements OnInit {
  constructor(private ref:ActivatedRoute,private accountService :AccountserviceService){}
      public accountid:String="";




      public account:any=Account;
      public emplyoee: any[] = [];
  public businessUnitType: any[] = [];
  public statusTypes:any[]=[];
  
  public acc:any;
   ngOnInit(): void {
    this.accountid = "" +this.ref.snapshot.paramMap.get('id');
    this.send(this.accountid);
this.getBusinessUnitType();
this.getStatusType();
this.getEmployeeName();
   }

   send(accountid:any){
     this.accountService.getAccountByUuId(this.accountid).subscribe(
     (items)=>{
     this.acc=items[0];
     console.log(items);

     }

   )
   }
   updateAccount(uuid:any,isDeleted:boolean) {
    this.acc.uuId=uuid;
    console.log(isDeleted);
    

    this.acc.isDeleted=isDeleted;

    console.log(this.acc);
    this.accountService.updateAccount(this.acc).subscribe({
      next: (res) => {
        this.account = res;
        alert(this.acc)
        alert(this.account)
        console.log(this.account);
        
        Swal.fire('Success', 'Data updated', 'success');
      },
      error: (error) => {
        console.error('There was an error!', error);
        Swal.fire('Error', 'Failed to update data: ' + error.message, 'error');
      }
    });
}
getEmployeeName(): void {

  this.accountService.getEmployeeName().subscribe(
    (data) => {
      this.emplyoee = data;
    },
    error => {
      console.error('Error occurred while fetching account names:', error);
    }
  );
}



getBusinessUnitType() {
  this.accountService.getBusinessUnitType().subscribe((businessUnit:any[]) => {
    console.log(businessUnit+":::::::::");
    this.businessUnitType = businessUnit;
  });
}
getStatusType() {
  this.accountService.getStatusType().subscribe((status:any[]) => {
    console.log(status);
    console.log("status:::::::::");

    this.statusTypes = status;
  });
}
}
