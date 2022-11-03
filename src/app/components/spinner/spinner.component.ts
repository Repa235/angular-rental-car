import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loadingS = this.loader.loading$

  constructor( private loader: LoadingService) { }

  ngOnInit(): void {
  }

}
