import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {QuestionBase} from "../question/question-base";
import {QuestionService} from "../question/question.service";

@Component({
  selector: 'app-form-father',
  templateUrl: './form-father.component.html',
  styleUrls: ['./form-father.component.css'],
  providers:  [QuestionService]
})
export class FormFatherComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
  }

}
