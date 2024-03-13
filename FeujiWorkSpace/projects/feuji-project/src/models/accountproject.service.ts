
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accountproject } from './accountproject.model';

@Injectable({
  providedIn: 'root'
})
export class AccountprojectService {

 
  private apiUrl = 'http://localhost:8083'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  billurl="http://localhost:8081/api/referencedetails/getref"

  // getAccountProjects():Observable<Accountproject[]>{
  //   return this.http.get<Accountproject[]>(`${this.apiUrl}/api/accountProjects/getAccountProjectDto`); //=============

  //  }


  getAccountProjects(referenceTypeId: number): Observable<Accountproject[]> {
    const url = `${this.apiUrl}/api/accountProjects/getAccountProjectDto?referenceTypeId=${referenceTypeId}`;
    return this.http.get<Accountproject[]>(url);
  }
  

  saveAccountProject(projectData: Accountproject): Observable<Accountproject> {
    const headers = {'content-type':'application/json'};
    console.log(projectData+"service method");
    return this.http.post<Accountproject>(`http://localhost:8083/api/accountProjects/save`, projectData,{headers});
  }

  getAccountName():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/api/accountProjects/getaccount`);
  }

  getEmployeeName():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/api/accountProjects/getEmployee`);
  }

  public getPriorityType():Observable<any[]>
  {
    
    return this.http.get<any[]>(`${this.billurl}/Account Project Priority`)
  
  }

  public getStatusType():Observable<any[]>
  {
    
    return this.http.get<any[]>(`${this.billurl}/Account Project Status`)
  
  }

  getByUUId(uuid: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/accountProjects/getByUuid/${uuid}`);
  }

  // deleteRow(accountProjectId:any){
  //   const headers =new HttpHeaders({'Content-Type':'application/json'});
  //   return this.http.put<any>(`${this.apiUrl}/api/accountProjects/delete/{accountProjectId}`,{headers});
  // }
  deleteRow(projectId: number):Observable<any> {
    alert(projectId)
    return this.http.put<any>(`${this.apiUrl}/api/accountProjects/delete/${projectId}`,projectId );
  }
  
 // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Pass the accountProjectId directly without string interpolation
  




}
 