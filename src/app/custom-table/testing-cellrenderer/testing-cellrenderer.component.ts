import { Component, Input, OnInit } from '@angular/core';
import { ICellRenderer } from '../i-cell-renderer';

@Component({
  selector: 'app-testing-cellrenderer',
  templateUrl: './testing-cellrenderer.component.html',
  styleUrls: ['./testing-cellrenderer.component.scss'],
})
export class TestingCellrendererComponent implements ICellRenderer {
  constructor() {}
  param: any;
  tableInit(params: any): void {
    this.param = params;
  }
}
