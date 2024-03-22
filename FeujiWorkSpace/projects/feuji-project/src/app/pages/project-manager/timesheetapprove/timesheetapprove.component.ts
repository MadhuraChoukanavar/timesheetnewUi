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

 

  constructor(private timesheetWeekApprovalService:TimesheetWeekApprovalService,private datePipe: DatePipe,private router:Router ){}
  ngOnInit(){
   
  }
  getAccounts(){
   

  }




  }
