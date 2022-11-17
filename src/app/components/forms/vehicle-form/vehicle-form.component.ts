import {Component, OnInit} from '@angular/core';

import {VehicleService} from "../../../services/vehicle.service";
import {ActivatedRoute} from "@angular/router";

import {QuestionBase} from "../dynamic-forms/question/question-base";
import {QuestionService} from "../dynamic-forms/question/question.service";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  idVehicle?: any
  vehicle: any = {}
  questionModels: QuestionBase<string>[] = []

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private qService: QuestionService,
    ) {
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.idVehicle = routeParams.get('idVehicle');
    if (this.idVehicle !== null) {
      this.vehicleService.getVehicle(this.idVehicle).subscribe((result) => {
        this.vehicle = result
        this.questionModels = this.qService.getQuestionsForVehicle(this.vehicle);
      })
    } else {
      this.questionModels = this.qService.getQuestionsForVehicle();
    }
  }

  addOrUpdateVehicle(vehicleForm: any): void {
    console.log("siamo qui", vehicleForm)
    /*  if (this.idVehicle === null) {
        this.vehicleService.addVehicle(vehicleForm).subscribe((() => this.router.navigate(['/list/vehicle'])))
      } else {
        this.vehicleService.updateVehicle(vehicleForm).subscribe((() => this.router.navigate(['/list/vehicle'])))
      }
    */

  }
}
