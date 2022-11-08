import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchedText: any, filter: any): any {
    if(searchedText||filter){
    let s = searchedText.trim()
    if (s.length !== 0) {
      return _.filter(
        data, function (o) {
          return o[filter].toLowerCase().includes(s.toLowerCase());
        }
      )
    }} else return data
  }
}
