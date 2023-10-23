import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TableValueParserPipe } from '../shared/pipe/table-value-parser.pipe';
import { SortingService } from '../shared/services/sorting.service';
import { FilterService } from '../shared/services/filter.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  providers: [TableValueParserPipe]
})
export class CustomTableComponent implements OnInit, OnChanges {

  constructor(private tableValueParserPipe: TableValueParserPipe, private sortingService: SortingService, private filterService: FilterService, private el: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['rowData']?.currentValue) {
      this.rowData.forEach((element: any, index: number) => {
        element.rowId = index + 1;
        element.isSelected = element.isSelected ? element.isSelected : false;
      })
      this.duplicateRowData = JSON.parse(JSON.stringify(this.rowData))
    }
    if (changes?.['colDefs'].currentValue) {
      this.colDefs.forEach((element: any, index: number) => {
        element.colId = index + 1;
      })
      this.duplicateColDefs = JSON.parse(JSON.stringify(this.colDefs));
    }
  }

  @Input() rowData: any = [];
  @Input() colDefs: any = [];
  @Input() iconColor = '#dee1e6'
  rowDraggable: boolean = false;
  @Output() sendSelectedRow = new EventEmitter();
  @ViewChild('customTable', { read: ElementRef }) customTable: any;

  sortingType: string = '';
  sortedCol: any;
  filteredHeader: any;
  filteredData: any[] = [];
  filterApply: boolean = false;
  duplicateRowData: any[] = []
  duplicateColDefs: any[] = []
  selectedRow: any[] = [];

  ngOnInit(): void {
  }
  /**
   * @description this method is use for call inline renderer
   * @param col :any
   * @param data :any
   * @returns any
   */
  showRendererData(col: any, data: any): any {
    try {
      return col?.cellRenderer(this.createParam(col, data));
    } catch (_err) {
      return
    }
  }
  /**
 * @description this method is use to show renderer component or not
 * @param col :any
 * @param data :any
 * @returns boolean
 */
  showRendererComponentORNot(col: any, data: any): boolean {
    try {
      col?.cellRenderer(this.createParam(col, data));
      return false
    } catch (_err) {
      return true;
    }
  }
  /**
 * @description this method is use for create param
 * @param col :any
 * @param data :any
 * @returns any
 */
  createParam(col: any, rowData: any): any {
    let body: any = {
      ...col?.rendererParam,
      value: this.tableValueParserPipe.transform(rowData, col?.fieldName),
      data: rowData,
    }
    return body;
  }
  tableDataSorting(headerName: any, rowData: any) {
    if (headerName != this.sortedCol) { this.sortedCol = headerName; this.sortingType = 'asc' }
    else { this.sortingType == 'asc' ? this.sortingType = 'des' : this.sortingType == 'des' ? this.sortingType = '' : this.sortingType = 'asc' }
    let type = rowData.every((val: any) => typeof (this.tableValueParserPipe.transform(val, headerName)))
    let newRowData = this.filterApply ? this.filteredData : this.duplicateRowData;
    if (type == 'number') {
      this.sortingService.numberSorting(headerName, rowData, this.sortingType, newRowData)
    } else if (type == 'string') {
      this.sortingService.stringSorting(headerName, rowData, this.sortingType, newRowData)
    }
  }
  applyFilter(headerName: any, firstRule: any, firstValue: any, condition: any, secondRule: any, secondValue: any) {
    this.filterApply = true;
    if (this.filteredHeader == headerName) {
      this.rowData = this.filterService.applyFilter(headerName, firstRule, firstValue, condition, secondRule, secondValue, this.filteredData)
    } else {
      this.filteredHeader = headerName;
      this.rowData = this.filterService.applyFilter(headerName, firstRule, firstValue, condition, secondRule, secondValue, this.rowData)
      this.filteredData = JSON.parse(JSON.stringify(this.rowData));
    }
  }
  sizeColumnToFit() {
    let count = 0;
    // let winwidth = this.customTable.nativeElement.style.width;
    let winwidth: any = document.getElementById('customTable')?.style.width;
    let width: number = 0
    this.duplicateColDefs.forEach((element: any) => {
      if (element.width) {
        count++;
        width = width + element.width
      }
    });
    let newWidth = winwidth - width;
    let allColWidth = newWidth / (this.duplicateColDefs.length - count);
    this.colDefs.forEach((element: any) => {
      this.duplicateColDefs.forEach((item: any) => {
        if (element.colId == item.colId) {
          if (item.width) {
            element.width = item.width;
          } else {
            element.width = allColWidth;
          }
        }
      })
    })
  }
  onSelectRow(data: any) {
    data.isSelected = !data.isSelected;
    let index = this.selectedRow.map(item => item.rowId).indexOf(data.rowId);
    if (index == -1 && data.isSelected) {
      this.selectedRow.push(data);
    } else if (index != -1 && !data.isSelected) {
      this.selectedRow.splice(index, 1);
    }
    this.sendSelectedData();
  }
  sendSelectedData() {
    let newData = this.selectedRow.map(item => {
      let newRow = JSON.parse(JSON.stringify(item))
      delete newRow.rowId;
      return newRow
    })
    this.sendSelectedRow.emit(newData);
  }
  selectedAll(event: any) {
    let val = event.target.checked;
    if (val) {
      this.rowData.forEach((item: any) => { item.isSelected = true });
      this.selectedRow = JSON.parse(JSON.stringify(this.rowData));
      this.sendSelectedData();
    } else {
      this.rowData.forEach((item: any) => { item.isSelected = false });
      this.selectedRow = [];
      this.sendSelectedRow.emit(this.selectedRow);
    }

  }
  currentRow: any
  /**
* @description To drag input list of config template
* @author Tinku Sharma
* @param {user:any}
* @returns void
*/
  ondragStart(user: any) { this.currentRow = user; }
  /**
  * @description To drag over
  * @author Tinku Sharma
  * @param {event:any}
  * @returns void
  */
  onDragOver(event: any) {
    if (this.rowDraggable) {
      event.preventDefault();
    }
  }
  /**
  * @description To drop input field of config template
  * @author Tinku Sharma
  * @param {_event:any,data:any}
  * @returns void
  */
  onDrop(_event: any, data: any): any {
    if (!this.rowDraggable) { return }
    let index = this.rowData.findIndex((m: any) => m.rowId == this.currentRow.rowId);
    this.rowData.splice(index, 1);
    let i = this.rowData.findIndex((m: any) => m.rowId == data.rowId);
    if (index - 1 < i) {
      i = i + 1;
    }
    this.rowData.splice(i, 0, this.currentRow);
  }
}