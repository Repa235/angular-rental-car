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
  @Input() idObj: number = 0;
  @Input() typeObj: string = "";

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }


  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    console.log("dyn form quest comp"+this.idObj + " " + this.typeObj)
    this.questForVehicle(this.idObj)
  }


  questForVehicle(id: number) {
    console.log("id=" + id)
    if (id) {
      this.vehicleService.getVehicle(id).subscribe(v => {
        this.obj = v
        console.log("v=" + JSON.stringify(v))
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
