
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetHomeService } from '../../../../models/timesheetHomeService.service';
import { timesheetWeekApproval } from '../../../../models/timesheet-week-approval.model';
import { TimesheetWeekApprovalService } from '../../../../models/timesheet-week-approval.service';
import { TimesheetWeekDayBean, WeekAndDayDto } from '../../../../models/timesheethomebean.model';

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.component.html',
  styleUrl: './daily-status.component.css'
})
export class DailyStatusComponent implements OnInit{

  weekTimesheet:timesheetWeekApproval=new timesheetWeekApproval(0,0,'','','','',0,0,'',0,0,0,0,'',new Date(),new Date(),new Date(),new Date(),0);
  data: any;
  employeeName:string='';
  Status:string='';
  designation:string='';
  plannedStartDate:Date=new Date();
  plannedEndDate:Date=new Date();
  email:string=''
  public currentWeek1: Date[] = [];
  clicked=false;
  totalHours: any;

  constructor(
    private timesheetHomeService: TimesheetHomeService,private timesheetWeekApprovalService:TimesheetWeekApprovalService,
    private datePipe: DatePipe,private router:Router
  ) {
    // this.initializeRowColArray();
  }
  tasks = [
    {
      project: '',
      taskType: '',
      task: '',
      attendanceType: '',
      days: Array(7).fill(0),
    },
  ];
  defaultAccountId: number = 0; // Set the default account ID here
  selectedAccount: number =0;
  currentDate: Date = new Date();
  //currentWeek: any[]= [];
  currentWeek: { startDate: string | null; endDate: string | null }[] = [];
  accounts:any[]=[];
  projects: any[] = [];
  projectTaskType: any[] = [];
  projectTask: any[] = [];
  attendanceTypeArr: any[] = [];

startDate: any = '';

  lastDate: any = '';

  selectedProjectId: number = 0;
  selectedProjecttaskId: number = 0;
  selectedAttendanceType: any;
  selectedTaskId: number = 0;
  employeeId: number = 108;
  everyRowRecord: any[] = [];

  selectedTasks: any[] = [];

  rownum: number = 1;
  current: number = 0;


  valuee: number = 0;



  // ngOnInit(): void {
  //   this.weekTimesheet=history.state.weekTimesheet;
  //   this.employeeName= this.weekTimesheet.fullName;
  //   this.Status=this.weekTimesheet.timesheetStatus
  //   this.designation=this.weekTimesheet.designation
  //   this.plannedStartDate=this.weekTimesheet.plannedStartDate
  //   this.plannedEndDate=this.weekTimesheet.plannedEndDate
  //   this.email=this.weekTimesheet.email
  //   this.fetchWeekDayData();


// this.fetcWeekDayData(108)

  // this.timesheetHomeService.getAccounts().subscribe
  // (
  //   (resp)=>
  //   {
  //     this.accounts=resp as any[];
  //     console.log(this.accounts)
  //   },
  //   (error)=>
  //   {
  //     console.error(error)
  //   }
  // );


  //   this.onSelectAttendanceType();
  //   this.calculateCurrentWeek();

  // }
  // ngOnInit(): void {
  //   console.log("history.state.weekTimesheet:", history.state.weekTimesheet);
  //   if (history.state.weekTimesheet && history.state.weekTimesheet.length > 0) {
  //     const firstTimesheet = history.state.weekTimesheet[0];
  //     this.weekTimesheet = new timesheetWeekApproval(
  //       firstTimesheet.TimesheetWeekSummaryId,
  //       firstTimesheet.employeeId,
  //       firstTimesheet.designation,
  //       firstTimesheet.employeeCode,
  //       firstTimesheet.fullName,
  //       firstTimesheet.email,
  //       firstTimesheet.approvedBy,
  //       firstTimesheet.weekNumber,
  //       firstTimesheet.projectName,
  //       firstTimesheet.accountProjectId,
  //       firstTimesheet.totalBillingHours,
  //       firstTimesheet.totalNonBillingHours,
  //       firstTimesheet.totalLeaveHours,
  //       firstTimesheet.timesheetStatus,
  //       new Date(firstTimesheet.weekStartDate),
  //       new Date(firstTimesheet.weekEndDate),
  //       new Date(firstTimesheet.plannedStartDate),
  //       new Date(firstTimesheet.plannedEndDate),
  //       firstTimesheet.accountId

