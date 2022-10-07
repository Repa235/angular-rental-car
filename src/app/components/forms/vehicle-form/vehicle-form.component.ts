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
  oldCarId: any | undefined;
  vehicle: any = {}

  constructor(
    private vehicleService: VehicleService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.oldCarId = (params['idV']) ? params['idV'] : null
    })
    if (this.oldCarId !== null) {
      this.vehicleService.getVehicle(this.oldCarId).subscribe((result) => {
        this.vehicle = result
      })
    }
  }

  addOrUpdateVehicle(vehicleForm: any): void {
    if (this.oldCarId === null) {
      this.vehicleService.addVehicle(vehicleForm).subscribe()
    } else {
      this.vehicleService.updateVehicle(vehicleForm).subscribe()
    }

  }
}
