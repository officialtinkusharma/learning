import { Injectable } from '@angular/core';
import { TableValueParserPipe } from 'src/app/shared/pipe/table-value-parser.pipe';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor(private tableValueparserPipe: TableValueParserPipe) { }

  numberSorting(headerName: any, data: any, sortingType: string, originData: any) {
    switch (sortingType) {
      case 'asc':
        return data.sort((a: any, b: any) => { return this.tableValueparserPipe.transform(a, headerName) - this.tableValueparserPipe.transform(b, headerName) })
      case 'des':
        return data.sort((a: any, b: any) => { return this.tableValueparserPipe.transform(b, headerName) - this.tableValueparserPipe.transform(a, headerName) })
      default:
        return originData
    }
  }
  stringSorting(headerName: any, data: any, sortingType: string, originData: any) {
    let fa;
    let fb;
    data.sort((a: any, b: any): any => {
      fa = (this.tableValueparserPipe.transform(a, headerName))?.toLowerCase()
      fb = (this.tableValueparserPipe.transform(b, headerName))?.toLowerCase()
      if (sortingType == 'asc') {
        if (fa < fb) { return -1; }
        else { return 0 }
      } else if (sortingType == 'des') {
        if (fa > fb) { return -1 }
        else { return 0 }
      } else {
        return originData
      }
    })
    return sortingType ? data : originData;
  }
}