  //     );
  //     console.log("Assigned weekTimesheet:", this.weekTimesheet);
  //     this.fetchWeekDayData()
  //     // this.calculateCurrentWeek()
  //     this.employeeName=this.weekTimesheet.fullName

  //   } else {
  //     console.error('No data found in history.state.weekTimesheet');
  //   }

  // }

  ngOnInit(): void {
    console.log("history.state.weekTimesheet:", history.state.weekTimesheet);
    if (history.state.weekTimesheet && history.state.weekTimesheet.length > 0) {
      const firstTimesheet = history.state.weekTimesheet[0];
      this.weekTimesheet = new timesheetWeekApproval(
        firstTimesheet.TimesheetWeekSummaryId,
        firstTimesheet.employeeId,
        firstTimesheet.designation,
        firstTimesheet.employeeCode,
        firstTimesheet.fullName,
        firstTimesheet.email,
        firstTimesheet.approvedBy,
        firstTimesheet.weekNumber,
        firstTimesheet.projectName,
        firstTimesheet.accountProjectId,
        firstTimesheet.totalBillingHours,
        firstTimesheet.totalNonBillingHours,
        firstTimesheet.totalLeaveHours,
        firstTimesheet.timesheetStatus,
        new Date(firstTimesheet.weekStartDate),
        new Date(firstTimesheet.weekEndDate),
        new Date(firstTimesheet.plannedStartDate),
        new Date(firstTimesheet.plannedEndDate),
        firstTimesheet.accountId
      );

      // Calculate currentWeek1
      const startDate1 = new Date(this.weekTimesheet.weekStartDate);
      const endDate = new Date(this.weekTimesheet.weekEndDate);
      this.currentWeek1 = [];

      // Iterate over each day between startDate and endDate
      let currentDate1 = new Date(startDate1);
      while (currentDate1 <= endDate) {
        this.currentWeek1.push(new Date(currentDate1));
        currentDate1.setDate(currentDate1.getDate() + 1);
        const formattedDateString = this.formattedDate(currentDate1);
        // Use formattedDateString as needed
      }
      console.log("Assigned weekTimesheet:", this.weekTimesheet);
      this.fetchWeekDayData();
      this.getTotalHours();
      // this.calculateCurrentWeek()
      this.initializeValues()
      this.timesheetApprove(this.weekTimesheet)
    } else {
      console.error('No data found in history.state.weekTimesheet');
    }
  }
  initializeValues(){
    this.employeeName=this.weekTimesheet.fullName
    this.Status=this.weekTimesheet.timesheetStatus
    this.designation=this.weekTimesheet.designation
    this.email=this.weekTimesheet.email
    this.plannedStartDate=this.weekTimesheet.plannedStartDate
    this.plannedEndDate=this.weekTimesheet.plannedEndDate
  }





//   OnSelectAccount(account:any)
// {
//  this.selectedAccount= account.target.value;
//   //========================================================
//   this.everyRowRecord[(this.rownum, 21)] =  Number(this.selectedAccount);
//   //===
//   this.timesheetHomeService.getproject( this.selectedAccount).subscribe(
//     (resp) => {
//       this.projects = resp as any[];
//       console.log(this.projects)
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

