import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from './employee.model';
import { SaveEmployee } from './saveemployee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8082/api/employee';
  constructor(private http: HttpClient) {}

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

  // Service method to retrieve employment types
getEmploymentType(referenceTypeId: number): Observable<SaveEmployee[]> {
  return this.http.get<SaveEmployee[]>(`${this.apiUrl}/EmploymentType/${referenceTypeId}`);
}

  // // Method to retrieve Designation
  // getDesignation(referenceTypeId: number): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.apiUrl}/Designation/${referenceTypeId}`);
  // }

  // // Method to retrieve Business Unit
  // getBusinessUnit(referenceTypeId: number): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(`${this.apiUrl}/BusinessUnit/${referenceTypeId}`);
  // }

   // getReferenceData(referenceTypeId: number): Observable<SaveEmployee[]> {
  //   return this.http.get<SaveEmployee[]>(`${this.apiUrl}/reference/` + referenceTypeId);
  // }
}
