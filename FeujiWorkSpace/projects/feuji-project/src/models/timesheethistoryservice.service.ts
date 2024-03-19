import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheethistoryserviceService {

  constructor(private http: HttpClient
    ) {}


    taskHistoryUrl="http://localhost:8084/api/timesheet/gettimeSheetHistory"
  accounturl="http://localhost:8083/api/AccountProjectResourceMapping/accountdetails"
  dayaHistory="http://localhost:8084/api/timesheetday"


  fetchData(month: string, year: number,accountName:string): Observable<any[]> {
    const url = `${this.taskHistoryUrl}/${month}/${year}/${accountName}/108`;
    return this.http.get<any[]>(url);
  }
  fetchAllData( year: number,accountName:string): Observable<any[]> {
    const url = `${this.taskHistoryUrl}/${year}/${accountName}/108`;
    return this.http.get<any[]>(url);
  }
  fetchAccountBymonthAndYear( month: string,year: number): Observable<any[]> {
    const url = `${this.taskHistoryUrl}/getAccountByMonthAndYear/${month}/${year}/108`;
    return this.http.get<any[]>(url);
  }
  fetchYear(): Observable<any[]> {
    const url = `${this.taskHistoryUrl}/getYears/108`;
    return this.http.get<any[]>(url);
  }

  public getAccount():Observable<any[]>
  {

    const url1=`${this.accounturl}/108`;
    return this.http.get<any[]>(url1)
  }

  getDayHistory(uuId:string): Observable<any[]> {
    const url = `${this.dayaHistory}/gettimeSheetDayHistory/${uuId}`;
    return this.http.get<any[]>(url); 
  }


}
