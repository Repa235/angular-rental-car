import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = []

  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  actions!: MyActions[];
  headerT1!: MyHeaders[];
  configurazioneT!: MyTableConfig;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();

    this.actions = [{text: 'Edit', buttonTop: false, customClass: 'btn'},
      {text: 'Delete', buttonTop: false, customClass: 'btn'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-secondary princButton'}]
    this.order = {defaultColumn: "id", orderType: "asc"}
    this.search = {columns: ["id", "name", "surname"]};
    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
    this.headerT1 = [
      {key: "id", label: "Id"},
      {key: "name", label: "Name"},
      {key: "surname", label: "Surname"},
      {key: "password", label: "Password"},
      {key: "birthday", label: "Birthday"},
    ];
    this.configurazioneT = {
      headers: this.headerT1, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actions
    }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }



}
