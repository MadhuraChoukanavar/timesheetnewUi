import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  private apiUrl = 'http://localhost:8081/api';
 private  billurl="http://localhost:8089/api/referencedetails/getref"

  constructor(private http: HttpClient) {}

  getAccount():Observable<Account[]>{
    console.log("service method")

    return this.http.get<Account[]>(`${this.apiUrl}/accountSave/getAccountDto`);
    alert();
    }
    getById(id:any):Observable<any[]>{
      // alert(cate);
      return this.http.get<any[]>(`${this.apiUrl}/accountSave/getbyId/${id}`)

    }
    getAccountByUuId(uuId:any):Observable<any[]>{
      // alert(cate);
      return this.http.get<any[]>(`${this.apiUrl}/accountSave/fetchByuuId/${uuId}`)

    }
    saveAccount(accountData: Account): Observable<Account> {
      return this.http.post<Account>(`${this.apiUrl}/accountSave/save`, accountData)
        .pipe(
          tap(() => {
            alert('Account saved successfully.');
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 409) {
              alert('Account with this name already exists.');
            } else {
              alert('Error in saving account details: ' + error.message);
            }
            return throwError('Error in saving account details: ' + error.message);
         })
  );
  }

  updateAccount(accountData:Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/accountSave/updateAccount`, accountData);
  }
  getEmployeeName():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/accountSave/getEmployee`);
  }

  // getparentId(name:String):Observable<any>{
  //   console.log(name);
  //   return this.http.get<any>(http://localhost:8084/api/accountSave/getparent/${name});
  // }


  public getBusinessUnitType():Observable<any[]>
  {

    return this.http.get<any[]>(`${this.billurl}/Business Unit`);

  }

  public getStatusType():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.billurl}/Account Status`);

  }


}
