import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableRowComponent } from './table-tree/table-row/table-row.component';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { SingleSelectDropdownComponent } from './singleselect-dropdown/singleselect-dropdown.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CustomTableModule } from './custom-table/custom-table.module';
import { TestingCellrendererComponent } from './custom-table/testing-cellrenderer/testing-cellrenderer.component';

@NgModule({
  declarations: [
    AppComponent,
    TableRowComponent,
    TableTreeComponent,
    SingleSelectDropdownComponent,
    TestingCellrendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    CustomTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
