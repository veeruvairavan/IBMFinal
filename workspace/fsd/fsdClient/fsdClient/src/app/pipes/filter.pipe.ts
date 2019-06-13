import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[],searchText: string,searchItem:string): any {
    if(!items) return [];

    if(!searchText){
      return items;
    }
    searchText = searchText.toLowerCase();
    const returnItems = items.filter(function(it){
      return it[searchItem].toLowerCase().includes(searchText);
    });
    return returnItems;
  }

}
