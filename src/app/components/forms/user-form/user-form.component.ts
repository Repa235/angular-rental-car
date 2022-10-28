import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {}
  idUser?: any
  userType!:string

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.userType=this.authService.getRole()


    if(this.userType==="ROLE_ADMIN") {
      this.idUser = routeParams.get('idUser');
    } else {
      this.idUser = this.authService.getUserId()
    }

    if(this.idUser != null) {
      this.userService.getUser(this.idUser).subscribe((result: User) => {
        this.user = result;
        this.user.password=sessionStorage.getItem("password_entered")
      });
    }
    console.log('Utente trovato')
  }

  addOrUpdateUser (userForm: any) {
    if(this.idUser == null) {
      this.userService.addUser(userForm).subscribe(() => this.router.navigate(['/list/user']));
    } else {
      this.userService.updateUser(userForm).subscribe(() => this.router.navigate(['']));
    }
  }


}
