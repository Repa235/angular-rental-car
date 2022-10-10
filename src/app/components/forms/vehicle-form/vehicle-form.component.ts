import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Vehicle} from "../../../models/vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {result} from "lodash";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  idVehicle?: any
  vehicle: any = {}

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idVehicle = routeParams.get('idVehicle');
    if (this.idVehicle !== null) {
      this.vehicleService.getVehicle(this.idVehicle).subscribe((result) => {
        this.vehicle = result
      })
    }
  }

  addOrUpdateVehicle(vehicleForm: any): void {
    if (this.idVehicle === null) {
      this.vehicleService.addVehicle(vehicleForm).subscribe((() => this.router.navigate(['/list/vehicle'])))
    } else {
      this.vehicleService.updateVehicle(vehicleForm).subscribe((() => this.router.navigate(['/list/vehicle'])))
    }
  }

}
