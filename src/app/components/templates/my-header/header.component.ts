import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRole: any = null
  userLogged: boolean = false

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole()
    this.userLogged = this.authService.isLogged()
  }


  ngDoCheck() {
    this.userRole = this.authService.getRole()
    this.userLogged = this.authService.isLogged()
  }

  doLogout(){
    this.authService.logout()
  }

}
