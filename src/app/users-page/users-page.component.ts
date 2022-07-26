import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../_models/user';
import { UsersService } from '../_services/users-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  loadingTable:boolean = true;
  errorFetching:boolean = false;

  tableColumns:string[] = ["select","Id","Name","Email","Role","Actions",];
  users!:User[];
  dataSource!:MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<User>(true, [])

  selectedRows = new Set<User>();

  usersObserver = {
    next: (allUsers:User[]) => {
      this.users = allUsers;
      this.setDataSource(this.users);
    },
    error:(error:any) => {
      this.loadingTable = false
      this.errorFetching = true;
      alert("Failed fetching users");
    },
    complete:()=>{
      this.loadingTable = false
    }
  }

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(this.usersObserver)
  }

  // to set data for the Material table data source
  setDataSource(source:User[]): void{
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  // edit a user by toggling edit value
  editUser(user:User): void{
    user.edit = !(user.edit);
  }

  // remove a user from the table data source by user id
  removeUser(id:string | number): void{
    this.users = this.users.filter(
      (value:User)=>{
        return value.id !== id
      }
    )
    this.setDataSource(this.users);
  }

  // add user to the selected 
  addSelection(row:User, event:MatCheckboxChange): void{
    if(!(event.checked)){
      this.removeSelection(row);
    }
    else{
      this.selectedRows.add(row);
    }
    this.selection.toggle(row);
  }

  // remove a user from the selected
  removeSelection(row:any): void{
    if(this.selectedRows.has(row)){
      this.selectedRows.delete(row);
    }
  }

  // check if all user in a paginated page is selected
  isAllSelected(): boolean{
    const numSelected = this.selection.selected.length;
    const numRows =  this.getCurrentPageData()?.length;
    return numSelected === numRows;
  }

  // to select all the rows of a paginated page
  toggleAllRows(): void{
    if(this.isAllSelected()){
      this.selection.clear();
      this.selectedRows.clear();
      return ;
    }
    const pagedData = this.getCurrentPageData(); 
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

  // apply filter based on the user query
  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // delete multiple based on the selection selected list
  deleteUsers(): void{
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

  // to enable/disable the delete users button at the top right
  get toggleDelete(): boolean{
    return !(this.selection.selected.length > 0 ? true : false);
  }

  // to get the users of the paginated page
  getCurrentPageData(): User[]{
    let skip = this.paginator?.pageSize * this.paginator?.pageIndex;
    let source = this.dataSource?.data;
    if(this.dataSource?.filteredData.length > 0){
      source = this.dataSource.filteredData;
    }
    let pagedData = source?.filter(
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

