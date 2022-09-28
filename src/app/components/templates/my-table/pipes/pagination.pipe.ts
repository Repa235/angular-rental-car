import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pagination'})
export class PaginationPipe implements PipeTransform {
  transform(data: any[], selectedpage:number, itemperpage:number ): any {
    let itemToStart = (selectedpage - 1) * itemperpage
    let itemToEnd = itemToStart + itemperpage
    return data.slice(itemToStart,itemToEnd)
  }
}
