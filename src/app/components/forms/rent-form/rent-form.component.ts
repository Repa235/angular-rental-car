import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Rent} from "../../../models/rent";
import {Vehicle} from "../../../models/vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";
import {RentService} from "../../../services/rent.service";

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {

  rent: any = {};
  idRent?: any
  vehicleList!: Vehicle[];
  showCars: boolean = false

  constructor(
    private rentService: RentService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idRent = routeParams.get('idRent');
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicleList = vehicles)

    if(this.idRent != null) {
      this.rentService.getRent(this.idRent).subscribe((result: Rent) => {
        this.rent = result;
      });
    }
    console.log('Prentoazione trovata')

  }


  addOrUpdateRent(rentForm: any) {
    if(this.idRent == null) {
      this.rentService.addRent(rentForm).subscribe(() => this.router.navigate(['/list/rent']));
    } else {
      this.rentService.updateRent(rentForm).subscribe(() => this.router.navigate(['']));
    }
  }

}
