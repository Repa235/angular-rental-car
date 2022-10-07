import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any = null

  constructor() {
  }

  ngOnInit(): void {

  }


}
