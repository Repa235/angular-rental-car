import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from '../question/question-base';
import {Vehicle} from "../../../../models/vehicle";
import {VehicleService} from "../../../../services/vehicle.service";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {

  obj: any = {}

  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }


  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.questForVehicle(1)
  }


  questForVehicle(id: number) {
    if (id) {
      this.vehicleService.getVehicle(id).subscribe(v => {
        this.obj = v
        this.form.patchValue({
          id: this.obj.id,
          carBrand: this.obj.carBrand,
          model: this.obj.model,
          registrationYear: this.obj.registrationYear,
          type: this.obj.type
        })
      })
    }
  }

}
