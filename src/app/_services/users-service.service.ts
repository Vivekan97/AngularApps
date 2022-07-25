import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsersUrl:string;

  constructor(private httpClient: HttpClient) {
    this.getUsersUrl = environment.getUsersUrl;
   }

   getUsers(){
      return this.httpClient.get(this.getUsersUrl);
   }
}
