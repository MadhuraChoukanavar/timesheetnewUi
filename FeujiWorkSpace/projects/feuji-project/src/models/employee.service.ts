import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from './employee.model';
import { SaveEmployee } from './saveemployee.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  referenceUrl:String
  usersUrl:string
  employee:string

  constructor(private http: HttpClient, private shared : SharedService) {
    this.referenceUrl=this.shared.referenceUrl;
    this.usersUrl=this.shared.userUrl;
    this.employee=this.shared.employeeUrl
  }

  private apiUrl = this.shared.employeeUrl;

  //  Method to Save Employment
  saveEmployee(employeeData: Employee): Observable<Employee> {
    console.log(employeeData + "service method");
    return this.http.post<Employee>(`${this.apiUrl}/save`, employeeData);
  }

  //  Method to check EmployeCode
  checkEmployeeCodeUnique(employeeCode: string): Observable<boolean> {
    console.log(employeeCode);
    return this.http.get<boolean>(`/check-employee-code/${employeeCode}`);
  }

  //  Method to check unicqe email
  checkEmployeeEmail(employeeEmail: string):Observable<Boolean>{
    return this.http.get<Boolean>(`${this.usersUrl}/checkUniqueEmail?email=${employeeEmail}`)
  }

  //  Method to check  who are managers
  getReportingManager():Observable<any>{
    return this.http.get<any>(`${this.employee}/reporting-managers`)
  }

// GET BY REFERENCE TYPE ID
getByReferenceTypeId(referenceTypeId: number): Observable<SaveEmployee[]> {
  return this.http.get<SaveEmployee[]>(`${this.apiUrl}/referenceTypeId/${referenceTypeId}`);
}
// GET BY REFERENCE TYPE
getAllReferenceType():Observable<any>{
  return this.http.get<any>(`${this.referenceUrl}/all`)
}

// method to get all employee
getAllEmployees():Observable<any>{
  return this.http.get<any>(`${this.employee}/getAll`)
}

// search api
searchByEmployeeName(firstName: string):Observable<any>{
  return this.http.get<any>(`${this.employee}/search?firstName=${firstName}`)
}

}
