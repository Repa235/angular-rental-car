import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {USERS} from "../../mock-users";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[] = USERS

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers;
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(users => this.users=users)
    console.log('Users: ' + this.users)
  }

}
