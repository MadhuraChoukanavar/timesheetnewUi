import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timesheetWeekApproval } from './timesheet-week-approval.model';
import {
  SaveAndEditRecords,
  TimesheetWeekDayBean,
  WeekAndDayDto,
} from './timesheethomebean.model';


@Injectable({
  providedIn: 'root',
})
export class TimesheetHomeService {

  constructor(private http: HttpClient) {}
  accurl = 'http://localhost:8084/api/timesheet/getaccountdetails';
  prourl = 'http://localhost:8084/api/timesheet/getproject';
  tasktypeurl = 'http://localhost:8084/api/timesheet/getprojecttasktype';
  taskurl = 'http://localhost:8084/api/timesheet/getprojecttask';
  billurl = 'http://localhost:8089/api/referencedetails/getref';
  dataUrl = 'http://localhost:8084/api/timesheetdata';
  fetchUrl = 'http://localhost:8084/api/timesheetdata/getallweekdayData';
  deleteUrl = 'http://localhost:8084/api/timesheetdata';
  submitUrl = 'http://localhost:8084/api/timesheetdata/submitAction';
  updateurl='http://localhost:8084/api/timesheet/update';

  getAccounts(): Observable<any[]> {
    const url = `${this.accurl}?userEmpId=${108}`;
    return this.http.get<any[]>(url);
  }
  public getproject(selectedAccountId: any): Observable<any[]> {
    const url1 = `${
      this.prourl
    }?employeeId=${108}&accountId=${selectedAccountId}`;
    return this.http.get<any[]>(url1);
  }
  public getProjectTaskType(selectedProjectId: any): Observable<any[]> {
    const url1 = `${
      this.tasktypeurl
    }?employeeId=${108}&accountProjectId=${selectedProjectId}`;
    const finalproject = this.http.get<any[]>(url1);
    console.log(finalproject);
    return finalproject;
  }
  public getProjectTask(selectedProjecttaskId: any): Observable<any[]> {
    const url1 = `${this.taskurl}?taskTypeId=${selectedProjecttaskId}`;
    const finalproject = this.http.get<any[]>(url1);

    return finalproject;
  }
  public getBillingType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.billurl}/Attendance Type`);
  }
  public getBillingType1(): Observable<any[]> {
    return this.http.get<any[]>(`${this.billurl}/Timesheetstatus`);
  }

  sendDataToBackend1(
    data: SaveAndEditRecords,
    weekStartDate: string
  ): Observable<SaveAndEditRecords> {
    const url = `${this.dataUrl}/saveedit/${weekStartDate}`;
    console.log(url + '--URL--');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(data);

    //const dataArray = Array.isArray(data) ? data : (data as { timesheetData: TimesheetWeekDayBean[] }).timesheetData;
    return this.http.post<SaveAndEditRecords>(url, data, { headers });
  }
  updateDetails(data: TimesheetWeekDayBean): Observable<TimesheetWeekDayBean> {
    console.log(data);
    console.log('data is printingS');

    const url = `${this.dataUrl}/editData`;
    return this.http.put<any>(url, data);
  }

  getWeekDayDetails(
    employeeId: number,
    accountId: number,
    weekStartDate: string,
    weekEndDate: string
  ): Observable<WeekAndDayDto[]> {
    const url = `${this.fetchUrl}/${employeeId}/${accountId}/${weekStartDate}/${weekEndDate}`;
    console.log(url);
    return this.http.get<WeekAndDayDto[]>(url);
  }

  deleteRecord(weekdayDto: WeekAndDayDto): Observable<WeekAndDayDto> {
    const url = `${this.deleteUrl}/delete`;
    console.log(weekdayDto);

    return this.http.post<any>(url, weekdayDto);
  }

  submitData(employeeId: number,
    accountId: number,
    weekStartDate: string,
   
  ): Observable<any> {
    console.log(employeeId);
    console.log(accountId);
    console.log(weekStartDate);
  
    const url = `${this.submitUrl}?employeeId=${employeeId}&accountId=${accountId}&weekStartDate=${weekStartDate}`;
    return this.http.post<any>(url, {});
  }
  updateTimesheetStatus(employeeId:number,accountProjectId:number,weekNumber:number):Observable<any>{
    const url=`${this.updateurl}/${employeeId}/${accountProjectId}/${weekNumber}`;
    return this.http.put<any>(url,timesheetWeekApproval)
  }
}
