import {Component, OnInit} from '@angular/core';
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {UserService} from "../../../services/user.service";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {MyOrder} from "../../templates/my-table/config/MyOrder";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: any[];
  tableconfig!: MyTableConfig;
  actionButtons!: MyActions[];
  search!: MySearch;
  pagination!: MyPagination;
  order!: MyOrder;
  header!: MyHeaders[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();

    this.order = {defaultColumn: "id", orderType: "asc"}
    this.actionButtons = [
      {text: 'Edit', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'},
      {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'}
    ]

    this.search = {columns: ["id", "name", "surname"]};
    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
    this.header = [
      {key: "id", label: "Id"}, {key: "name", label: "Name"}, {key: "surname", label: "Surname"},
      {key: "password", label: "Password"}, {key: "birthday", label: "Birthday"}
    ];

    this.tableconfig = { headers: this.header, search: this.search, order: this.order, pagination:
      this.pagination, actions: this.actionButtons }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
        console.log('Add ' + action.typeOfEntity + ' ' + row.id)
        break;

      case "Edit":
        console.log('Edit ' + action.typeOfEntity + ' ' + row.id)
        break;

      case "Delete":
        console.log('Delete ' + action.typeOfEntity + ' ' + row.id)

    }
  }

}
