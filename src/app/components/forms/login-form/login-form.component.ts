import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm') loginForm?: NgForm
  users !: any[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  onLogin(form: NgForm) {
    let userTemp = this.loginForm?.value
    this.users.forEach(u => {
      if (u.username === userTemp.username && u.password === userTemp.password) {
        console.log('ho trovato', u.name + ' ' + u.surname)

      }
    })
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
