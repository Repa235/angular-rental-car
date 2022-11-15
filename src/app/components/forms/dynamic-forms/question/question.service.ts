import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import {NumberQuestion} from "./question-number";
import {DateQuestion} from "./question-date";

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

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
  }
}
