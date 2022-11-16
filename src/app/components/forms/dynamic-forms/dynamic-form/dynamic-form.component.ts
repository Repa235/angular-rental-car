import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from "../question/question-base";
import {QuestionControlService} from "../question/question-control.service";
import {Vehicle} from "../../../../models/vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(
    private vehicleService: VehicleService,
    private qcs: QuestionControlService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    let obj = this.form.getRawValue()
    switch (this.form.getRawValue()['entityType']) {
      case "vehicle":
        var v: Vehicle = {
          id: obj.id, carBrand: obj.carBrand, model: obj.model, type: obj.type, rents: undefined,
          registrationYear: obj.registrationYear
        }
        console.log("Vehicle: " + JSON.stringify(v))
        /*if (obj.id) {
          this.vehicleService.addVehicle(v).subscribe((() => this.router.navigate(['/list/vehicle'])))
        } else {
          this.vehicleService.updateVehicle(v).subscribe((() => this.router.navigate(['/list/vehicle'])))
        }*/

    }
  }
}
