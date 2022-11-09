import {Component, OnInit} from '@angular/core';
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {UserService} from "../../../services/user.service";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {actionButtons, header, order, search, pagination} from "./user-list-config";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  tableconfig!: MyTableConfig;
  actionButtons!: MyActions[];
  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  header!: MyHeaders[];
  userType!: string;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.userType = this.authService.getRole()

    this.actionButtons = actionButtons
    if (this.userType === "ROLE_ADMIN") {
      this.actionButtons.push({
        text: 'See rents',
        buttonTop: false,
        customClass: 'btn btn-outline-secondary princButton',
        typeOfEntity: 'user'
      })
    }

    this.order = order
    this.search = search
    this.pagination = pagination
    this.header = header
    this.tableconfig = {
      headers: this.header, search: this.search, order: this.order,
      pagination: this.pagination, actions: this.actionButtons
    }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
         this.router.navigate(['form/user'])
        break;

      case "Edit":
         this.router.navigate(['form/user', row.id])
        break;

      case "See rents":
        this.router.navigate(['list/rentOf/' + row.id])
        break;

      case "Delete":
         this.users = this.users.filter(users => users !== row);
        this.userService.deleteUser(row.id).subscribe((newList) => this.users = newList);
    }
  }

}
