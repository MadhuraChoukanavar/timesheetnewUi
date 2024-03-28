import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timesheetWeekApproval } from '../../../../models/timesheet-week-approval.model';
//import { TimesheetHomeService } from '../../../../models/timesheet-home.service';
import { TimesheetWeekApprovalService } from '../../../../models/timesheet-week-approval.service';
import { TimesheetHomeService } from '../../../../models/timesheetHomeService.service';
import { AccountserviceService } from '../../../../models/accountservice.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-timesheetapprove',
  templateUrl: './timesheetapprove.component.html',
  styleUrl: './timesheetapprove.component.css'
})
export class TimesheetapproveComponent implements OnInit {

  
  

  public weekTimeSheet:any=[];

  public timesheetData: any[]=[];
  public account:any[]=[];

  public selectedMonth:string ='';
   public months: string[] = ['All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   public years: number[] = []; // Example years, adjust as needed
   public accountName:string[]=[];
  
  public selectedYear=0;
 public year:number=2024;
 public month:string[]=['All','January' ,'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 searchText: any='';
;
 public accounts:any[]=[];
 public employee:any[]=[];
  public accountId :number=0;
  public employeeId :number=0;
  public userEmpId :number=107;

  selectedAccount: any;

 
 
  
  get filteredEmployees() {
    return this.employee.filter(emp => emp.firstName.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  
  ngOnInit(): void {
  
   
  this.timesheetService.getAccounts().subscribe(
    (resp) => {
      this.accounts = resp as any[];
      console.log(this.accounts);
    },
    (error) => {
      console.error(error);
    }
  );

  this.getEmployee();
  }
  constructor(private timesheetService: TimesheetWeekApprovalService,private accountService: AccountserviceService,private router: Router ,private http: HttpClient) {
   // Set default values for month and year
   const currentDate = new Date();
   this.selectedMonth = "All";
   
   
       
 }





OnSelectAccountByAccountId(event:any) {

  
 const selectedAccount = event.target.value;
 
 this.accountId=Number(selectedAccount);
 
 
  this.selectedAccount;
  this.timesheetService.getProjectsByAccountId(this.userEmpId,this.year,this.accountId)
  .subscribe(
    (resp) => {
  
      this.weekTimeSheet=resp;

      console.log(this.weekTimeSheet)
      console.log(resp)
    },
    (error) => {
      console.error(error);
    }
  );
 this.getEmployee();
}


OnSelectAccountByMonth(event:any) {


alert(this.selectedAccount)

console.log(this.month);
console.log(this.year);
console.log(this.accountId);
console.log(event.target.value);

this.selectedMonth =event.target.value;

  
console.log(this.employeeId);
   this.timesheetService.fetchData(this.selectedMonth,this.year,this.accountId)
   .subscribe(
     (resp) => {
       alert ("getting respose")
       this.weekTimeSheet=resp;
 
       console.log(this.weekTimeSheet)
       console.log(resp)
     },
     (error) => {
       console.error(error);
     }
   );
   this.getEmployee();
 }
 


OnSelectAccount(event:any) {
  const employeeId =event.target.value;
  this.employeeId=Number(employeeId);
  console.log(employeeId);
  const month1=this.selectedMonth;
   console.log("srilatha");
   console.log(this.userEmpId);
   console.log(this.month);
   console.log(this.year);
   console.log(this.accountId);
   console.log(this.employeeId);
   this.timesheetService.getProjects(this.userEmpId,month1,this.year,this.accountId,this.employeeId).subscribe(
     (resp) => {
    
       this.weekTimeSheet=resp;
       console.log(resp)
     },
     (error) => {
       console.error(error);
     }
   );
   this.getEmployee();
   return this.employee.filter(emp => emp.firstName.toLowerCase().includes(this.searchText.toLowerCase()));
 }
   


 
 
getEmployee(){

 // alert(this.userEmpId)
  alert(this.selectedAccount)
  this.timesheetService.getAllEmployee(this.userEmpId,this.selectedAccount).subscribe(data=>{
  console.log("hlooooooooooooooooo")
  
    console.log(data);
   
   this.employee=data;
   console.log(this.employee);
 })
 
}


// goToView(weekTimesheet:any){

//   weekTimesheet.employeeId=this.employeeId;
//   weekTimesheet.accountId=this.accountId;
  
//   console.log("employe"+this.employeeId);
 
//   console.log("account"+this.accountId);
//   console.log(weekTimesheet);
  
//   this.router.navigate(['/manager/DailyStatusComponent'],{state:{weekTimesheet:weekTimesheet}});
//   console.log("state"+weekTimesheet)
// }

// goToView(this.viewTimeSheet)
// {
//   this.router.navigate
// }

goToView(weekTimesheet:timesheetWeekApproval){
    weekTimesheet.employeeId=this.employeeId;
 weekTimesheet.accountId=this.accountId;

 console.log("employe"+this.employeeId);
 
   console.log("account"+this.accountId);
  console.log(weekTimesheet);
 
  this.router.navigate(['/manager/DailyStatusComponent'],{state:{weekTimesheet:weekTimesheet}});
  console.log("state"+weekTimesheet)
}

}

function subscribe(arg0: (resp: any) => void, arg1: (error: any) => void) {
  throw new Error('Function not implemented.');
}