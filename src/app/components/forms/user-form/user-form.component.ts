import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {}
  idUser?: any

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idUser = routeParams.get('idUser');
    if(this.idUser != null) {
      this.userService.getUser(this.idUser).subscribe((result: User) => {
        this.user = result;
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
