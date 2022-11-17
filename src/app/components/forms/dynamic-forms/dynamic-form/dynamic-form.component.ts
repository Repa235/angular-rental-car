import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {QuestionBase} from "../question/question-base";
import {QuestionControlService} from "../question/question-control.service";


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questionModels: QuestionBase<string>[] = [];
  form!: FormGroup;
  @Output() submitValue = new EventEmitter<any>();


  constructor(
    private qcs: QuestionControlService,
  ) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questionModels as QuestionBase<string>[]);
  }


  onSubmit(value: any) {
    this.submitValue.emit(value)
  }


}
