import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MyTableConfig} from "../../components/templates/my-table/config/MyTableConfig";
import {RentService} from "../../services/rent.service";
import {UserService} from "../../services/user.service";
import {VehicleService} from "../../services/vehicle.service";
import {configurazioneR, configurazioneU, configurazioneV} from "../../components/lists/list-config";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  listType!: string;
  users!: any[];
  rents!: any[];
  vehicles!: any[];
  tableconfigU!: MyTableConfig;
  tableconfigR!: MyTableConfig;
  tableconfigV!: MyTableConfig;

  constructor(
    private rentService: RentService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let listType = params['lt'];
      this.listType = listType;
      console.log(listType);
    });
    this.getRents()
    this.getUsers()
    this.getVehicles()

    this.tableconfigR=configurazioneR
    this.tableconfigU=configurazioneU
    this.tableconfigV=configurazioneV

  }

  getRents(): void {
    this.rentService.getRents()
      .subscribe(rents => this.rents = rents)
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles)
  }

}
