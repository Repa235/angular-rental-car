import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Rent} from "../../../models/rent";
import {Vehicle} from "../../../models/vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";
import {RentService} from "../../../services/rent.service";
import {AuthService} from "../../../services/auth.service";
import * as moment from "moment";

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {

  rent: any = {};
  idRent?: any
  vehicleList: Vehicle[] = [];

  needToFindFreeVehicles: boolean = true
  startDateValidation: boolean = false
  endDateValidation: boolean = false


  startDate!: moment.Moment
  today!: moment.Moment
  messages: string[] = []

  constructor(
    private rentService: RentService,
    private vehicleService: VehicleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.today = moment()
    const routeParams = this.route.snapshot.paramMap;
    this.idRent = routeParams.get('idRent');

    if (this.idRent != null) {
      this.rentService.getRent(this.idRent).subscribe((result: Rent) => {
        this.rent = result;
      });
    }

  }



  addOrUpdateRent(rentForm: any) {

    var finalRent: Rent = {
      id: this.idRent,
      userDto: {id: this.authService.getUserId()},
      vehicleDto: {id: parseInt(rentForm.vehicleDto)},
      isApproved: false,
      startDate: rentForm.startDate,
      endDate: rentForm.endDate
    }


    if (this.idRent == null) {
      this.rentService.addRent(finalRent).subscribe(() => this.router.navigate(['/list/rent']));
    } else {
      this.rentService.updateRent(finalRent).subscribe(() => this.router.navigate(['']));
    }
  }

  getFreeVehicles() {
    var dates = {"startDate": this.rent.startDate, "endDate": this.rent.endDate}
    this.vehicleService.getFreeVehicles(dates).subscribe(vehicles => this.vehicleList = vehicles)
  }


  //I made this method to copy and paste it in the list component
  checkStartDate(startDate: any): boolean {
    if (moment(startDate).diff(this.today, 'days') <= 2) {
      return false
    }
    return true
  }

  removeAMessageFromArray(messagesArray: string[], message: string) {
    let indexToDelete = messagesArray.indexOf(message)
    if (indexToDelete > -1) { // only splice array when item is found
      messagesArray.splice(indexToDelete, 1); // 2nd parameter means remove one item only
    }
  }

  modelChangeOnStartDate(value: any) {
    this.needToFindFreeVehicles=true
     let message = "A reservation must be made at least two days before the start date";
    if (!this.checkStartDate(value)) {
      this.startDateValidation=false
      if (!this.messages.includes(message)) {
        this.messages.push(message)
      }
    } else {
      this.startDate = value
      this.startDateValidation = true
      if (this.messages.includes(message)) { //I have to remove this control because i do it into the method (?)
        this.removeAMessageFromArray(this.messages, message)
      }

    }
    if(this.needToFindFreeVehicles&&this.endDateValidation){
      this.getFreeVehicles()
      this.needToFindFreeVehicles=false
    }
  }


  modelChangeOnEndDate(value: any) {
    this.needToFindFreeVehicles=true
    let message = "End date must be after start date, we can't travel in time";
    //if end date is before startdate
    if (moment(value).isBefore(this.startDate)) {
      this.endDateValidation=false
      if (!this.messages.includes(message)) {
        this.messages.push(message)
      }
    } else {
      this.endDateValidation=true
      if (this.messages.includes(message)) { //I have to remove this control because i do it into the method (?)
        this.removeAMessageFromArray(this.messages, message)
      }


      if(this.needToFindFreeVehicles&&this.startDateValidation){
        this.getFreeVehicles()
        this.needToFindFreeVehicles=false
      }

    }
  }


}
