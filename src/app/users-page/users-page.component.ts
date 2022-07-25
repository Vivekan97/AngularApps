import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../_models/user';
import { UsersService } from '../_services/users-service.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  tableColumns:string[] = ["select","Id","Name","Email","Role","Actions",]; //,"Actions"
  users!:User[];
  dataSource!:MatTableDataSource<User>;
  filteredData!:User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<User>(true, [])

  selectedRows = new Set<User>();


  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res:any)=>{
      this.users = res;
      // console.log(res);
      this.setDataSource(res);
    })
  }

  setDataSource(source:User[]){
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }
  
  removePerson(id:string | number){
    console.log(id);
    this.users = this.users.filter(
      (value:User)=>{
        return value.id !== id
      }
    )
    console.log(this.users.length);
    this.setDataSource(this.users);
  }

  addSelection(){
    
  }

  isAllSelected(){
    // console.warn("### is All Selected ###",);
    const numSelected = this.selection.selected.length;
    
    // const numRows = this.dataSource?.data.length;
    const numRows =  this.getCurrentPageData()?.length; 
    console.log(numSelected, numRows)
    return numSelected === numRows;
  }

  toggleAllRows(){
    console.error("*** Toggle All Rows ***", this.isAllSelected())
    if(this.isAllSelected()){
      this.selection.clear();
      this.selectedRows.clear();
      return ;
    }
    const pagedData = this.getCurrentPageData();
    console.warn(pagedData);  
    this.selection.select(...pagedData);
    pagedData.forEach(
      (value:User)=>{
        this.selectedRows.add(value);
      }
    )
    
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    // console.log("Check Box Label -> ",row);
    if (!row) {
      // console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`)
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`;
  }

  applyFilter(event: Event){
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // deleteMany(ids:string[] | number[] | any)  [5,10,15,20]
  deleteMany(){
    console.log( this.selection.selected, this.dataSource.data.length, this.dataSource);
    if(this.users.length<=0){
      return;
    }
    this.users = this.users.filter(
      (value:User)=>{
        return !(this.selection.selected.includes(value));
      }
    )

    this.setDataSource(this.users);
    this.selection.clear();
  }

  get toggleDelete(): boolean{
    return !(this.selection.selected.length>0 ? true : false);
  }

  onPageChange(event:any){
    console.log(event);
  }

  getCurrentPageData(){
    let skip = this.paginator?.pageSize * this.paginator?.pageIndex;
    let pagedData = this.dataSource?.data.filter(
      (u:any,i:any)=>{
        return i >= skip
      }).filter(
        (v:any, w:any) => {
          return w < this.paginator.pageSize;
        }
      )
    return pagedData;  
  }
}

