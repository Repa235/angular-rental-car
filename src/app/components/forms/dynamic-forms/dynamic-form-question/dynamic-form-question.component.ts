import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from '../question/question-base';
import {VehicleService} from "../../../../services/vehicle.service";
import {UserService} from "../../../../services/user.service";
import {RentService} from "../../../../services/rent.service";

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


  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private rentService: RentService,
  ) {
  }

  ngOnInit() {
    switch (this.typeObj) {
      case "vehicle":
        this.questForVehicle(this.idObj)
        break;
      case "user":
        this.questForUser(this.idObj)
        break;
      case "rent":
        this.questForRent(this.idObj)
        break;
    }
  }


  questForVehicle(id: number) {
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

  questForUser(id: number) {
    if (id) {
      this.userService.getUser(id).subscribe(v => {
        this.obj = v
        this.form.patchValue({
          id: this.obj.id,
          name: this.obj.name,
          surname: this.obj.surname,
          username: this.obj.username,
          password: this.obj.password,
          birthday: this.obj.birthday
        })
      })
    }
  }

  questForRent(id: number) {
    if (id) {
      this.rentService.getRent(id).subscribe(v => {
        this.obj = v
        console.log(JSON.stringify(v))
        this.form.patchValue({
          id: this.obj.id,
          userDto: this.obj.userDto,
          vehicleDto: this.obj.vehicleDto,
          startDate: this.obj.startDate,
          endDate: this.obj.endDate,
          isApproved: this.obj.password,
        })
      })
    }
  }

}
