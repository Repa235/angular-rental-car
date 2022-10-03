import { Component, OnInit } from '@angular/core';
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {RentService} from "../../../services/rent.service";

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {

  rents: any = []

  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  actions!: MyActions[];
  headerT1!: MyHeaders[];
  configurazioneT!: MyTableConfig;

  constructor(private rentService: RentService) { }

  ngOnInit(): void {
    this.getRents()
    this.actions = [{text: 'Edit', buttonTop: false, customClass: 'btn'},
      {text: 'Delete', buttonTop: false, customClass: 'btn'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-secondary princButton'}]
    this.order = {defaultColumn: "id", orderType: "asc"}
    this.search = {columns: ["vehicleId", "userId", "id"]};
    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
    this.headerT1 = [
      {key: "id", label: "Id"},
      {key: "userId", label: "User id"},
      {key: "vehicleId", label: "Veihicle id"},
      {key: "stardDate", label: "Start date"},
      {key: "endDate", label: "End date"},
      {key: "isApproved", label: "Approved"},
    ];
    this.configurazioneT = {
      headers: this.headerT1, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actions
    }
  }

  getRents(): void{
    this.rentService.getRents()
      .subscribe(rents => this.rents=rents)
  }
}
