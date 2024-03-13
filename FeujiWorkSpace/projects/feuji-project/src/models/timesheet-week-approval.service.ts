import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Accountproject } from './accountproject.model';
import { timesheetWeekApproval } from './timesheet-week-approval.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetWeekApprovalService {

  private apiUrl = 'http://localhost:8084/api/TimesheetWeekSummaryView';
  private weekTimeSheet: timesheetWeekApproval[]=[];
  constructor(private http: HttpClient) {}

  getWeekTimesheets(approvedBy: number, accountId:number,accountProjectId: number, weekNumber: number): Observable<timesheetWeekApproval[]> {
    const url = `${this.apiUrl}/timesheets/manager/${approvedBy}/${accountId}/${accountProjectId}/${weekNumber}`;
    return this.http.get<timesheetWeekApproval[]>(url).pipe(tap(data => this.weekTimeSheet = data))
  }

  getProjects(accountId: number): Observable<timesheetWeekApproval[]> {
    const url = `${this.apiUrl}/projects/${accountId}`;
    return this.http.get<timesheetWeekApproval[]>(url);
  }
  getStoredWeekTimesheets(): timesheetWeekApproval[] {
    return this.weekTimeSheet;
  }

  getAccounts(approvedBy:number):Observable<timesheetWeekApproval[]>{
    const url=`${this.apiUrl}/accounts/${approvedBy}`;
    return this.http.get<timesheetWeekApproval[]>(url)
  }
  getTotalHours(employeeId:number,accountProjectId:number,weekNumber:number):Observable<timesheetWeekApproval[]>{
    const url=`${this.apiUrl}/total/${employeeId}/${accountProjectId}/${weekNumber}`;
    return this.http.get<timesheetWeekApproval[]>(url)
  }

}
