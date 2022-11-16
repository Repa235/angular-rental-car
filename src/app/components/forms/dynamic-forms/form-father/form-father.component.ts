import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {QuestionBase} from "../question/question-base";
import {QuestionService} from "../question/question.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-father',
  templateUrl: './form-father.component.html',
  styleUrls: ['./form-father.component.css'],
  providers: [QuestionService]
})
export class FormFatherComponent implements OnInit {
  questions$!: Observable<QuestionBase<any>[]>;
  idObj?: any
  formCateg?: any

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idObj = routeParams.get('idObj');
    this.formCateg = routeParams.get('formCateg');
    console.log(this.formCateg + " " + this.idObj)
    switch (this.formCateg) {
      case "vehicle":
        this.questions$ = this.service.getQuestionsForVehicle();
        break;
      case "user":
        this.questions$ = this.service.getQuestionsForUser();
        break;
      case "rent":
        this.questions$ = this.service.getQuestionsForRent();
        break;
      default:
        console.log("ERROR")
    }

  }
}
