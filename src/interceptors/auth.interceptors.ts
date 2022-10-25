import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';


import {Observable} from 'rxjs';
import {AuthService} from "../app/services/auth.service";

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken = this.authService.getToken();
    let authHeader = (authToken&&authToken!="") ? authToken : "";
    if (this.authService.isLogged()) {
      req = req.clone({setHeaders: {Authorization: authHeader}});
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
