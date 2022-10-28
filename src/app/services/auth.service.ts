import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token} from "../models/token";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authURL: string = environment.authServerURI;


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  private log(message: string) {
    console.log(`auth service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for rent consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(username: string, password: string) {
    return this.http.post<Token>(this.authURL, {username: username, password: password}, this.httpOptions).pipe(
      map(data => {
        console.log(data)
        sessionStorage.setItem("token", "Bearer " + data.token);
        sessionStorage.setItem("role", data.role)
        sessionStorage.setItem("userid", data.userid)
        sessionStorage.setItem("isLogged", "true")
        sessionStorage.setItem("password_entered", password)
      })
    )
  }


  isLogged(): boolean {
    let isLogged = sessionStorage.getItem("isLogged")
    if (isLogged === "true") {
      return true;
    }
    return false;
  }

  getRole = (): string => {
    var role = sessionStorage.getItem("role")
    return (role) ? role : "";
  }

  getUserId = (): number => {
    var id = sessionStorage.getItem("userid")
    return (id) ? parseInt(id,10) : 0;
  }

  logout() {
    console.log('Token removed')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem("isLogged")
    sessionStorage.removeItem("role")
  }

  getToken = (): string => {
    var tokenAuth = sessionStorage.getItem("token")
    return (tokenAuth) ? tokenAuth : "";
  }




}
