import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Rent} from "../../models/rent";

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  formType!: string;


  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let formType = params['ft'];
      this.formType = formType;
      console.log(formType);
    });

  }

}
