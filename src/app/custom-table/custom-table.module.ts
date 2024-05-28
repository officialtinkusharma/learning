import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRendererDirective } from './directives/add-renderer.directive';
import { CustomTableComponent } from './custom-table.component';
import { SharedModule } from '../shared/shared.module';
import { TableValueParserPipe } from '../shared/pipe/table-value-parser.pipe';
import { FormsModule } from '@angular/forms';
import { AddComponentRendererDirective } from './directives/add-component-renderer.directive';

@NgModule({
  declarations: [
    AddRendererDirective,
    CustomTableComponent,
    AddComponentRendererDirective,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  providers: [TableValueParserPipe],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
