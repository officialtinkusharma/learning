import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-multiselect-group",
  templateUrl: "./multiselect-group.component.html",
  styleUrls: ["./multiselect-group.component.css"],
})
export class MultiselectGroupComponent implements OnInit, OnChanges {
  showDropdown: boolean = false;
  @Input() showLimit: number = 1;
  @Input() selectedValues: any;
  selectedItems: any = {};
  @Input() placeholder: string = "Select Values";
  @Input() inputHeight: number = 26;
  @Output() selectedItemsEmitter = new EventEmitter();
  @Input() data: any;
  @Input() disable = false;
  searchParam: any;
  openDropdownCalled: boolean = false;
  groups: string[] = [];

  selectedLength: number = 0;
  backupData: any;
  backupGroup: any;
  constructor() { }
  /**
   * @author Tinku Sharma
   * @description HostListener method use for close dropdown list when click outside
   * @param {none} none type
   * @returns {void}
   */
  @HostListener("document:click", ["$event"])
  hidePropertiesPanel() {
    if (this.openDropdownCalled) {
      this.openDropdownCalled = false;
    } else {
      this.showDropdown = false;
    }
  }
  /**
   * @description method is to perform operation on change of input properties
   * @author Tinku Sharma
   * @param changes
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['data']?.currentValue) {
      this.groups = Object.keys(changes['data'].currentValue);
      this.backupGroup = JSON.parse(JSON.stringify(this.groups));
      this.backupData = JSON.parse(JSON.stringify(this.data));
      if (this.selectedValues && this.data) this.updateSelectedValueIfDataDelays();
    }
    if (changes?.['selectedValues']?.currentValue) {
      let l = Object.keys(changes['selectedValues'].currentValue).length;
      let len = this.getLength(changes['selectedValues'].currentValue);
      if (this.data && (l == 0 || len == 0) && Object.keys(this.data).length > 0) {
        this.groups.forEach((grp) => {
          this.data[grp]?.forEach((item: { isSelected: boolean }) => {
            if (item.isSelected) item.isSelected = false;
          });
          this.backupData[grp].forEach((item: { isSelected: boolean }) => {
            if (item.isSelected) item.isSelected = false;
          });
        });
        this.selectedItemsEmitter.emit("");
      }
      let grps = Object.keys(changes['selectedValues'].currentValue);
      if (this.data && Object.keys(this.data).length > 0) {
        grps.forEach((grp) => {
          this.selectedValues[grp].map((item: any) => {
            this.data[grp]?.forEach((element: any) => {
              if (element.id == item.id) {
                element.isSelected = true;
              }
            });
            this.backupData[grp].forEach((element: any) => {
              if (element.id == item.id) {
                element.isSelected = true;
              }
            });
          });
        });
      }

      this.selectedItems = this.selectedValues;
      this.getLength(this.selectedItems);
    }
  }

  updateSelectedValueIfDataDelays(): void {
    let l = Object.keys(this.selectedValues).length;
    let len = this.getLength(this.selectedValues);
    if (l == 0 || len == 0) {
      this.groups.forEach((grp) => {
        this.data[grp]?.forEach((item: { isSelected: boolean }) => {
          if (item.isSelected) item.isSelected = false;
        });
        this.backupData[grp].forEach((item: { isSelected: boolean }) => {
          if (item.isSelected) item.isSelected = false;
        });
      });
      this.selectedItemsEmitter.emit("");
    }
    let grps = Object.keys(this.selectedValues);
    grps.forEach((grp) => {
      this.selectedValues[grp].map((item: any) => {
        this.data[grp]?.forEach((element: any) => {
          if (element.id == item.id) {
            element.isSelected = true;
          }
        });
        this.backupData[grp].forEach((element: any) => {
          if (element.id == item.id) {
            element.isSelected = true;
          }
        });
      });
    });
    this.selectedItems = this.selectedValues;
    this.getLength(this.selectedItems);
  }

  ngOnInit(): void { }

  /**
   * @description method is get length of object
   * @author Tinku Sharma
   * @param object
   * @returns length:number
   */
  getLength(selectedData: any): number {
    let items: any[] = [];
    let grps = Object.keys(selectedData);
    grps.forEach((item) => {
      items.push(...selectedData[item]);
    });
    this.selectedLength = items.length;
    return items.length;
  }

  /**
   * @description method is update selected items on selection or deselction
   * @author Tinku Sharma
   * @param {data:{id:numer,name:string},_event,group}
   * @returns void
   */
  updateSelectedItems(data: any, _event: Event, _group: string | number): void {
    this.openDropdownCalled = true;
    if (!this.selectedItems[_group]?.length) {
      this.selectedItems[_group] = [];
    }
    let index = this.selectedItems[_group].map((item: { id: any }) => item.id).indexOf(data.id);
    if (index != -1) {
      data.isSelected = false;
      this.selectedItems[_group].splice(index, 1);
      this.getLength(this.selectedItems);
      if (this.selectedLength == 0) {
        this.selectedItemsEmitter.emit("");
      } else {
        this.selectedItemsEmitter.emit(this.selectedItems);
      }
    } else {
      data.isSelected = true;
      let selectItem = {
        id: data.id,
        name: data.name,
      };
      this.selectedItems[_group].push(selectItem);
      this.getLength(this.selectedItems);
      this.selectedItemsEmitter.emit(this.selectedItems);
    }
  }

  /**
   * @description method is to remove data on chip cross and update it in optionlist
   * @author Tinku Sharma
   * @param {event, item, group}
   * @returns void
   */
  removeItem(event: any, item: any, group: string | number): void {
    let index = this.selectedItems[group].map((item: any) => item.id).indexOf(item.id);
    let ind = this.backupData[group].map((item: any) => item.id).indexOf(item.id);
    this.backupData[group][ind].isSelected = false;
    let i = this.data[group]?.map((item: any) => item.id).indexOf(item.id);
    if (i != -1) {
      this.data[group][i].isSelected = false;
    }
    this.selectedItems[group].splice(index, 1);
    this.selectedItemsEmitter.emit(this.selectedItems);
    event.stopPropagation();
    this.getLength(this.selectedItems);
    if (this.selectedLength == 0) {
      this.selectedItemsEmitter.emit("");
    }
  }
  /**
   * @description method is to toggle dropdown
   * @author Tinku Sharma
   * @param none
   * @returns void
   */
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.openDropdownCalled = true;
  }
  /**
   * @description method is to search data list
   * @author Tinku Sharma
   * @param none
   * @returns void
   */
  searchData(): void {
    this.groups = JSON.parse(JSON.stringify(this.backupGroup));
    this.groups.forEach((item) => {
      this.data[item] = this.backupData[item].filter((element: any) => {
        return element.name?.toLowerCase().includes(this.searchParam.toLowerCase());
      });
      if (this.data[item].length == 0) {
        let index = this.backupGroup.map((element: any) => element).indexOf(item);
        this.groups.splice(index, 1);
      }
    });
  }
}