  ngAfterViewChecked(){

      this.columnsumnew();

  }
  // onSelect(projects: any, i: number) {
  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 0)] = 108;
  //   //========================================================
  //   this.selectedProjectId = projects.target.value;
  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 1)] = Number(this.selectedProjectId);
  //   //========================================================
  //   this.timesheetHomeService
  //     .getProjectTaskType(this.selectedProjectId)
  //     .subscribe((res) => {
  //       this.projectTaskType[i] = res as any[];
  //     });
  // }
  // onSelectTaskType(projectTaskType: any, i: number) {
  //   this.selectedProjecttaskId = projectTaskType.target.value;
  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 2)] = Number(this.selectedProjecttaskId);
  //   //========================================================
  //   console.log(this.selectedProjecttaskId);
  //   this.timesheetHomeService
  //     .getProjectTask(this.selectedProjecttaskId)
  //     .subscribe((restask) => {
  //       const filteredTasks = restask.filter(task => !this.selectedTasks.includes(task.id)) as any[];
  //           console.log(filteredTasks)
  //           // Clear existing tasks before adding the filtered ones
  //           this.projectTask[i] = [];

  //           // Update the dropdown options for the current row
  //           this.projectTask[i] = filteredTasks;
  //     });
  // }
  // onSelectingTask(projectTask: any, i: number) {
  //   this.selectedTaskId = projectTask.target.value;

  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 3)] = Number(this.selectedTaskId);
  //   //========================================================
  //   console.log(this.selectedTaskId);
  //   this.selectedTasks[i]=this.selectedTaskId
  // }
  // onSelectAttendanceType() {
  //   this.timesheetHomeService.getBillingType().subscribe((bill) => {
  //     this.attendanceTypeArr = bill as any[];
  //   });
  // }

  // onselectAttendanceType(attendanceType: any, i: number) {
  //   const attendanceId = attendanceType.target.value;

  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 4)] = Number(attendanceId);
  //   //========================================================
  // }

  formattedDate(date: Date | null): string {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date, 'dd-MMM EEE') || '';
  }

  // calculateWeek(offset: number = 0) {
  //   const today = new Date();
  //   const currentMonth = today.getMonth(); // Get the current month
  //   const currentYear = today.getFullYear(); // Get the current year

  //   // Start from the 26th of the previous month
  //   const startDate = new Date(currentYear, currentMonth - 1, 26);

  //   // End on the 3rd of the current month
  //   const endDate = new Date(currentYear, currentMonth, 3);

  //   this.currentWeek = [];

  //   for (let i = 0; i <= 6; i++) {
  //     const currentDate = new Date(startDate);
  //     currentDate.setDate(startDate.getDate() + i);
  //     const formattedDate = this.datePipe.transform(currentDate, 'dd-MMM EEE');
  //     this.currentWeek.push({
  //       startDate: formattedDate,
  //       endDate: formattedDate, // Not sure if you need this
  //     });
  //   }
  // }

  // calculateCurrentWeek() {
  //   this.current = 0;
  //   this.calculateWeek();
  // }
  // getWeekNumber(date: Date): number {
  //   const d = new Date(date);
  //   d.setHours(0, 0, 0, 0);
  //   d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  //   const yearStart = new Date(d.getFullYear(), 0, 1);
  //   const weekNumber = Math.floor(
  //     ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  //   );

  //   return weekNumber;
  // }
  // showNextWeek() {
  //   this.calculateWeek(++this.current);

  // }

  // showPreviousWeek() {
  //   this.calculateWeek(--this.current);
  // }

  // getMondayDate() {
  //   const currentDay = this.currentWeek[0].startDate;
  // const formattedMonday = this.datePipe.transform(currentDay, 'dd-MM-yyyy');
  // console.log(formattedMonday);
  // return formattedMonday;

  // }

  // getEndDate() {
  //   const lastDay = this.currentWeek[6].endDate;

  //   return lastDay;
  // }

  totalvalue: number[] = [0, 0, 0, 0, 0, 0, 0];



  columnsumnew() {
    //console.log("Rownum::"+this.limitRow);
    for (let columnCount = 4; columnCount < 11; columnCount++) {
      let sum: number = 0;

      for (let rowCount = 0; rowCount < this.limitRow; rowCount++) {
        const inputValue = (document.getElementById( 'data_' + rowCount + columnCount) as HTMLInputElement ).innerText;
       // console.log('data_' + rowCount + columnCount + "value"+inputValue)
        sum += Number(inputValue);
      }
      this.totalvalue[columnCount-4] = sum;
    }
    this.rowsumnew();
    return this.totalvalue;
  }
  rowsumnew() {
    for (let rowCount = 0; rowCount < this.limitRow; rowCount++) {
      let sum: number = 0;
      for (let columnCount = 4; columnCount < 11; columnCount++) {
        const inputValue = (
          document.getElementById( 'data_' +  rowCount+columnCount  ) as HTMLInputElement
        ).innerText;
        //console.log(' data_' + rowCount + columnCount + " value "+inputValue)
        sum += Number(inputValue);
      }
      (document.getElementById('data_' +rowCount+ 11 ) as HTMLInputElement).innerText = String(sum);
      //(document.getElementById('data_' +rowCount+ 11 ) as HTMLInputElement).value= String(sum);
    }
  }

  columnsum() {
   console.log(this.rownum);
    for (let rowCount = 0; rowCount < this.rownum; rowCount++) {
    let sum: number = 0;
    for (let columnCount = 0; columnCount < 7; columnCount++) {
      console.log("Input "+columnCount + " - "+rowCount);
     const inputValue = ( document.getElementById( 'input_' + rowCount + columnCount) as HTMLInputElement ).value;
     this.totalvalue[columnCount] += Number(inputValue);

    }
    this.rowsum(rowCount);
   }

   return this.totalvalue;
  }

  rowsum(count : number) {
    let sum :number =0;
     for (let columnCount = 0; columnCount < 7; columnCount++) {
      const inputValue = ( document.getElementById( 'input_' + count + columnCount) as HTMLInputElement ).value;
      sum += Number(inputValue);
      this.everyRowRecord[(this.rownum, 12 + columnCount)] =
     Number(inputValue);
     }
     (
      document.getElementById('input_' + count +7 ) as HTMLInputElement
     ).value = String(sum);

    }


  // getComment(comments: any) {
  //   const comment = comments.target.value;

  //   //========================================================
  //   this.everyRowRecord[(this.rownum, 19)] = comment;
  //   //========================================================
  // }



  //public timesheetWeekDayBean:any=new TimesheetWeekDayBean(0,0,0,0,0,new Date,new Date,new Date,new Date,new Date,new Date,new Date,0,0,0,0,0,0,0,"");

  timesheetStatus: any[] = [];


  allRows: TimesheetWeekDayBean[] = [];



  addDataToAllarows() {
    let timesheetWeekDayBean: any = new TimesheetWeekDayBean(
      0,
      0,
      0,
      0,
      0,
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      '',
      0,
0
    );
    timesheetWeekDayBean.employeeId = this.everyRowRecord[0];
    timesheetWeekDayBean.projectId = this.everyRowRecord[1];
    timesheetWeekDayBean.taskId = this.everyRowRecord[3];
    timesheetWeekDayBean.taskTypeId = this.everyRowRecord[2];
    timesheetWeekDayBean.attendanceType = this.everyRowRecord[4];
    timesheetWeekDayBean.dateMon = this.everyRowRecord[5];

    timesheetWeekDayBean.dateTue = this.everyRowRecord[6];

    timesheetWeekDayBean.dateWed = this.everyRowRecord[7];

    timesheetWeekDayBean.dateThu = this.everyRowRecord[8];

    timesheetWeekDayBean.dateFri = this.everyRowRecord[9];

    timesheetWeekDayBean.dateSat = this.everyRowRecord[10];

    timesheetWeekDayBean.dateSun = this.everyRowRecord[11];

    timesheetWeekDayBean.hoursMon = this.everyRowRecord[12];
    timesheetWeekDayBean.hoursTue = this.everyRowRecord[13];
    timesheetWeekDayBean.hoursWed = this.everyRowRecord[14];
    timesheetWeekDayBean.hoursThu = this.everyRowRecord[15];
    timesheetWeekDayBean.hoursFri = this.everyRowRecord[16];
    timesheetWeekDayBean.hoursSat = this.everyRowRecord[17];
    timesheetWeekDayBean.hoursSun = this.everyRowRecord[18];
    timesheetWeekDayBean.comments = this.everyRowRecord[19];
    timesheetWeekDayBean.timesheetStatus = this.everyRowRecord[20];
    timesheetWeekDayBean.accountId=this.everyRowRecord[21];
    this.allRows[this.rownum - 1] = timesheetWeekDayBean;
    console.log("allrows"+this.allRows);
  }

  limitRow : number=0;
  fetchedDetails: WeekAndDayDto[] = [];
  deetails: WeekAndDayDto[] = [];

