import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableValueParser',
})
export class TableValueParserPipe implements PipeTransform {
  transform(row: any, col: any): any {
    if (!row || !col) {
      return;
    } else {
      let colSplit = col.split('.');
      let value = row;
      colSplit.forEach((element: string) => {
        // if(value[element]){
        value = value[element];
        // }
      });
      return value;
    }
  }
}
