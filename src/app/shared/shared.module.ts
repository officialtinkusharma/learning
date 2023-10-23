import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClickCloseDirective } from './directives/outside-click-close.directive';
import { TableValueParserPipe } from './pipe/table-value-parser.pipe';


const component = [OutsideClickCloseDirective, TableValueParserPipe]
@NgModule({

  declarations: [
    component
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [component, CommonModule]
})
export class SharedModule { }
