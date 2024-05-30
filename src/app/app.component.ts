import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { TestingCellrendererComponent } from './custom-table/testing-cellrenderer/testing-cellrenderer.component';
import { signleSelectDropdownSettings } from './shared/singleselect-dropdown/singleselect.model';
import { multiselectDropdownSettings } from './multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {
    this.tableOptions = {
      context: {
        componentParent: this,
      },
    };
  }
  singleselect: any = null;
  ngAfterViewInit(): void {
    // console.log(this.colDef[2].cellRenderer(987654))
    // let newBlob = fetch('').then((r) => r.blob());
    // let newBlob:any = 'http://10.0.1.208:5709/web/content/981/'
    // console.log(newBlob);
    // window.open('http://10.0.1.208:5709/web/content/981/', '_blank');
  }
  title = 'learning';
  tableOptions: any;

  colDef: any[] = [
    {
      headerName: 'Testing',
      fieldName: 'testing',
      isActive: true,
      filterEnable: true,
      sortingEnable: true,
      resize: true,
      tooltipField: 'testing',
    },
    {
      headerName: 'Add',
      fieldName: 'add',
      isActive: true,
      width: 10,
      filterEnable: true,
      sortingEnable: true,
      resize: true,
    },
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
  organisation: any = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedItem: any = null;

  updateSingleSelect(event: any) {
    this.selectedItem = event.id;
  }
  getSelectedRow(_event: any) {}

  getData() {
    // let id = document.getElementById('textBox');
  }
  multiselect: any[] = [];
  multiSelectSettings: multiselectDropdownSettings = {
    idField: 'id',
    textField: 'name',
    showLimitSelectedItem: 3,
  };
  selectSettings: signleSelectDropdownSettings = {
    idField: 'id',
    textField: 'name',
    selectType: 'unObject',
  };
  disableOptionList = [4, 6, 8, 1];
  count = 0;
  addRowData() {
    let newRow = [
      ...this.rowData,
      {
        testing: 'Tarun',
        add: `${this.count}`,
        phone: 9876787665,
        email: 'tarun@gmail.com',
      },
    ];
    this.rowData = [];
    this.rowData = newRow;
    this.count++;
  }
}
