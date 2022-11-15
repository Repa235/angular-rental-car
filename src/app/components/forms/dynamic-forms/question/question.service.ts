import {Injectable} from '@angular/core';

import {DropdownQuestion} from './question-dropdown';
import {QuestionBase} from './question-base';
import {TextboxQuestion} from './question-textbox';
import {Observable, of} from 'rxjs';
import {NumberQuestion} from "./question-number";
import {DateQuestion} from "./question-date";
import {HttpClient} from "@angular/common/http";
import {VehicleService} from "../../../../services/vehicle.service";
import {Vehicle} from "../../../../models/vehicle";
import {HiddenQuestion} from "./question-hidden";

@Injectable()
export class QuestionService {


  vehicle: any = {}

  constructor() {
  }


  // TODO: get from a remote source of question metadata

  getQuestionsForVehicle() {
    const questions: QuestionBase<string>[] = [
      new HiddenQuestion({
        key: 'id',
        value: '',
        required: true,
      }),
      new HiddenQuestion({
        key: 'entityType',
        value: 'vehicle',
        required: true,
      }),
      new TextboxQuestion({
        key: 'carBrand',
        label: 'Car Brand',
        value: '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'text',
      }),
      new TextboxQuestion({
        key: 'model',
        label: 'Model',
        value: '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'text',
      }),
      new NumberQuestion({
        key: 'registrationYear',
        label: 'Registration year',
        value: '',
        class: 'form-control',
        required: true,
        controlType: 'number',
        type: 'number',
      }),
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        class: 'form-control',
        type: 'select',
        options: [
          {key: 'Sedan',  value: 'Sedan'},
          {key: 'Coupe',  value: 'Coupe'},
          {key: 'Familiar',   value: 'Familiar'},
          {key: 'VAN', value: 'VAN'}
        ],
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }



/*
getQuestionsForVehicle() {

  const questions: QuestionBase<string>[] = [

    new DropdownQuestion({
      key: 'brave',
      label: 'Bravery Rating',
      class: 'form-control',
      options: [
        {key: 'solid',  value: 'Solid'},
        {key: 'great',  value: 'Great'},
        {key: 'good',   value: 'Good'},
        {key: 'unproven', value: 'Unproven'}
      ],
      order: 3
    }),

    new TextboxQuestion({
      key: 'firstName',
      label: 'First name',
      value: 'Bombasto',
      class: 'form-control',
      required: true,
      order: 1
    }),

    new NumberQuestion({
      key: 'number',
      label: 'number',
      value: '0',
      required: true,
      class: 'form-control',
      type: 'number',
      order: 4
    }),

    new DateQuestion({
      key: 'date',
      label: 'date',
      required: true,
      class: 'form-control',
      type: 'date',
      order: 5
    }),

    new TextboxQuestion({
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      class: 'form-control',
      order: 2
    })
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}*/
}
