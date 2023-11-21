import { AfterViewInit, Component } from '@angular/core';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { TestingCellrendererComponent } from './custom-table/testing-cellrenderer/testing-cellrenderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // console.log(this.colDef[2].cellRenderer(987654))
  }
  title = 'learning';

  colDef: any[] = [
    {
      headerName: 'Testing',
      fieldName: 'testing',
      isActive: true,
      checkboxSelection: true,
    },
    { headerName: 'Add', fieldName: 'add', isActive: true, width: 10 },
    {
      headerName: 'Phone Number',
      fieldName: 'phone',
      isActive: true,
      cellRenderer: (param: any) => {
        return `+91 ${param.data.phone}`;
      },
    },
    {
      headerName: 'Email',
      fieldName: 'email',
      isActive: true,
      cellRenderer: TestingCellrendererComponent,
    },
  ];
  rowData: any[] = [
    {
      testing: 'Seema',
      add: 'tinku4',
      phone: 9328767876,
      email: 'seema@gmail.com',
    },
    {
      testing: 'Sumit',
      add: 'tinku4',
      phone: 9876723224,
      email: 'sumit@gmail.com',
    },
    {
      testing: 'ankit',
      add: 'tinku2',
      phone: 9876787611,
      email: 'ankit@gmail.com',
    },
    {
      testing: 'Shivam',
      add: 'tinku',
      phone: 9876787612,
      email: 'shivam@gmail.com',
    },
    {
      testing: 'Tinku',
      add: 'tinku3',
      phone: 9876787645,
      email: 'tinkusharmamaina@gmail.com',
    },
    {
      testing: 'Tarun',
      add: 'tinku1',
      phone: 9876787665,
      email: 'tarun@gmail.com',
    },
  ];
  organisation: any = [
    { id: 11, name: 'hello1' },
    { id: 12, name: 'hello2' },
    { id: 13, name: 'hello3' },
    { id: 14, name: 'hello4' },
    { id: 15, name: 'hello5' },
  ];
  selectedItem: any = 144;

  updateSingleSelect(event: any) {
    this.selectedItem = event.id;
    console.log(this.selectedItem);
  }
  getSelectedRow(_event: any) {}
}
