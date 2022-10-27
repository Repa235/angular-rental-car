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


  constructor(private route: ActivatedRoute, private rentService: RentService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;

    this.userType = this.authService.getRole()

    if(this.userType==="ROLE_ADMIN") {
      this.userId = routeParams.get('idUser');
    } else {
      this.userId = this.authService.getUserId()
    }

    if (this.userId) {
      var userId = parseInt(this.userId,10)
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

    this.search = {columns: ["vehicleId", "userId", "id"]};

    this.pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};


    this.header = [
      {key: "id", label: "Id"}, {key: "userDto", label: "User id"},
      {key: "vehicleDto", label: "Vehicle"}, {key: "startDate", label: "Start date"},
      {key: "endDate", label: "End date"}, {key: "approved", label: "Approved"}
    ];

    this.tableconfig = {
      headers: this.header, order: this.order, search: this.search, pagination: this.pagination,
      actions: this.actionButtons
    }
  }

  getRents(): void {
    this.rentService.getRents()
      .subscribe(rents => this.rents = rents)
    console.log(this.rents)
  }

  getRentsOf(userId: any) {
    this.rentService.getRentsOfUser(userId).subscribe((rents => this.rents = rents))
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
