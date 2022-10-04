import { Component, OnInit } from '@angular/core';
import {Rent} from "../../../models/rent";
import {Vehicle} from "../../../models/vehicle";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {

  rent!:Rent;

  vehicleList!: Vehicle[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicleList = vehicles)
  }

}
