import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideClickCloseDirective } from './directives/outside-click-close.directive';
import { TableValueParserPipe } from './pipe/table-value-parser.pipe';
import { SingleSelectDropdownComponent } from './singleselect-dropdown/singleselect-dropdown.component';
import { FormsModule } from '@angular/forms';
import { ResizeFromLeftDirective } from './directives/resize-from-left.directive';
import { ResizeFromRightDirective } from './directives/resize-from-right.directive';
import { ShowModalPlacementDirective } from './directives/show-modal-placement.directive';

const component = [
  OutsideClickCloseDirective,
  TableValueParserPipe,
  SingleSelectDropdownComponent,
  ResizeFromLeftDirective,
  ResizeFromRightDirective,
  ShowModalPlacementDirective,
];
@NgModule({
  declarations: [component],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [component, CommonModule],
})
export class SharedModule {}
