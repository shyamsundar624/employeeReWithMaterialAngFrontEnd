import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
baseUrl:string="/api/v1/employees"
  constructor(private http:HttpClient) { }

fetchAllEmployees():Observable<Employee[]>{
  return this.http.get<Employee[]>(`${this.baseUrl}`)
}
createEmployees(data:Employee):Observable<Employee>{
  return this.http.post<Employee>(`${this.baseUrl}`,data)
}
updateEmployees(data:Employee):Observable<Employee>{
  return this.http.put<Employee>(`${this.baseUrl}/${data.id}`,data)
}
deleteEmployees(id:number){
  return this.http.delete<Employee>(`${this.baseUrl}/${id}`)
}

}
