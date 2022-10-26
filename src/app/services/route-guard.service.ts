import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  roles: string[] = new Array(0); //role of logged user

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role: string = this.authService.getRole()

    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      let roles: string[] = route.data['roles'] //roles to access the page

      if (roles === null || roles.length === 0) { //everyone can access the page
        return true;
      } else if (this.roles.some(r => roles.includes(r))) { //user has the right role to access
        return true;
      } else { //user cant access, redirect to home
        this.router.navigate(['/']);
        return false;
      }

    }
  }
}
