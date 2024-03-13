import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimesheetHomeService } from '../../../../models/timesheetHomeService.service';

@Component({
  selector: 'app-timesheet-home',
  templateUrl: './timesheet-home.component.html',
  styleUrl: './timesheet-home.component.css',
})
export class TimesheetHomeComponent implements OnInit {
  constructor(private timesheetHomeService: TimesheetHomeService,private datePipe: DatePipe,) {
    console.log("TIME SHEET HOME CALLED.............");
  }
  tasks = [
    // Initial task
    {
      project: '',
      taskType: '',
      task: '',
      attendanceType: '',
      days: Array(7).fill(''),
    },
  ];
  currentDate: Date = new Date();
  //currentWeek: any[]= [];
  currentWeek: { startDate:  string | null; endDate:  string | null }[] = [];

  projects: any[] = [];
  projectTaskType: any[] = [];
  projectTask: any[] = [];
  attendanceType: string[] =[]

  selectedProjectId: any;
  selectedProjecttaskId: any;
  totalvalue:number []=[];
  row: number[] = [];
  addTaskRow() {
    // Add a new task with default values
    this.tasks.push({
      project: '',
      taskType: '',
      task: '',
      attendanceType: '',
      days: Array(7).fill(''),

    });

  }


  removeTask(index: number): void {
    // Remove the task at the specified index
    this.tasks.splice(index, 2);
  }

  submit() {
    // Handle the form submission
    console.log(this.tasks);
  }
  ngOnInit(): void {
    this.timesheetHomeService.getproject(this.selectedProjecttaskId).subscribe(
      (resp) => {
        console.log(resp);
        this.projects = resp as any[];
      },
      (error) => {
        console.error(error);
      }
    );

   this.onSelectBilling();
    this.calculateCurrentWeek();

  }
  onSelect(projects: any,i:number) {
    this.selectedProjectId = projects.target.value;
    console.log(this.selectedProjectId);
    this.timesheetHomeService
      .getProjectTaskType(this.selectedProjectId)
      .subscribe((res) => {
        this.projectTaskType[i] = res as any[];
        console.log(i)
        console.log(res)
      });
  }
  onSelectTaskType(projectTaskType: any,i:number) {
    this.selectedProjecttaskId = projectTaskType.target.value;
    console.log(this.selectedProjecttaskId);
    this.timesheetHomeService
      .getProjectTask(this.selectedProjecttaskId)
      .subscribe((restask) => {
        this.projectTask[i] = restask as any[];
      });
  }

  onSelectBilling() {
    this.timesheetHomeService.getBillingType().subscribe((bill) => {
      console.log(bill);
      console.log("hhhhhhhhhhh")
     this.attendanceType=bill as string[];
    });
  }

  calculateCurrentWeek() {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday
    const firstDayOfWeek = today.getDate() - daysUntilMonday;

    const startDate = new Date(today); // Create a new date object to avoid modifying the original

    startDate.setDate(firstDayOfWeek);

    for (let i = 0; i <= 6; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = this.datePipe.transform(currentDate, 'dd-MMM EEE');
      this.currentWeek.push({ startDate: formattedDate, endDate: formattedDate });
    }


  }
  getMondayDate() {
    const currentDay = this.currentDate.getDay();
    const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday
    const mondayDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - daysUntilMonday));
    return this.datePipe.transform(mondayDate, 'dd-MM-yyyy');
  }
  getEndDate() {
    const startDate = new Date(this.currentDate); // Assuming currentDate is set at the component level
  const lastDay = new Date(startDate);
  lastDay.setDate(startDate.getDate() + 6);
  const formattedEndDate = this.datePipe.transform(lastDay, 'dd-MM-yyyy'); // Change the format here
  this.currentWeek[6].endDate = formattedEndDate;
  return  this.currentWeek[6].endDate
  }

  onaddingval1(event:any,i:number){
    // const value=event.target.value;
    // console.log(value);

    // this.totalvalue=value as number;
    // console.log(this.totalvalue)

    const value = parseFloat(event.target.value);
    console.log(value)
    // Add the new value to the array of rows
    // this.row.push(value);
    this.row[i]=value;
    console.log(this.row[i])
    // Recalculate the total value by summing up all rows
    this.totalvalue[i] = this.calculateTotalValue(this.row[i]);

    console.log(" Total value: ", this.totalvalue[i]);

  }
  calculateTotalValue(i:number): number {

    return this.row.reduce((sum, i) => sum +  i, 0);
  }


  // onaddingval1(event: any, columnIndex: number) {
  //   const value = parseFloat(event.target.value);

  //   // Ensure that the columnIndex is within the bounds of your data structure
  //   if (columnIndex >= 0 && columnIndex < this.rows.length) {
  //     // Add the new value to the specific column in the array of rows
  //     this.rows[columnIndex] = value;

  //     // Recalculate the total value by summing up all rows
  //     this.totalvalue = this.calculateTotalValue();

  //     console.log("New value added to column ", columnIndex, ". Total value: ", this.totalvalue);
  //   } else {
  //     console.error("Invalid columnIndex: ", columnIndex);
  //   }
  // }
  // calculateTotalValue(): number {
  //   return this.rows.reduce((sum, value) => sum + (value || 0), 0);
  // }
  onaddingval2(event:any,i:number){
    // const value=event.target.value;
    // console.log(value);

    // this.totalvalue=value as number;
    // console.log(this.totalvalue)

    const value1 = parseFloat(event.target.value);
    console.log(value1)
    // Add the new value to the array of rows
    this.row[i]=value1;
  console.log(this.row[i]+" "+i)
    // Recalculate the total value by summing up all rows
    this.totalvalue[i] = this.calculateTotalValue2(value1);

    console.log("New row added. Total value: ", this.totalvalue[i]);

  }calculateTotalValue2(i:number): number {
    console.log(i+"cal")
    return this.row.reduce((sum1, i) => sum1 + i, 0);
  }



}
