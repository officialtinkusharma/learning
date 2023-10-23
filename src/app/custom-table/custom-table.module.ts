import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRendererDirective } from './add-renderer.directive';
import { CustomTableComponent } from './custom-table.component';
import { SharedModule } from '../shared/shared.module';
import { TableValueParserPipe } from '../shared/pipe/table-value-parser.pipe';


@NgModule({
  declarations: [
    AddRendererDirective,
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], providers: [TableValueParserPipe],
  exports: [CustomTableComponent]
})
export class CustomTableModule { }
