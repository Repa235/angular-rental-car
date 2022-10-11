import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm') loginForm?: NgForm
  users !: any[];

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  onLogin(form: NgForm) {
    let userTemp = this.loginForm?.value
    /*this.users.forEach(u => {
      if (u.username === userTemp.username && u.password === userTemp.password) {
        console.log('ho trovato', u.name + ' ' + u.surname)

      }
    })*/
    console.log(this.authService.login(userTemp.username, userTemp.password).token)
  }

  onLogout() {
    this.authService.removeToken();
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
