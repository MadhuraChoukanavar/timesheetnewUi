import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timesheetWeekApproval } from '../../../../models/timesheet-week-approval.model';
//import { TimesheetHomeService } from '../../../../models/timesheet-home.service';
import { TimesheetWeekApprovalService } from '../../../../models/timesheet-week-approval.service';


@Component({
  selector: 'app-timesheetapprove',
  templateUrl: './timesheetapprove.component.html',
  styleUrl: './timesheetapprove.component.css'
})
export class TimesheetapproveComponent implements OnInit {

  selectedAccount: any;
  public weekTimeSheet:any={};
  projects: any[] = [];
  accounts:any[]=[];
  //public projects: Accountproject[] = [];
  public selectedProjectId: number=0;
  public selectedAccountId:number=0;
  public startDate: any='';
  public lastDate:any= '';
  public weekNumber: number=0;
  public currentWeek: any[] = [];
  public weeksDropdown: { startDate: string, endDate: string, weekNumber: number }[] = [];
  public selectedWeek: number =0;



  // onselectedProject(e:any){
  //   console.log(e.target.value)

  // }

  constructor(private timesheetWeekApprovalService:TimesheetWeekApprovalService,private datePipe: DatePipe,private router:Router ){}
  ngOnInit(){
    console.log("loaded");
    this.getAccounts();
    this.getProjects();

    // this.timesheetHomeService.getproject(this.weekTimeSheet.accountId).subscribe(
    //   (resp) => {

    //     this.projects = resp as any[];


    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    this.generateWeeksDropdown(new Date(), 2, 2);
    console.log("dates"+this.weeksDropdown);
    // this.getWeekTimesheets();
  }
  getAccounts(){
    this.timesheetWeekApprovalService.getAccounts(107).subscribe(data=>{
      this.accounts=data;
      console.log(this.accounts);


      });
    //  getProjects() {
    //     this.timesheetWeekApprovalService.getProjects(this.weekTimeSheet.accountId)
    //       .subscribe(data => {
    //         this.projects = data;
    //       });
    //   }

  }





    getWeekTimesheets(approvedBy: number,accountId:number, accountProjectId: number, weekNumber: number) {
      this.timesheetWeekApprovalService.getWeekTimesheets(approvedBy,accountId, accountProjectId, weekNumber).subscribe(data => {
        this.weekTimeSheet = data;
        console.log(this.weekTimeSheet);
      });
    }
    getProjects() {
      this.timesheetWeekApprovalService.getProjects(this.selectedAccount).subscribe(
        (resp) => {
          this.projects = resp;
        },
        (error) => {
          console.error(error);
        }
      );
    }


    // onProjectSelect(event: Event) {
    //   const target = event.target as HTMLSelectElement;
    //   const accountProjectId = target.value; // Access value property after casting
    //   this.selectedProjectId = +accountProjectId; // Update the selectedProjectId
    //   const selectedWeek = this.weekNumber; // Assuming you want to use the current week if no week is selected
    //   this.getWeekTimesheets(107, +accountProjectId, selectedWeek); // Convert to number using "+" prefix
    // }




    getWeekNumber(date: Date): number {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const yearStart = new Date(d.getFullYear(), 0, 1);
      const weekNumber = Math.floor(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      return weekNumber;
    }

    getWeekOption(weekStartDate: Date) {
      const endDate = new Date(weekStartDate);
      endDate.setDate(weekStartDate.getDate() + 6); // Assuming a week ends 6 days after its start
      const weekNumber = this.getWeekNumber(weekStartDate);
      const formattedStartDate = this.datePipe.transform(weekStartDate, 'dd-MMM') || ''; // Ensure startDate is always a string
      const formattedEndDate = this.datePipe.transform(endDate, 'dd-MMM-yy') || ''; // Ensure endDate is always a string
      return { startDate: formattedStartDate, endDate: formattedEndDate, weekNumber: weekNumber };
    }

    generateWeeksDropdown(currentWeek: Date, weeksPast: number, weeksFuture: number) {
      const dropdownOptions = [];

      // Set the start date of the current week to the nearest Monday
      const startDate = new Date(currentWeek);
      startDate.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);

      // Generate dropdown options for past weeks
      for (let i = weeksPast; i > 0; i--) {
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(startDate.getDate() - i * 7);
        dropdownOptions.push(this.getWeekOption(weekStartDate));
      }

      // Generate dropdown option for current week
      dropdownOptions.push(this.getWeekOption(startDate));

      // Generate dropdown options for future weeks
      for (let i = 1; i <= weeksFuture; i++) {
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(startDate.getDate() + i * 7);
        dropdownOptions.push(this.getWeekOption(weekStartDate));
      }

      // Assign the dropdownOptions array to weeksDropdown
      this.weeksDropdown = dropdownOptions;

      return dropdownOptions;
    }



   

