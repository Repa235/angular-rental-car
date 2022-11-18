import {Injectable} from '@angular/core';

import {DropdownQuestion} from './question-dropdown';
import {QuestionBase} from './question-base';
import {TextboxQuestion} from './question-textbox';
import {Observable, of} from 'rxjs';
import {NumberQuestion} from "./question-number";
import {DateQuestion} from "./question-date";

import {HiddenQuestion} from "./question-hidden";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  constructor() {
  }


  // TODO: get from a remote source of question metadata

  getQuestionsForVehicle(vehicle?: any) {
    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'carBrand',
        label: 'Car Brand',
        value: vehicle ? vehicle.carBrand : '',
        class: 'form-control',
        required: true,
        type: 'text',
      }),
      new TextboxQuestion({
        key: 'model',
        label: 'Model',
        value: vehicle ? vehicle.model : '',
        class: 'form-control',
        required: true,
        type: 'text',
      }),
      new NumberQuestion({
        key: 'registrationYear',
        label: 'Registration year',
        value: vehicle ? vehicle.registrationYear : '',
        class: 'form-control',
        required: true,
        type: 'number',
      }),
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        class: 'form-control',
        type: 'form-select',
        options: [
          {key: 'Sedan',  value: 'Sedan'},
          {key: 'Coupe',  value: 'Coupe'},
          {key: 'Familiar',   value: 'Familiar'},
          {key: 'VAN', value: 'VAN'}
        ],
        value: vehicle ? vehicle.type : ''
      }),
      new HiddenQuestion({
        key: 'id',
        value: vehicle ? vehicle.id : '',
        required: true,
      }),
      new HiddenQuestion({
        key: 'entityType',
        value: 'vehicle',
        required: true,
      }),
    ]
    //return of(questions.sort((a, b) => a.order - b.order));
    return questions;
  }

  getQuestionsForUser(user?: any) {
    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: user ? user.name : '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'text',
      }),
      new TextboxQuestion({
        key: 'surname',
        label: 'Surname',
        value: user ? user.surname : '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'text',
      }),
      new DateQuestion({
        key: 'birthday',
        label: 'Birthday',
        required: true,
        class: 'form-control',
        type: 'date',
      }),
      new TextboxQuestion({
        key: 'username',
        label: 'Username',
        value: user ? user.username : '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'text',
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        value: '',
        class: 'form-control',
        required: true,
        controlType: 'text',
        type: 'password',
      }),
      new HiddenQuestion({
        key: 'id',
        value: user ? user.id : '',
        required: true,
      }),
      new HiddenQuestion({
        key: 'entityType',
        value: 'user',
        required: true,
      }),
    ]
    //return of(questions.sort((a, b) => a.order - b.order));
    return questions;
  }

  getQuestionsForRent() {
    const questions: QuestionBase<string>[] = [


      new DateQuestion({
        key: 'startDate',
        label: 'Start date',
        required: true,
        class: 'form-control',
        type: 'date',
      }),
      new DateQuestion({
        key: 'endDate',
        label: 'End date',
        required: true,
        class: 'form-control',
        type: 'date',
      }),
      new HiddenQuestion({
        key: 'userDto',
        value: '',
        required: true,
      }),
      new HiddenQuestion({
        key: 'id',
        value: '',
        required: true,
      }),
      new HiddenQuestion({
        key: 'entityType',
        value: 'rent',
        required: true,
      }),
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
