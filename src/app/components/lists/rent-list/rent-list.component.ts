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
import {
  actionButtons4SuperUser,
  actionButtons4User,
  header4SuperUser,
  header4User,
  order, pagination,
  search
} from "./rent-list-config";

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

    this.getRentsSpecific()


    if (this.userType === "ROLE_USER") {
      this.actionButtons = actionButtons4User
    } else {
      this.actionButtons = actionButtons4SuperUser
    }
    this.order = order

    this.search = search

    this.pagination = pagination

    if (this.userType === "ROLE_USER") {
      this.header = header4User
    } else {
      this.header = header4SuperUser
    }

    this.tableconfig = {
      headers: this.header, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actionButtons
    }
  }

  getRentsSpecific(): void {
    if (this.userId) {
      var userId = parseInt(this.userId, 10)
      this.getRentsOf(userId)
    } else {
      this.getRents()
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
      })

  }

  getRentsOf(userId: any) {
    this.rentService.getRentsOfUser(userId).subscribe((rents => {

      rents.forEach(r => {
        r.fullName = r.userDto.name + " " + r.userDto.surname;
        r.vehicle = r.vehicleDto.carBrand + " " + r.vehicleDto.model;
      })
      this.rents = rents

    }))
  }


  getAction(action: MyActions, row: any) {
    switch (action.text) {
      case "Add":
        this.router.navigate(['form/rent'])
        break;

      case "Edit":
         if (this.canDoThisAction(row.startDate)) {
          this.router.navigate(['form/rent', row.id])
        } else {
          window.alert("This rent is expired");
        }
        break;

      case "Delete":
        if (this.canDoThisAction(row.startDate)) {
          this.rents = this.rents.filter(rent => rent !== row);
          this.rentService.deleteRent(row.id).subscribe(this.getRentsSpecific);
        } else {
          window.alert("This rent is expired");
        }
        break;

      case "Approve":
        if (this.canDoThisAction(row.startDate)) {
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
