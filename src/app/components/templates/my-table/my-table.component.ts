import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MyTableConfig} from "./config/MyTableConfig";
import * as _ from "lodash";
import {MyTableActionEnum} from "./config/MyTableActionEnum";
import {MyActions} from "./config/MyActions";
import {Router} from "@angular/router";
import {VehicleService} from "../../../services/vehicle.service";
import {UserService} from "../../../services/user.service";
import {RentService} from "../../../services/rent.service";


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, OnChanges {
  @Input() tableConfig !: MyTableConfig;
  @Input() data !: any [];

  orderType: string = "desc";
  key!: string;
  dataBackup!: any [];
  numPageSelected: number = 1
  numberItem4Page!: number;
  maxPage!: number;
  arrayPages!: number[];
  action = MyTableActionEnum;


  //array4pag
  buttonPageArray: number[] = []

  //4Search
  column4Search: any;
  text4Search: any;

  @Output() outputTab = new EventEmitter();

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data']) {
      this.initData()
    }
  }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.key = this.tableConfig.order.defaultColumn;
    this.dataBackup = this.data;
    this.numberItem4Page = this.tableConfig.pagination.itemPerPage;
    this.maxPage = Number((this.data.length / this.numberItem4Page).toFixed())
    this.arrayPages = Array.from({length: this.maxPage}, (_, i) => i + 1)
    this.calculatePageArray()
  }

  calculatePageArray() {
    if (this.numPageSelected - 1 === 0) {
      this.buttonPageArray = [this.numPageSelected, this.numPageSelected + 1]
    } else if (this.numPageSelected + 1 === this.arrayPages.length + 1) {
      this.buttonPageArray = [this.numPageSelected - 1, this.numPageSelected]
    } else {
      this.buttonPageArray = [this.numPageSelected - 1, this.numPageSelected, this.numPageSelected + 1]
    }
  }

  changeItemPerPage(numberItem4Page: any) {
    this.numPageSelected = 1
    this.numberItem4Page = numberItem4Page.value
    this.maxPage = Number((this.data.length / this.numberItem4Page).toFixed())
    this.arrayPages = Array.from({length: this.maxPage}, (_, i) => i + 1)
  }


  prevPage() {
    if (this.numPageSelected - 1 > 0) {
      this.numPageSelected = this.numPageSelected - 1
      this.calculatePageArray()
    } else {
      window.alert("You are at page 0")
    }
  }

  nextPage() {
    if (this.numPageSelected + 1 < this.arrayPages.length + 1) {
      this.numPageSelected = this.numPageSelected + 1
      this.calculatePageArray()
    } else {
      window.alert("Max page reached")
    }
  }

  goToPage(numPageSelected: number) {
    this.numPageSelected = numPageSelected
    this.calculatePageArray()
  }

  searchPage(pageToSearch: any) {
    this.goToPage(Number(pageToSearch.value))
  }

  setSort(key: string) {
    if (key !== this.key || this.orderType == 'desc') {
      this.key = key
      this.orderType = 'asc'
    } else {
      this.orderType = 'desc'
    }
  }

  clickButton(action: MyActions, row: any) {
    this.outputTab.emit({action: action, row: row})
  }

  getValue(key: string, obj: any): string {
    return _.get(obj, key);
  }


}
