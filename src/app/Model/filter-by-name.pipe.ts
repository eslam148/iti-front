import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './IProduct';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  /* transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return [];
    }
    else{
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
  }

}
