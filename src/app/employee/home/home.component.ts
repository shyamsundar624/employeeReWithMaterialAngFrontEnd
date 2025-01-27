import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,
    MatTableModule,MatSortModule,MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  readonly dialog=inject(MatDialog); 
  
  displayedColumns: string[] = ['id', 'name', 'email', 'salary','edit','delete'];
  dataSource =new MatTableDataSource<Employee>();

  name:string='';
  email:string='';
  salary:any=undefined;

  employee:Employee={
    id:0,
    name:'',
    email:'',
    salary:this.salary
  }
  employees:Employee[]=[];
  filteredEmployees:Employee[]=[];

  constructor(private employeeService:EmployeeService){}

  ngAfterViewInit(): void {
    this.employeeService.fetchAllEmployees().subscribe((data)=>{
      this.employees=data;
      this.dataSource =new MatTableDataSource<Employee>(data);
  this.dataSource.sort=this.sort;
  this.dataSource.paginator = this.paginator;
    })
  }
  
  

  searchEmployee(input:any){
this.filteredEmployees=this.employees.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
|| item.email.toLowerCase().includes(input.toLowerCase())
|| item.salary.toString().includes(input)
)

this.dataSource =new MatTableDataSource<Employee>(this.filteredEmployees);
  }

  openDialog(employee:Employee) {
    
    const dialogRef=this.dialog.open(EmployeeFormComponent,{data:employee});

    dialogRef.afterClosed().subscribe(result=>{
      if(result!==undefined){
        this.employee.id=result.id;
        this.employee.name=result.name;
        this.employee.email=result.email;
        this.employee.salary=result.salary;

      }
    })
    }
deleteEmployee(id:number){
  const isConfirmed=window.confirm("Are You sure want to delete!")
  if(isConfirmed){
  this.employeeService.deleteEmployees(id).subscribe((data)=>{
    this.employees=this.employees.filter(item=>item.id!=id);

  })
  window.location.reload();
}
}
}
