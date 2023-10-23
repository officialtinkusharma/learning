import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, HostListener } from '@angular/core';

@Component({
  selector: 'app-singleselect-dropdown',
  templateUrl: './singleselect-dropdown.component.html',
  styleUrls: ['./singleselect-dropdown.component.scss']
})
export class SingleSelectDropdownComponent implements OnInit, OnChanges {
  @Input() optionsList: any = []
  @Input() searchEnable = true;
  @Input() selectedItem: any;
  @Input() placeholderName: any;
  @Input() disabledField = false;
  @Input() requiredField = false;
  @Input() heightPx = '24';
  @Input() listItemDisable = false;
  @Input() listTextForDisable: any;
  @Input() selectSettings = {
    idField: 'id',
    textField: 'name'
  }
  @Output() selectItem = new EventEmitter();
  showdropdown: boolean = false;
  openDropdownCalled: boolean = false
  showselectedItem: any = {};
  dropdownValues: any = [];
  /**
 * @author Tinku Sharma
 * @description HostListener method use for close dropdown list when click outside
 * @param {none} none type 
 * @returns {void}
 */
  // @HostListener('document:click', ['$event'])
  // hidePropertiesPanel() {
  //   if (this.openDropdownCalled) {
  //     this.showdropdown = !this.showdropdown;
  //     this.openDropdownCalled = false;
  //   } else {
  //     this.showdropdown = false;
  //   }


  // }
  constructor() { }
  /**
 * @author Tinku Sharma
 * @description ngOnchnage() method use show preselect data
 * @param {changes} SimpleChanges type 
 * @returns {void}
 */
  ngOnChanges(_changes: SimpleChanges): void {
    // if (changes?.['selectedItem']?.currentValue) {
    // if (!this.selectedItem) {
    //   this.showselectedItem = { [this.selectSettings.idField]: '', [this.selectSettings.textField]: '' };
    // }
    // else {
    if (typeof (this.selectedItem) != 'object') {
      let index = this.optionsList?.map((item: any) => item[this.selectSettings.idField]).indexOf(this.selectedItem);
      if (index == -1) {
        this.showselectedItem = { [this.selectSettings.idField]: '', [this.selectSettings.textField]: '' };
        this.selectItem.emit(this.showselectedItem)
      } else {
        this.showselectedItem = JSON.parse(JSON.stringify(this.optionsList[index]));
      }
    }
    else {
      let index = this.optionsList?.map((item: any) => item[this.selectSettings.idField]).indexOf(this.selectedItem[this.selectSettings.idField]);
      if (index == -1) {
        this.showselectedItem = { [this.selectSettings.idField]: '', [this.selectSettings.textField]: '' };
        this.selectItem.emit(this.showselectedItem)
      } else {
        this.showselectedItem = JSON.parse(JSON.stringify(this.optionsList[index]));
      }
    }
    // }
    // }
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));

    }
  }
  ngOnInit(): void { }
  public onOutsideClick(_event: any): void {
    this.showdropdown = false;
  }
  /**
 * @author Tinku Sharma
 * @description opendropdonw() method use for dropdown list
 * @param {none} 
 * @returns {void}
 */
  opendropdown() {
    this.showdropdown = !this.showdropdown
    // this.showdropdown = !this.showdropdown;
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
  }
  /**
   * @author Tinku Sharma
   * @description searchData() method use for search name from list
   * @param {event} event type 
   * @returns {void}
   */
  searchdata(event: any) {
    const searchValue = event.target.value;
    this.dropdownValues = this.optionsList.filter((item: any) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    event.stopPropagation()
  }
  /**
   * @author Tinku Sharma
   * @description selectData() method use for select data and emit fire select data
   * @param {data} selected data 
   * @returns {void}
   */
  selectData(data: any) {
    this.showdropdown = false;
    this.showselectedItem = data;
    this.selectItem.emit(data);
  }

  closeDropdown(_event: any) {
    this.showdropdown = false;
  }
}
