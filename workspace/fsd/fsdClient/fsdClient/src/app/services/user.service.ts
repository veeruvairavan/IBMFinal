import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../vo/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  host:string = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  public getUsers(){
    return this.http.get<User[]>(this.host+'users');
  }

  public addUser(user:User){
    return this.http.post<User>(this.host+'users/add',user);
  }

  public deleteUser(user:User){
    return this.http.delete(this.host+'users/delete/'+user._id);
  }

  public updateUser(user:User){
    return this.http.put(this.host+'users/update',user);
  }
}
