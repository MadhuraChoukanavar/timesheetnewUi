import { Component, OnInit } from '@angular/core';
import { TimesheetHomeService } from '../../../../models/timesheetHomeService.service';
import { TimesheethistoryserviceService } from '../../../../models/timesheethistoryservice.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-timesheet-history',
  templateUrl: './timesheet-history.component.html',
  styleUrl: './timesheet-history.component.css'
})
export class TimesheetHistoryComponent implements OnInit{

 public timesheetData: any[]=[];
 public account:any[]=[];
  public months: string[] = ['All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public years: number[] = []; // Example years, adjust as needed
  public accountName:string[]=[];
  // populateYears(): void {
  //   const currentYear = new Date().getFullYear();
  //   for (let i = currentYear; i > currentYear - 10; i--) {
  //     this.years.push(i);
  //   }
  // }
 public selectedMonth: string;
 public selectedYear: number;
public selectedAccountName:string='';
 ngOnInit(): void {
  this.fetchData();
  // this.populateYears();
  this.getYears();
  this.getAccount();
  this.getAccountBymonthAndYear();
 }
 constructor(private timesheetService: TimesheetHomeService,private timesheethistory:TimesheethistoryserviceService) {
  // Set default values for month and year
  const currentDate = new Date();
  this.selectedMonth = this.months[currentDate.getMonth()+1];
  this.selectedYear = currentDate.getFullYear();
this.getAccountBymonthAndYear();
}

getAccountBymonthAndYear(): void {
  // Make a request to the backend to fetch the account name based on the selected month
  console.log(this.selectedMonth + " " + this.selectedYear);
  
  this.timesheethistory.fetchAccountBymonthAndYear(this.selectedMonth, this.selectedYear)
    .subscribe(acc => {
      console.log("asdfghjklkjhgfdsdfghjk"+acc);
      
      // Assigning the selected account name to the first account name in the array
      this.selectedAccountName = acc[0].accountName;
      console.log("asdfghjklkjhgfdsdfghjk"+this.selectedAccountName);
      // Fetch data after getting the account name
       this.fetchData();
    });
}


fetchData(): void {
  console.log(
    this.selectedAccountName
  )
  if (this.selectedMonth === 'All') {
      this.timesheethistory.fetchAllData( this.selectedYear,this.selectedAccountName)
    .subscribe(data => {
      this.timesheetData = data;
      console.log(data);
      
    });
    console.log(
      this.selectedAccountName
    )
    }else {
  this.timesheethistory.fetchData(this.selectedMonth, this.selectedYear,this.selectedAccountName)
    .subscribe(data => {
      this.timesheetData = data;
      console.log(data);
      
    });
    console.log(
      this.selectedAccountName
    )
    }
}
getYears(){
  this.timesheethistory.fetchYear().subscribe(data=>{
   console.log(data);
   this.years=data;
   console.log(this.years);
 })

}
getAccount(){
  this.timesheethistory.getAccount().subscribe(data=>{
   console.log(data);
   this.account=data;
   console.log(this.account);
 })

}
// fetchData(): void {
//   this.timesheetService.fetchData(this.selectedMonth, this.selectedYear,this.selectedAccountName)
//     .subscribe(data => {
//       // if (data.length === 0) {
//       //   this.generateEmptyData();
//       // } else {
//         this.timesheetData = data;
//     //   }
//     });
// }

// generateEmptyData(): void {
//   const startDate = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth), 1);
//   const endDate = new Date(this.selectedYear, this.months.indexOf(this.selectedMonth) + 1, 0);
//   const weeks = this.getWeeksBetweenDates(startDate, endDate);
  
//   this.timesheetData = weeks.map(week => ({
//     weekStartDate: week.startDate,
//     weekEndDate: week.endDate,
//     billingHours: 0,
//     nonBillinghours: 0,
//     leaveHours: 0
//   }));

//   this.timesheetService.fetchData(this.selectedMonth, this.selectedYear ,this.selectedAccountName)
//     .subscribe(data => {
//       if (data.length === 0) {
//         this.timesheetData.forEach(item => {
//           if (item.billingHours === 0) {
//             item.billingHours = 0; // Adjust this as per your requirement
//           }
//           if (item.nonBillinghours === 0) {
//             item.nonBillinghours = 0; // Adjust this as per your requirement
//           }
//           if (item.leaveHours === 0) {
//             item.leaveHours = 0; // Adjust this as per your requirement
//           }
//         });
//       } else {
//         this.timesheetData = data;
//       }
//     });
// }

// getWeeksBetweenDates(startDate: Date, endDate: Date): { startDate: Date, endDate: Date }[] {
//   const weeks = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     const weekStartDate = new Date(currentDate);
//     const weekEndDate = new Date(currentDate);
//     weekEndDate.setDate(weekEndDate.getDate() + 6);
//     weeks.push({ startDate: new Date(weekStartDate), endDate: new Date(weekEndDate) });
//     currentDate.setDate(currentDate.getDate() + 7);
//   }
  
//   return weeks;
// }
}