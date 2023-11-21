import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClickCloseDirective } from './directives/outside-click-close.directive';
import { TableValueParserPipe } from './pipe/table-value-parser.pipe';
import { SingleSelectDropdownComponent } from './singleselect-dropdown/singleselect-dropdown.component';
import { FormsModule } from '@angular/forms';

const component = [
  OutsideClickCloseDirective,
  TableValueParserPipe,
  SingleSelectDropdownComponent,
];
@NgModule({
  declarations: [component],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [component, CommonModule],
})
export class SharedModule {}
