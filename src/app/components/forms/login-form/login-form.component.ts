import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      token =>  console.log("User autenticated with token: ", token));
  }



}
