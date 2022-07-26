import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsersUrl:string;

  constructor(private httpClient: HttpClient) {
    this.getUsersUrl = environment.getUsersUrl;
   }

  // get list of users from source 
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.getUsersUrl);
  }
}
