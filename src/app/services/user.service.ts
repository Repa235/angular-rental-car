import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../models/user";
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from "rxjs";
import {USERS} from "../mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() {
  }

  getUsers(): User[] {
    return USERS;
  }

}
