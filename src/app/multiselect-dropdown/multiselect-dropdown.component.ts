import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { multiselectDropdownSettings } from './multiselect.model';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectDropdownComponent implements OnInit, OnChanges {
  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  @ContentChild('optionTemplateRef') optionTemplateRef!: TemplateRef<any>;
  @ContentChild('selectedItemTemplateRef')
  selectedItemTemplateRef!: TemplateRef<any>;
  @Input() disabledField: boolean = true;
  @Input() disabledItemList: any[] = []; // when option list is not array of object
  @Input() optionsList: any[] = [];
  @Input() public set selectSetting(value: multiselectDropdownSettings) {
    if (value) {
      this.multiSelectSettings = { ...this.defaultSettings, ...value };
    } else {
      this.multiSelectSettings = { ...this.defaultSettings };
    }
  }

  @Output() selectItemEmitter = new EventEmitter();
  @Output() deSelectItemEmitter = new EventEmitter();
  @Output() sendSelectedItemEmitter = new EventEmitter();
  @Output() onAllSelectEmitter = new EventEmitter();
  @Output() onAllDeSelectEmitter = new EventEmitter();

  defaultSettings: multiselectDropdownSettings = {
    idField: 'id',
    textField: 'name',
    placeholder:
      'Select ajldfjlajdf ;lajsdfljsal;djflajdsl;jasd;ljfl;sd jlfjsdljfasdjfl',
    showLimitSelectedItem: undefined,
    enableSelectAll: true,
    selectionLimit: undefined,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearch: true,
    noDataAvailableText: 'No Data to Show',
    filterNoDataAvailableText: 'No Data to Show',
    heightPx: 25,
  };

  selectedItem: any[] = [];
  showSingle: boolean = false;

  multiSelectSettings: any = { ...this.defaultSettings };

  showdropdown: boolean = false;
  dropdownList: any[] = [];

  control: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['optionsList'].currentValue) {
      this.dropdownList = JSON.parse(JSON.stringify(this.optionsList));
      this.showSingle = this.optionsList.every(
        (item: any) =>
          typeof item == 'number' ||
          typeof item == 'string' ||
          typeof item == 'boolean'
      );
      this.writeValue(this.control?.value);
    }
  }

  ngOnInit(): void {}

  trackByFn(index: number): number {
    return index;
  }
  toggleSelectAll() {
    if (this.selectedItem.length == this.getUnDisableOptionLength()) {
      let defaultSelectedItem: any[] = [];
      let defaultSelectedItemForPatch: any[] = [];
      for (let data of this.selectedItem) {
        if (!this.showSingle) {
          if (data?.isDisabled) {
            defaultSelectedItem.push(data);
            defaultSelectedItemForPatch.push({
              [this.multiSelectSettings.idField]:
                data[this.multiSelectSettings.idField],
              [this.multiSelectSettings.textField]:
                data?.[this.multiSelectSettings.textField],
            });
          }
        } else {
          if (this.disabledItemList.includes(data)) {
            defaultSelectedItem.push(data);
            defaultSelectedItemForPatch.push(data);
          }
        }
      }

      this.selectedItem = JSON.parse(JSON.stringify(defaultSelectedItem));
      this.onChangeCallback(defaultSelectedItemForPatch);
      this.onAllDeSelectEmitter.emit(this.selectedItem);
    } else {
      let duplicateSelectedItem = JSON.parse(JSON.stringify(this.selectedItem));
      this.selectedItem = [];
      let selectedItemList = [];
      if (this.showSingle) {
        for (let data of this.optionsList) {
          if (
            !this.disabledItemList.includes(data) ||
            JSON.stringify(duplicateSelectedItem).includes(JSON.stringify(data))
          ) {
            this.selectedItem.push(data);
            selectedItemList.push(data);
          }
        }
      } else {
        for (let data of this.optionsList) {
          if (
            !data.isDisabled ||
            JSON.stringify(duplicateSelectedItem).includes(JSON.stringify(data))
          ) {
            selectedItemList.push({
              [this.multiSelectSettings.idField]:
                data[this.multiSelectSettings.idField],
              [this.multiSelectSettings.textField]:
                data?.[this.multiSelectSettings.textField],
            });
            this.selectedItem.push(data);
          }
        }
      }
      this.onChangeCallback(selectedItemList);
      this.onAllSelectEmitter.emit(this.selectedItem);
    }
    this.sendSelectedItemEmitter.emit(this.selectedItem);

    console.log(this.control, 'all select');
  }
  toggleItemSelection(data: any) {
    if (!this.checkDisabledItem(data)) {
      if (JSON.stringify(this.selectedItem).includes(JSON.stringify(data))) {
        this.onRemoveItem(data);
      } else {
        this.onSelectItem(data);
      }
    }
  }

  isSelected(data: any): boolean {
    for (let item of this.selectedItem) {
      if (JSON.stringify(item) == JSON.stringify(data)) {
        return true;
      }
    }
    return false;
  }
  onSelectItem(data: any) {
    this.selectedItem.push(data);
    let selectedItemList = this.control.value;
    if (this.showSingle) {
      selectedItemList.push(data);
    } else {
      selectedItemList.push({
        [this.multiSelectSettings.idField]:
          data[this.multiSelectSettings.idField],
        [this.multiSelectSettings.textField]:
          data?.[this.multiSelectSettings.textField],
      });
    }
    this.sendSelectedItemEmitter.emit(this.selectedItem);
    this.selectItemEmitter.emit(data);
    this.onChangeCallback(selectedItemList);
    console.log(this.control, 'select');
  }
  onRemoveItem(data: any): void {
    let index = this.selectedItem.findIndex(
      (item: any) => JSON.stringify(item) == JSON.stringify(data)
    );
    let selectedItemList = this.control.value;
    selectedItemList.splice(index, 1);
    this.selectedItem.splice(index, 1);
    this.sendSelectedItemEmitter.emit(this.selectedItem);
    this.deSelectItemEmitter.emit(data);
    this.onChangeCallback(selectedItemList);
    console.log(this.control, 'remove');
  }

  searchdata(event: any): void {
    const searchValue = event.target.value;
    this.dropdownList = this.optionsList.filter((item: any) =>
      this.showSingle
        ? item.toString().toLowerCase().includes(searchValue.toLowerCase())
        : item?.[this.multiSelectSettings?.textField]
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );
    event.stopPropagation();
  }
  toggleDropdonw(): void {
    if (!this.disabledField) {
      if (this.showdropdown) this.onTouchedCallback();
      this.showdropdown = !this.showdropdown;
      this.dropdownList = JSON.parse(JSON.stringify(this.optionsList));
    }
  }
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(_evnet: MouseEvent, targetElement: HTMLElement): void {
    if (targetElement) {
      if (!this.el.nativeElement.contains(targetElement)) {
        if (this.showdropdown) {
          this.onTouchedCallback();
          this.showdropdown = false;
        }
      }
    }
  }
  @HostListener('document:keyup', ['$event', '$event.target'])
  onkeydownpress(event: KeyboardEvent, targetElement: HTMLElement) {
    if (event.key == 'Tab') {
      if (targetElement) {
        if (!this.el.nativeElement.contains(targetElement)) {
          if (this.showdropdown) {
            this.onTouchedCallback();
            this.showdropdown = false;
          }
        }
      }
    }
  }
  writeValue(value: any): void {
    this.selectedItem = [];
    let selectedItemList = [];
    if (this.optionsList.length && value?.length) {
      if (this.showSingle) {
        for (let valueData of value) {
          for (let dropdownData of this.optionsList) {
            if (valueData == dropdownData) {
              this.selectedItem.push(dropdownData);
              selectedItemList.push(dropdownData);
              break;
            }
          }
        }
      } else {
        for (let valueData of value) {
          for (let dropdownData of this.optionsList) {
            if (
              valueData?.[this.multiSelectSettings.idField] ==
              dropdownData?.[this.multiSelectSettings.idField]
            ) {
              this.selectedItem.push(dropdownData);
              selectedItemList.push({
                [this.multiSelectSettings.idField]:
                  dropdownData[this.multiSelectSettings.idField],
                [this.multiSelectSettings.textField]:
                  dropdownData?.[this.multiSelectSettings.textField],
              });
              break;
            }
          }
        }
      }
      this.onChangeCallback(selectedItemList);
      this.selectItemEmitter.emit(this.selectedItem);
      this.cdr.markForCheck();
    }
  }
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  // Validator Interface
  public validate(c: FormControl) {
    this.control = c;
  }

  checkAllFieldDisalbed(): boolean {
    if (!this.showSingle) {
      return this.optionsList.every((item: any) => item.isDisabled);
    } else {
      return this.optionsList.every((item: any) =>
        this.disabledItemList.includes(item)
      );
    }
  }
  checkDisabledItem(data: any): boolean {
    if (
      this.selectedItem.length == this.multiSelectSettings?.selectionLimit &&
      !JSON.stringify(this.selectedItem).includes(JSON.stringify(data))
    )
      return true;
    if (!this.showSingle) {
      return data?.isDisabled;
    } else {
      return this.disabledItemList.includes(data);
    }
  }
  getUnDisableOptionLength(): number {
    let count = 0;
    for (let data of this.optionsList) {
      if (this.showSingle) {
        if (
          !this.disabledItemList.includes(data) ||
          JSON.stringify(this.selectedItem).includes(JSON.stringify(data))
        ) {
          count++;
        }
      } else {
        if (
          !data.isDisabled ||
          JSON.stringify(this.selectedItem).includes(JSON.stringify(data))
        ) {
          count++;
        }
      }
    }

    return count;
  }
  allSelectKeydown(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.code == 'Space') {
      this.toggleSelectAll();
    }
  }
  toggleSelectKeydown(event: KeyboardEvent, data: any) {
    if (event.key == 'Enter' || event.code == 'Space') {
      this.toggleItemSelection(data);
      event.preventDefault();
    }
  }
}
