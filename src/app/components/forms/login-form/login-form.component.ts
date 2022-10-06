import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
@ViewChild('loginForm') loginForm?: NgForm
  constructor() { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    console.log(this.loginForm)
  }
}
