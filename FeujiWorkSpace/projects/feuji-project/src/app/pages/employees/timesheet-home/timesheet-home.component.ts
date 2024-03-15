import { Component, OnInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';

import { DatePipe } from '@angular/common';
import { TimesheetHomeService } from '../../../../models/timesheetHomeService.service';
import {
  SaveAndEditRecords,
  WeekAndDayDto,
} from '../../../../models/timesheethomebean.model';

import { TimesheetWeekDayBean } from '../../../../models/timesheethomebean.model';
@Component({
  selector: 'app-timesheet-home',
  templateUrl: './timesheet-home.component.html',
  styleUrl: './timesheet-home.component.css',
})
export class TimesheetHomeComponent implements OnInit, AfterViewChecked {
  constructor(
    private timesheetHomeService: TimesheetHomeService,
    private datePipe: DatePipe
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
  selectedAccount: number = 0;
  currentDate: Date = new Date();
  //currentWeek: any[]= [];
  currentWeek: { startDate: string | null; endDate: string | null }[] = [];
  accounts: any[] = [];
  projects: any[] = [];
  projectTaskType: any[] = [];
  projectTask: any[] = [];
  attendanceTypeArr: any[] = [];
  startDate: any = '';
  saveAndEditRecords: SaveAndEditRecords = new SaveAndEditRecords([], []);
  lastDate: any = '';

  selectedProjectId: number = 0;
  selectedProjecttaskId: number = 0;
  selectedAttendanceType: any;
  selectedTaskId: number = 0;
  employeeId: number = 108;
  everyRowRecord: any[] = [];

  rownum: number = 1;
  current: number = 0;
  addTaskRow() {
    console.log('addTaskRowNew ' + this.rownum);
    this.addDataToAllarows();

    this.rownum++;
    console.log('addTaskRow ' + this.rownum);
    // Add a new task with default values

    this.tasks.push({
      project: '',
      taskType: '',
      task: '',
      attendanceType: '',
      days: Array(7).fill(0),
    });
  }

  valuee: number = 0;
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
    //console.log("index "+index)
    if (this.rownum != 0) {
      this.rownum--;
    }
    console.log('Rownum Remove' + this.rownum);

    for (let a = 0; a < 6; a++) {
      this.totalvalue[a] =
        Number(this.totalvalue[a]) -
        Number(
          (document.getElementById('data_' + a + index) as HTMLInputElement)
            .value
        );
    }
  }

  submit() {
    // Handle the form submission
  }
  ngOnInit(): void {
    // this.fetcWeekDayData(108)

    this.timesheetHomeService.getAccounts().subscribe(
      (resp) => {
        this.accounts = resp as any[];
        console.log(this.accounts);
      },
      (error) => {
        console.error(error);
      }
    );

    this.onSelectAttendanceType();
    this.calculateCurrentWeek();
  }

  OnSelectAccount(account: any) {
    this.selectedAccount = account.target.value;
    //========================================================
    this.everyRowRecord[(this.rownum, 21)] = Number(this.selectedAccount);
    //===
    this.timesheetHomeService.getproject(this.selectedAccount).subscribe(
      (resp) => {
        this.projects = resp as any[];
        console.log(this.projects);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewChecked() {
    this.columnsumnew();
  }
  onSelect(projects: any, i: number) {
    //========================================================
    this.everyRowRecord[(this.rownum, 0)] = 108;
    //========================================================
    this.selectedProjectId = projects.target.value;
    //========================================================
    this.everyRowRecord[(this.rownum, 1)] = Number(this.selectedProjectId);
    //========================================================
    this.timesheetHomeService
      .getProjectTaskType(this.selectedProjectId)
      .subscribe((res) => {
        this.projectTaskType[i] = res as any[];
      });
  }
  selectedTasks: number[] = [];
  selectedTasksFromFetch: number[] = [];
  nextDropdownOptions: any[] = [];
  onSelectTaskType(projectTaskType: any, i: number) {
    this.selectedProjecttaskId = projectTaskType.target.value;
    //========================================================
    this.everyRowRecord[(this.rownum, 2)] = Number(this.selectedProjecttaskId);
    //========================================================
    console.log(this.selectedProjecttaskId);
    this.timesheetHomeService
      .getProjectTask(this.selectedProjecttaskId)
      .subscribe((restask) => {
        console.log(this.selectedTasks);
        console.log(restask);

        // const filteredTasks = restask.filter(task =>!this.selectedTasks.includes(task.taskId)) as any[];
        const filteredTasks = restask.filter(
          (task) =>
            !this.selectedTasks.some(
              (selectedTask) => Number(selectedTask) === task.taskId
            )
        ) as any[];

        console.log(filteredTasks);

        this.projectTask[i] = filteredTasks;
      });
  }

  onSelectingTask(projectTask: any, i: number) {
    this.selectedTaskId = projectTask.target.value;

    //========================================================
    this.everyRowRecord[(this.rownum, 3)] = Number(this.selectedTaskId);
    //========================================================
    console.log(this.selectedTaskId);
    //     for(let j=0;j<=this.fetchedDetails.length;j++)
    //     {
    //       this.selectedTasksFromFetch[j]=this.fetchedDetails[j].taskId
    // }

    this.selectedTasks[i] = this.selectedTaskId;

    console.log(this.selectedTasks);

    console.log(this.selectedTasks + ' nnnnnnnnnnnselected');
  }
  onSelectAttendanceType() {
    this.timesheetHomeService.getBillingType().subscribe((bill) => {
      this.attendanceTypeArr = bill as any[];
    });
  }

  onselectAttendanceType(attendanceType: any, i: number) {
    const attendanceId = attendanceType.target.value;

    //========================================================
    this.everyRowRecord[(this.rownum, 4)] = Number(attendanceId);
    //========================================================
  }

  calculateWeek(offset: number = 0) {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday
    const firstDayOfWeek = today.getDate() - daysUntilMonday + offset * 7;

    const startDate = new Date(today); // Create a new date object to avoid modifying the original
    startDate.setDate(firstDayOfWeek);

    this.currentWeek = [];

    let endDate = new Date(startDate);
    for (let i = 0; i <= 6; i++) {
      const currentDate = new Date(startDate);

      if (i == 0) {
        this.startDate = currentDate.setDate(startDate.getDate() + i);
        this.startDate = this.datePipe.transform(this.startDate, 'dd-MMM-yyyy');
      }
      if (i == 6) {
        endDate.setDate(startDate.getDate() + i);
        this.lastDate = endDate;
        this.lastDate = this.datePipe.transform(this.lastDate, 'dd-MMM-yyyy');
      }
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = this.datePipe.transform(currentDate, 'dd-MMM EEE');
      const formattedDate1 = this.datePipe.transform(
        currentDate,
        'dd-MMM-YYYY'
      );
      this.currentWeek.push({
        startDate: formattedDate,
        endDate: formattedDate,
      });
      //========================================================

      this.everyRowRecord[(this.rownum, 5 + i)] = formattedDate1;
      //========================================================
    }
  }

  calculateCurrentWeek() {
    this.current = 0;
    this.calculateWeek();
  }
  getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.floor(
      ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );

    return weekNumber;
  }
  showNextWeek() {
    this.calculateWeek(++this.current);
    // const accountId = this.selectedAccount || this.defaultAccountId;
    this.fetchWeekDayData(108, this.selectedAccount,this.startDate,this.lastDate);
  }

  showPreviousWeek() {
    this.calculateWeek(--this.current);
    this.fetchWeekDayData(108, this.selectedAccount,this.startDate,this.lastDate);
  }


  totalvalue: number[] = [0, 0, 0, 0, 0, 0, 0];
  newrowTotal:number[]=[];
  columnsumnew() {
    this.totalvalue=[];
   // let previousSum = [];
    for (let columnCount = 4; columnCount < 11; columnCount++) {
      let sum: number = 0;

      for (let rowCount = 0; rowCount < this.limitRow; rowCount++) {
        const inputElement = document
          .getElementById('data_' + rowCount + columnCount)
          ?.querySelector('input');
        if (inputElement instanceof HTMLInputElement) {
          const inputValue = inputElement.value;

          sum += Number(inputValue);
        }
      }

      this.totalvalue[columnCount - 4] = sum;
    }
    this.columnsum();
    this.rowsumnew();
   
    return this.totalvalue;
  }
  rowsumnew() {
    for (let rowCount = 0; rowCount < this.limitRow; rowCount++) {
      let sum: number = 0;
      for (let columnCount = 4; columnCount < 11; columnCount++) {
        // const inputValue = (
        //   document.getElementById(
        //     'data_' + rowCount + columnCount
        //   ) as HTMLInputElement
        // ).innerText;
        
       const inputElement=document.getElementById('data_'+rowCount+columnCount)?.querySelector('input');
       if(inputElement instanceof HTMLInputElement)
       {
        const inputValue=inputElement.value;
        sum += Number(inputValue);
       }
       
      }
      // (
      //   document.getElementById('data_' + rowCount + 11) as HTMLInputElement
      // ).innerText = String(sum);

   this.newrowTotal[rowCount]=sum;
   

   
      
      //(document.getElementById('data_' +rowCount+ 11 ) as HTMLInputElement).value= String(sum);
    }
   
  }

  columnsum() {

    for (let rowCount = 0; rowCount < this.rownum; rowCount++) {
      let sum: number = 0;
      for (let columnCount = 0; columnCount < 7; columnCount++) {
       
        const inputValue = (
          document.getElementById(
            'input_' + rowCount + columnCount
          ) as HTMLInputElement
        ).value;
        this.totalvalue[columnCount] += Number(inputValue);
      }
      this.rowsum(rowCount);
    }

    return this.totalvalue;
  }

  rowsum(count: number) {
    let sum: number = 0;
    for (let columnCount = 0; columnCount < 7; columnCount++) {
      const inputValue = (
        document.getElementById(
          'input_' + count + columnCount
        ) as HTMLInputElement
      ).value;
      sum += Number(inputValue);
      this.everyRowRecord[(this.rownum, 12 + columnCount)] = Number(inputValue);
    }
    (document.getElementById('input_' + count + 7) as HTMLInputElement).value =
      String(sum);
  }

  getComment(comments: any) {
    const comment = comments.target.value;

    //========================================================
    this.everyRowRecord[(this.rownum, 19)] = comment;
    //========================================================
  }

  //public timesheetWeekDayBean:any=new TimesheetWeekDayBean(0,0,0,0,0,new Date,new Date,new Date,new Date,new Date,new Date,new Date,0,0,0,0,0,0,0,"");

  timesheetStatus: any[] = [];

  allRows: TimesheetWeekDayBean[] = [];

  saveWeekTableData() {
  

    const saveId =
      Number(
        this.timesheetStatus.find(
          (status) => status.referenceDetailValue === 'saved'
        )?.referenceDetailId
      ) ?? 0;
  
    //========================================================
    this.everyRowRecord[(this.rownum, 20)] = 57;
    //========================================================

    this.addDataToAllarows();
  
    this.saveAndEditRecords.timesheetWeekDayDetailDto = this.allRows;
    this.saveAndEditRecords.weekAndDayDto = this.editedArray;
          console.log(this.startDate);
          

    this.timesheetHomeService
      .sendDataToBackend1(this.saveAndEditRecords,this.startDate)
      .subscribe(
        (response) => {
          console.log('Backend response:', response);

          //   //  this.fetcWeekDayData( 108, '2024-03-04 00:00:00') ;
        },
        (error) => {
          console.error('Error sending data to backend:', error);
        }
      );
  }

  addDataToAllarows() {
    let index: number = 0;
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
    timesheetWeekDayBean.employeeId = this.everyRowRecord[index++];
    timesheetWeekDayBean.accountProjectId = this.everyRowRecord[index++];

    timesheetWeekDayBean.taskTypeId = this.everyRowRecord[index++];
    timesheetWeekDayBean.taskId = this.everyRowRecord[index++];
    timesheetWeekDayBean.attendanceType = this.everyRowRecord[index++];
    timesheetWeekDayBean.dateMon = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateTue = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateWed = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateThu = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateFri = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateSat = this.everyRowRecord[index++];

    timesheetWeekDayBean.dateSun = this.everyRowRecord[index++];

    timesheetWeekDayBean.hoursMon = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursTue = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursWed = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursThu = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursFri = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursSat = this.everyRowRecord[index++];
    timesheetWeekDayBean.hoursSun = this.everyRowRecord[index++];
    timesheetWeekDayBean.comments = this.everyRowRecord[index++];
    timesheetWeekDayBean.timesheetStatus = this.everyRowRecord[index++];
    timesheetWeekDayBean.accountId = this.everyRowRecord[index++];

    if (timesheetWeekDayBean.accountProjectId != undefined) {
      this.allRows[this.rownum - 1] = timesheetWeekDayBean;
    }
  }

  limitRow: number = 0;
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
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
 
  formattedDate: string = '';
  fetchWeekDayData(employeeId: number, accountId: number ,startDate:string,endDate:string): void {
    // const startDate1 = this.startDate;
    // const lastDate = this.lastDate;

    console.log("''''''''''''''''''''''''''''" + startDate);
    alert('madhura ' + endDate);
    this.timesheetHomeService
      .getWeekDayDetails(accountId, employeeId, startDate, endDate)
      .subscribe((fetched) => {
        this.fetchedDetails = fetched as WeekAndDayDto[];
        this.limitRow = fetched.length;
        console.log('Limit Row ' + this.limitRow);
      });
  }

  loadTimesheetData(): void {
    const accountId = this.selectedAccount || this.defaultAccountId;
    this.fetchWeekDayData(108, accountId,this.startDate,this.lastDate);
  }

  deleteselected(index: number) {
    alert('Are you really want to delete');
    const selectedRowData = this.fetchedDetails[index];
    console.log(selectedRowData); // Assuming fetchedDetails is your array of data
    const weekAndDayDto: WeekAndDayDto = {
      timesheetWeekId: selectedRowData.timesheetWeekId,
      accountId: selectedRowData.accountId,
      employeeId: selectedRowData.employeeId,
      accountProjectId: selectedRowData.accountProjectId,
      projectName: selectedRowData.projectName,
      taskTypeId: selectedRowData.taskTypeId,
      taskTypeName: selectedRowData.taskTypeName,
      taskId: selectedRowData.taskId,
      taskName: selectedRowData.taskName,
      attendanceType: selectedRowData.attendanceType,
      attendanceTypeName: selectedRowData.attendanceTypeName,
      weekStartDate: selectedRowData.weekStartDate,
      dateMon: selectedRowData.dateMon,
      dateTue: selectedRowData.dateTue,
      dateWed: selectedRowData.dateWed,
      dateThu: selectedRowData.dateThu,
      dateFri: selectedRowData.dateFri,
      dateSat: selectedRowData.dateSat,
      dateSun: selectedRowData.dateSun,
      hoursMon: selectedRowData.hoursMon,
      hoursTue: selectedRowData.hoursTue,
      hoursWed: selectedRowData.hoursWed,
      hoursThu: selectedRowData.hoursThu,
      hoursFri: selectedRowData.hoursFri,
      hoursSat: selectedRowData.hoursSat,
      hoursSun: selectedRowData.hoursSun,
      comments: selectedRowData.comments,
      timesheetStatus: 57,
    };
    console.log(weekAndDayDto);
    this.removeTask(index)

    this.timesheetHomeService.deleteRecord(weekAndDayDto).subscribe(
      (response) => {
        console.log('Record deleted successfully:', response);
        // this.fetcWeekDayData( 108);
      },
      (error) => {
        console.error('Error deleting record:', error);
      }
    );
  }
  convertedDate: string = '';
  onSubmit() {
    const currentWeekStartDate = this.startDate;
    const timesheetStatus = 58;

    const datePipe = new DatePipe('en-US');

    // Format the date using the desired format
    const formattedDatee: string = currentWeekStartDate
      ? datePipe.transform(currentWeekStartDate, 'yyyy-MM-dd HH:mm:ss') || ''
      : '';
    console.log(formattedDatee);

    this.timesheetHomeService
      .submitData(formattedDatee, timesheetStatus)
      .subscribe(
        (response) => {
          console.log('submitted successfully ' + response);
        },
        (error) => {
          console.log('error in submitting ' + error);
        }
      );
  }

  editedArray: WeekAndDayDto[] = [];
  //  isEditModee: boolean = false;
  // editModes: boolean[] = [];
  // //editMode: boolean = false;
  editedRow: WeekAndDayDto = new WeekAndDayDto(
    0,
    0,
    0,
    0,
    '',
    0,
    '',
    0,
    '',
    0,
    '',
    new Date(),
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
    0
  );

  //   isEditMode(index: number): boolean {
  //     return this.editModes[index];
  //   }

  editMode: boolean = false;
  existingRows: number[] = [];
  flag: boolean = false;
  onEditMode(index: number, data: any) {
    const indexExists = this.existingRows
      .map((row) => Number(row))
      .includes(index);
    if (!indexExists) {
      this.existingRows.push(index);
      if (!this.editMode) {
        console.log(this.editedArray.length);
        this.editedArray.push(data);
        console.log(this.editedArray.length);
      }
    } else {
    }
    //  this.editMode=true;
  }

  // editModeIndex: number = -1; // Initialize with -1 to indicate no active edit mode

  // onEditMode(index: number, data: any) {
  //   console.log("before onedit");
  //   console.log(data);

  //   // If already in edit mode for another record, exit edit mode for that record
  //   if (this.editModeIndex !== -1) {
  //     this.editedArray.splice(this.editModeIndex, 1); // Remove from editedArray
  //   }

  //   // If not already in edit mode for this record, enter edit mode
  //   if (this.editModeIndex !== index) {
  //     console.log(this.editedArray.length);
  //     this.editedArray.push(data);
  //     this.editModeIndex = index;
  //   } else { // If already in edit mode for this record, exit edit mode
  //     this.editModeIndex = -1;
  //   }
  // }

  // toggleEditMode(index: number) {
  //   this.isEditModee = !this.isEditModee;
  //   this.editModes.fill(this.isEditModee);
  //   this.editModes[index] = !this.editModes[index];
  // }

  // exitEditMode() {
  //   // Reset edit mode
  //   this.isEditModee = false;
  //   this.editModes.fill(false);
  // }

  editedHoursMonArray: { [key: number]: number } = {};

  editedHoursTueArray: { [key: number]: number } = {};

  editedHoursWedArray: { [key: number]: number } = {};

  editedHoursThuArray: { [key: number]: number } = {};

  editedHoursFriArray: { [key: number]: number } = {};

  monvar: boolean = false;
  tuevar: boolean = false;
  wedvar: boolean = false;
  thuvar: boolean = false;
  frivar: boolean = false;

  geteditedHoursMon(event: any, j: number) {
    this.monvar = true;
    const newHoursMon = event.target.value;

    if (newHoursMon !== this.fetchedDetails[j].hoursMon) {
      this.editedHoursMonArray[j] = newHoursMon;
    } else {
      this.editedHoursMonArray[j] = this.fetchedDetails[j].hoursMon;
    }
    this.fetchedDetails[j].hoursMon = Number(newHoursMon);
    this.columnsumnew();
    console.log(
      `Value for hoursMon in item ${j}:`,
      this.editedHoursMonArray[j]
    );
  }

  geteditedHoursTue(event: any, j: number) {
    this.tuevar = true;
    const newHoursTue = event.target.value;

    if (newHoursTue !== this.fetchedDetails[j].hoursTue) {
      this.editedHoursTueArray[j] = newHoursTue;
    } else {
      this.editedHoursTueArray[j] = this.fetchedDetails[j].hoursTue;
    }

    this.fetchedDetails[j].hoursTue = Number(newHoursTue);

    this.columnsumnew();
    console.log(
      `Value for hoursTue in item ${j}:`,
      this.editedHoursTueArray[j]
    );
  }

  geteditedHoursWed(event: any, j: number) {
    this.wedvar = true;
    const newHoursWed = event.target.value;

    if (newHoursWed !== this.fetchedDetails[j].hoursWed) {
      this.editedHoursWedArray[j] = newHoursWed;
    } else {
      this.editedHoursWedArray[j] = this.fetchedDetails[j].hoursWed;
    }
    this.fetchedDetails[j].hoursWed = Number(newHoursWed);
    this.columnsumnew();
    console.log(
      `Value for hoursWed in item ${j}:`,
      this.editedHoursWedArray[j]
    );
  }

  geteditedHoursThu(event: any, j: number) {
    this.thuvar = true;
    const newHoursThu = event.target.value;

    if (newHoursThu !== this.fetchedDetails[j].hoursThu) {
      this.editedHoursThuArray[j] = newHoursThu;
    } else {
      this.editedHoursThuArray[j] = this.fetchedDetails[j].hoursThu;
    }
    this.fetchedDetails[j].hoursThu = Number(newHoursThu);

    console.log(
      `Value for hoursThu in item ${j}:`,
      this.editedHoursThuArray[j]
    );
  }

  geteditedHoursFri(event: any, j: number) {
    this.frivar = true;
    const newHoursFri = event.target.value;

    if (newHoursFri !== this.fetchedDetails[j].hoursFri) {
      this.editedHoursFriArray[j] = newHoursFri;
    } else {
      this.editedHoursFriArray[j] = this.fetchedDetails[j].hoursFri;
    }
    this.fetchedDetails[j].hoursFri = Number(newHoursFri);

    console.log(
      `Value for hoursFri in item ${j}:`,
      this.editedHoursFriArray[j]
    );
  }

  addeditedrow() {}

  saveRowChanges() {
    // this.timesheetHomeService.updateDetails(this.editedRow).subscribe(
    //   response=>
    //   {
    //     console.log("data saved successfully ..."+response)
    //     //this.isEditModee=!this.isEditModee;
    //      // Disable edit mode after successful save
    //   },
    //   error=>
    //   {
    //     console.log("error found ......"+error)
    //   }
    // );
    // }
    // editProject(event: any, index: number) {
    //   this.editedRow.projectId = event.target.value
    //   console.log(this.editedRow.projectId)
    // }
  }
}
