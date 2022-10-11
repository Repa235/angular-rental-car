import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {map} from "rxjs/operators";
import {InMemoryDataService} from "./in-memory-data.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'api/auth'

  constructor(private http: HttpClient, private inMemo: InMemoryDataService) {
  }

  login(username: string, password: string) {
    //return this.http.post<any>(this.authURL, {username, password})
    this.setSession(this.inMemo.generaToken())
    console.log('Token salvato')
    return {username: username, password:password, token: this.inMemo.generaToken()};

  }

  private setSession(token: any) {
    sessionStorage.setItem('token', token);
  }

  removeToken(){
    console.log('Token rimosso')
    sessionStorage.removeItem('token')
  }

  getAuthToken = (): string => {
    let token: string = "";
    var tokenAuth = sessionStorage.getItem("token")

    if (tokenAuth != null) {
      token = tokenAuth;
    }
    return token;
  }


}
