import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {map, tap} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'api/auth'

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<string>(this.authURL, {username, password})
      .subscribe(token => {this.setSession(token)})
  }

  private setSession(token: any) {
    const expiresAt = moment().add(token.expiresIn, 'second');
    localStorage.setItem('id_token', token.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at")
    return moment(expiration);
  }


}
