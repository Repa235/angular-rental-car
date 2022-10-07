import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Vehicle} from "../../../models/vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {ActivatedRoute} from "@angular/router";
import {result} from "lodash";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  oldCarId: any = 0;
  oldCar:any = {};

  constructor(
    private vehicleService: VehicleService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.oldCarId = params['idV']; })

      this.vehicleService.getVehicle(this.oldCarId).subscribe((result) => {
        this.oldCar = result
      })
  }

  addOrUpdate(value: any) {
    console.log(value)
    let vehicleForm: Vehicle = {
      type: value.type, model: value.model, rents: value.rents,
      registrationYear: value.registrationYear, id: value.id, carBrand: value.carBrand
    }
    this.vehicleService.addOrUpdateVehicle(vehicleForm).subscribe()
  }
}
