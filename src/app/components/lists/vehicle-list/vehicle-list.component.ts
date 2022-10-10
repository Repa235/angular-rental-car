import {Component, OnInit} from '@angular/core';
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {VehicleService} from "../../../services/vehicle.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: any[] = [];
  tableconfig!: MyTableConfig;
  actionButtons!: MyActions[];
  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  header!: MyHeaders[];

  constructor(private vehicleService: VehicleService, private router: Router) {
  }

  ngOnInit(): void {
    this.getVehicles()


    this.actionButtons = [{
      text: 'Edit',
      buttonTop: false,
      customClass: 'btn btn-outline-secondary princButton',
      typeOfEntity: 'vehicle'
    },
      {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'vehicle'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'vehicle'}]
    this.order = {defaultColumn: "id", orderType: "asc"}
    this.search = {columns: ["carBrand", "model", "type"]};
    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
    this.header = [{key: "id", label: "Id"}, {key: "carBrand", label: "Car brand"}, {
      key: "model",
      label: "Model"
    },
      {key: "registrationYear", label: "Year of registration"}, {key: "type", label: "Type"}];

    this.tableconfig = {
      headers: this.header, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actionButtons
    }

  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles)

  }

  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
        console.log('Add ' + action.typeOfEntity + ' ' + row.id)
        this.router.navigate(['form/vehicle'])
        break;

      case "Edit":
        console.log('Edit ' + action.typeOfEntity + ' ' + row.id)
        this.router.navigate(['form/vehicle', row.id])
        break;

      case "Delete":
        console.log('Delete ' + action.typeOfEntity + ' ' + row.id)
        this.vehicles = this.vehicles.filter(vehicle => vehicle !== row);
        this.vehicleService.deleteVehicle(row.id).subscribe();


    }
  }


}