    // onWeekSelect(event: any) {
    //   const selectedWeek = event.target.value;
    //   const selectedProjectId = this.selectedProjectId; // Assuming selectedProjectId is updated elsewhere
    //   this.getWeekTimesheets(107, selectedProjectId, selectedWeek); // Adjust 107 to the appropriate approvedBy value
    // }
    // onWeekSelect(event: any) {
    //   this.selectedWeek = event.target.value;
    //   if (this.selectedWeek && this.selectedProjectId) {
    //     this.getWeekTimesheets(107, this.selectedProjectId, this.selectedWeek);
    //   }
    // }
    // onProjectSelect(event: any) {
    //   this.selectedProjectId = event.target.value;
    //   if (this.selectedWeek && this.selectedProjectId) {
    //     this.getWeekTimesheets(107, this.selectedProjectId, this.selectedWeek);
    //   }
    // }
    // onAccountSelect(event: any) {
    //   this.selectedAccountId = event.target.value;
    //   if (this.selectedWeek && this.selectedProjectId) {
    //     this.getWeekTimesheets(107, this.selectedProjectId, this.selectedWeek);
    //   }
    // }



    // onAccountSelect() {
    //   // Get the selected account ID
    //   const selectedAccountId = this.selectedAccount;

    //   // Fetch projects based on the selected account
    //   this.timesheetHomeService.getproject(selectedAccountId).subscribe(data => {
    //     this.projects = data;
    //   });
    // }
    // onAccountSelect() {
    //   // Get the selected account ID
    //   const selectedAccountId = this.selectedAccount;

    //   // Fetch projects based on the selected account
    //   this.timesheetHomeService.getproject(selectedAccountId).subscribe(data => {
    //     this.projects = data;

    //     // Check if both week and project are selected, then fetch timesheets
    //     if (this.selectedWeek && this.selectedProjectId) {
    //       this.getWeekTimesheets(107, selectedAccountId, this.selectedProjectId, this.selectedWeek);
    //     }
    //   });
    // }

    // onProjectSelect(event: any) {
    //   this.selectedProjectId = event.target.value;

    //   // Check if both week and account are selected, then fetch timesheets
    //   if (this.selectedWeek && this.selectedAccount) {
    //     this.getWeekTimesheets(107, this.selectedAccount, this.selectedProjectId, this.selectedWeek);
    //   }
    // }

    onWeekSelect(event: any) {
      this.selectedWeek = event.target.value;

      // Check if both account and project are selected, then fetch timesheets
      if (this.selectedAccount && this.selectedProjectId) {
        this.getWeekTimesheets(107, this.selectedAccount, this.selectedProjectId, this.selectedWeek);
      }
    }

    // onAccountSelect() {
    //   // Get the selected account ID
    //   const selectedAccountId = this.selectedAccount;

    //   // Fetch projects based on the selected account
    //   this.timesheetWeekApprovalService.getProjects(selectedAccountId).subscribe(
    //     (data) => {
    //       this.projects = data;
    //     },
    //     (error) => {
    //       console.error('Error fetching projects:', error);
    //     }
    //   );
    // }

    // onProjectSelect(event: any) {
    //   this.selectedProjectId = event.target.value;
    //   if (this.selectedWeek !== null && this.selectedAccount !== null && this.selectedProjectId) {
    //     this.getWeekTimesheets(107, this.selectedAccount, this.selectedProjectId, this.selectedWeek);
    //   }

    // }

    onAccountSelect() {
      // Get the selected account ID
      const selectedAccountId = this.selectedAccount;

      // Fetch projects based on the selected account
      this.timesheetWeekApprovalService.getProjects(selectedAccountId).subscribe(
        (data) => {
          this.projects = data;

          // Check if both week and project are selected, then fetch timesheets
          if (this.selectedWeek !== null && this.selectedProjectId) {
            this.getWeekTimesheets(107, selectedAccountId, this.selectedProjectId, this.selectedWeek);
          }
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }

    onProjectSelect(event: any) {
      this.selectedProjectId = event.target.value;
      if (this.selectedWeek !== null && this.selectedAccount !== null && this.selectedProjectId) {
        this.getWeekTimesheets(107, this.selectedAccount, this.selectedProjectId, this.selectedWeek);
      }
    }


    goToView(weekTimesheet:timesheetWeekApproval){
      console.log("swathi"+this.weekTimeSheet)
      this.router.navigate(['/DailyStatusComponent'],{state:{weekTimesheet:weekTimesheet}});
      console.log("state"+weekTimesheet)
    }



  }