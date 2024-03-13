import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8082/api/employee';
  constructor(private http: HttpClient) {}

  // getEmployeeByUserEmpId(userEmpId: any): Observable<Employee> {
  //   console.log("userEmpId", userEmpId);
  //   return this.http.get<Employee>(`${this.apiUrl}/${userEmpId}`);
  // }
  saveEmployee(employeeData: Employee): Observable<Employee> {
    console.log(employeeData+"service method");
    return this.http.post<Employee>(`${this.apiUrl}/save`, employeeData);
  }

  checkEmployeeCodeUnique(employeeCode: string): Observable<boolean> {
    console.log(employeeCode);
    return this.http.get<boolean>(`/check-employee-code/${employeeCode}`);
  }

}
