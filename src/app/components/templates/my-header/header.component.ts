import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRole: any = null

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRole()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['userRole']) {
      this.userRole = this.authService.getRole()
    }
  }


}
