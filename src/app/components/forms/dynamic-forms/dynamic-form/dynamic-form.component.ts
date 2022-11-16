import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from "../question/question-base";
import {QuestionControlService} from "../question/question-control.service";
import {Vehicle} from "../../../../models/vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() idObj: number = 0;
  @Input() typeObj: string = "";
  form!: FormGroup;
  payLoad = '';

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private qcs: QuestionControlService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    console.log("dyn form comp"+this.idObj + " " + this.typeObj)
  }

  onSubmit() {
    let obj = this.form.getRawValue()
    switch (this.form.getRawValue()['entityType']) {
      case "vehicle":
        var v: Vehicle = {
          id: obj.id, carBrand: obj.carBrand, model: obj.model, type: obj.type, rents: undefined,
          registrationYear: obj.registrationYear
        }
        if (obj.id) {
          this.vehicleService.addVehicle(v).subscribe((() => this.router.navigate(['/list/vehicle'])))
        } else {
          this.vehicleService.updateVehicle(v).subscribe((() => this.router.navigate(['/list/vehicle'])))
        }
        break;
      case "user":
        var u: User = {
          id: obj.id, surname: obj.surname, rents: undefined, name:obj.name, birthday: obj.birthday,
          password:obj.password, username:obj.username
        }
        if (obj.id) {
          this.userService.addUser(u).subscribe((() => this.router.navigate(['/list/user'])))
        } else {
          this.userService.updateUser(u).subscribe((() => this.router.navigate([''])))
        }
        break;

    }
  }
}