// getCurrentWeekStartDate(): string {
//   const today = new Date();
//   const currentDay = today.getDay();
//   const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday
//   const startDate = new Date(today);
//   startDate.setDate(today.getDate() - daysUntilMonday);

//   // Format the date as 'yyyy-MM-dd HH:mm:ss'
//   const formattedStartDate = this.formatDate(startDate);
//   return formattedStartDate;
// }
// formatDate(date: Date): string {
//   const year = date.getFullYear();
//   const month = ('0' + (date.getMonth() + 1)).slice(-2);
//   const day = ('0' + date.getDate()).slice(-2);
//   const hours = ('0' + date.getHours()).slice(-2);
//   const minutes = ('0' + date.getMinutes()).slice(-2);
//   const seconds = ('0' + date.getSeconds()).slice(-2);

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }
formatDate(date: Date): string {
  const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = ('0' + date.getDate()).slice(-2);


  return `${day}-${month}-${year}`;
}



  // fetcWeekDayData(employeeId: 108) {
  //   const currentWeekStartDate = this.getCurrentWeekStartDate();
  //  this.timesheetHomeService
  //   .getWeekDayDetails(employeeId, currentWeekStartDate)
  //   .subscribe((fetched) => {
  //    this.fetchedDetails = fetched as WeekAndDayDto[];
  //    this.limitRow=fetched.length;
  //    console.log("Limit Row "+this.limitRow);

  //   });

  // }
  // formattedDate: string='';
  fetchWeekDayData(): void {

    console.log("Employee ID: " + this.weekTimesheet.employeeId);

  //  const startDate1=this.weekTimesheet.weekStartDate;
  //  const lastDate=this.weekTimesheet.weekEndDate;

  const startDate1 = this.formatDate(this.weekTimesheet.weekStartDate);
  const lastDate = this.formatDate(this.weekTimesheet.weekEndDate);

  console.log("Start Date: ", startDate1);
  console.log("Last Date: ", lastDate);


   console.log("''''''''''''''''''''''''''''"+startDate1)
  //  alert("madhura "+lastDate)
   console.log("weekTimesheet: ", this.weekTimesheet);

    this.timesheetHomeService
      .getWeekDayDetails(this.weekTimesheet.accountId,  this.weekTimesheet.employeeId,startDate1, lastDate)
      .subscribe((fetched) => {
        this.fetchedDetails = fetched as WeekAndDayDto[];
        this.limitRow = fetched.length;
        console.log("Limit Row " + this.limitRow);
      });

    }



  loadTimesheetData(): void {
    const accountId = this.selectedAccount || this.defaultAccountId;
    this.fetchWeekDayData()

  }

   convertedDate: string='';
  //  private showSnackBar(message: string) {
  //   const config = new MatSnackBarConfig();
  //   config.panelClass = ['custom-snackbar']; // Add your custom class for styling
  //   config.duration = 2000;
  //   config.verticalPosition = 'top';
  //   this.snackBar.open(message, '', config);
  // }

timesheetApprove(_weekTimesheet: timesheetWeekApproval){
  this.timesheetHomeService.updateTimesheetStatus(this.weekTimesheet.employeeId,this.weekTimesheet.accountProjectId,this.weekTimesheet.weekNumber)
  .subscribe((data)=>{
    this.data=data;
    this.router.navigate(['/DailyStatusComponent']);
  })

}

getTotalHours(): void {
  this.timesheetWeekApprovalService.getTotalHours(this.weekTimesheet.employeeId, this.weekTimesheet.accountProjectId, this.weekTimesheet.weekNumber)
    .subscribe((totalHours) => {
      this.totalHours = totalHours;
      console.log("Total hours data:", totalHours);
    }, (error) => {
      console.error("Error fetching total hours:", error);
    });
}





}
