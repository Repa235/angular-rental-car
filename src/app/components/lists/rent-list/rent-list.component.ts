import {Component, OnInit} from '@angular/core';
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {RentService} from "../../../services/rent.service";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {forEach} from "lodash";
import {Router} from "@angular/router";
import {Rent} from "../../../models/rent";

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent implements OnInit {

  rents: any[] = [];
  tableconfig!: MyTableConfig;
  actionButtons!: MyActions[];
  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  header!: MyHeaders[];



  constructor(private rentService: RentService, private router: Router) {
  }

  ngOnInit(): void {
    this.getRents()

    this.actionButtons = [
      {text: 'Edit', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
      {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
      {text: 'Approve', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'}]

    this.order = {defaultColumn: "id", orderType: "asc"}

    this.search = {columns: ["vehicleId", "userId", "id"]};

    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};

    this.header = [
      {key: "id", label: "Id"}, {key: "userId", label: "User id"},
      {key: "vehicleId", label: "Veihicle id"}, {key: "stardDate", label: "Start date"},
      {key: "endDate", label: "End date"}, {key: "isApproved", label: "Approved"}
    ];

    this.tableconfig = {
      headers: this.header, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actionButtons
    }
  }

  getRents(): void {
    this.rentService.getRents()
      .subscribe(rents => this.rents = rents)
    this.rents.forEach(e => console.log(e))
  }

  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
        console.log('Add ' + action.typeOfEntity + ' ' + row.id)
        this.router.navigate(['form/rent'])
        break;

      case "Edit":
        console.log('Edit ' + action.typeOfEntity + ' ' + row.id)
        this.router.navigate(['form/rent', row.id])
        break;

      case "Delete":
        console.log('Delete ' + action.typeOfEntity + ' ' + row.id)
        this.rents = this.rents.filter(rent => rent !== row);
        this.rentService.deleteRent(row.id).subscribe();
        break;


    }
  }

}
