import {Component, OnInit} from '@angular/core';
import {MyTableConfig} from "../../templates/my-table/config/MyTableConfig";
import {RentService} from "../../../services/rent.service";
import {MyActions} from "../../templates/my-table/config/MyActions";
import {MyOrder} from "../../templates/my-table/config/MyOrder";
import {MySearch} from "../../templates/my-table/config/MySearch";
import {MyPagination} from "../../templates/my-table/config/MyPagination";
import {MyHeaders} from "../../templates/my-table/config/MyHeaders";
import {forEach} from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {Rent} from "../../../models/rent";
import {AuthService} from "../../../services/auth.service";
import * as moment from "moment/moment";

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
  userType!: string;
  userId!: any;
  today!: moment.Moment


  constructor(private route: ActivatedRoute, private rentService: RentService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.today = moment()

    const routeParams = this.route.snapshot.paramMap;

    this.userType = this.authService.getRole()

    if (this.userType === "ROLE_ADMIN") {
      this.userId = routeParams.get('idUser');
    } else {
      this.userId = this.authService.getUserId()
    }

    if (this.userId) {
      var userId = parseInt(this.userId, 10)
      this.getRentsOf(userId)
    } else {
      this.getRents()
    }


    if (this.userType === "ROLE_USER") {
      this.actionButtons = [
        {text: 'Edit', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
        {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
        {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'}]
    } else {
      this.actionButtons = [
        {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
        {text: 'Approve', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'}]
    }
    this.order = {defaultColumn: "id", orderType: "asc"}

    this.search = {columns: ["startDate", "endDate", "vehicle"]};

    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};

    if (this.userType === "ROLE_USER") {
      this.header = [
        {key: "vehicle", label: "Vehicle"}, {key: "startDate", label: "Start date"},
        {key: "endDate", label: "End date"}, {key: "approved", label: "Approved"}
      ];
    } else {
      this.header = [
        {key: "fullName", label: "User"},
        {key: "vehicle", label: "Vehicle"}, {key: "startDate", label: "Start date"},
        {key: "endDate", label: "End date"}, {key: "approved", label: "Approved"}
      ];
    }

    this.tableconfig = {
      headers: this.header, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actionButtons
    }
  }

  getRents(): void {
    this.rentService.getRents()
      .subscribe(rents => {
        rents.forEach(r => {
          r.fullName = r.userDto.name + " " + r.userDto.surname;
          r.vehicle = r.vehicleDto.carBrand + " " + r.vehicleDto.model;
        })
        this.rents = rents
        console.log("fullnames", rents)
      })

  }

  getRentsOf(userId: any) {
    this.rentService.getRentsOfUser(userId).subscribe((rents => {

      rents.forEach(r => {
        r.fullName = r.userDto.name + " " + r.userDto.surname;
        r.vehicle = r.vehicleDto.carBrand + " " + r.vehicleDto.model;
      })
      this.rents = rents
      console.log("fullnames", rents)

    }))
  }


  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
        console.log('Add ' + action.typeOfEntity + ' ' + row.id)
        this.router.navigate(['form/rent'])
        break;

      case "Edit":
        console.log('Edit ' + action.typeOfEntity + ' ' + row.id)
        console.log("CDTA: " + this.canDoThisAction(row.startDate))
        if (this.canDoThisAction(row.startDate)) {
          this.router.navigate(['form/rent', row.id])
        } else {
          window.alert("This rent is expired");
        }
        break;

      case "Delete":
        if (this.canDoThisAction(row.startDate)) {
          console.log('Delete ' + action.typeOfEntity + ' ' + row.id)
          this.rents = this.rents.filter(rent => rent !== row);
          this.rentService.deleteRent(row.id).subscribe();
        } else {
          window.alert("This rent is expired");
        }
        break;

      case "Approve":
        if (this.canDoThisAction(row.startDate)) {
          console.log('Approve ' + action.typeOfEntity + ' ' + row.id)
          this.rentService.approveRent(row.id).subscribe()
        } else {
          window.alert("This rent is expired");
        }
        break;


    }
  }

  canDoThisAction(startDate: any): boolean {
    if (moment(startDate).diff(this.today, 'days') <= 2) {
      return false
    }
    return true
  }

}
