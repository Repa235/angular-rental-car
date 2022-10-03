import {Component, OnInit} from '@angular/core';
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {RentService} from "../../../services/rent.service";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: any = []

  order!: MyOrder;
  search!: MySearch;
  pagination!: MyPagination;
  actions!: MyActions[];
  headerT1!: MyHeaders[];
  configurazioneT!: MyTableConfig;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.getVehicles()
    this.actions = [{text: 'Edit', buttonTop: false, customClass: 'btn'},
      {text: 'Delete', buttonTop: false, customClass: 'btn'},
      {text: 'Add', buttonTop: true, customClass: 'btn btn-secondary princButton'}]
    this.order = {defaultColumn: "id", orderType: "asc"}
    this.search = {columns: ["carBrand", "model", "type"]};
    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
    this.headerT1 = [
      {key: "id", label: "Id"},
      {key: "carBrand", label: "Car brand"},
      {key: "model", label: "Model"},
      {key: "registrationYear", label: "Year of registration"},
      {key: "type", label: "Type"},
    ];
    this.configurazioneT = {
      headers: this.headerT1, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actions
    }
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles)
  }

}
