import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  forwardRef,
  ContentChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import { signleSelectDropdownSettings } from './singleselect.model';

@Component({
  selector: 'app-singleselect-dropdown',
  templateUrl: './singleselect-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SingleSelectDropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./singleselect-dropdown.component.scss'],
})
export class SingleSelectDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator
{
  defaultSetting: signleSelectDropdownSettings = {
    idField: 'id',
    textField: 'name',
    heightPx: 24,
    placeholderName: 'Select',
    searchEnable: true,
    selectType: 'object',
    noDataAvailableText: 'No Data To Select',
  };
  @Input() optionsList: any = [];
  @Input() disableOptionList: any[] = [];
  @Input()
  public set singleSelectSettings(value: signleSelectDropdownSettings) {
    if (value) {
      this.selectSettings = { ...this.defaultSetting, ...value };
    } else {
      this.selectSettings = { ...this.defaultSetting };
    }
  }

  @Input() errorClassName: string = 'error_class';

  disabledFormControl: boolean = false;

  @Output() selectItem = new EventEmitter();

  @ContentChild('optionTemplateRef') optionTemplateRef!: TemplateRef<any>;
  showdropdown: boolean = false;
  openDropdownCalled: boolean = false;
  showselectedItem: any;
  dropdownValues: any = [];

  selectSettings: any = { ...this.defaultSetting };

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {}
  /**
   * @author Tinku Sharma
   * @description ngOnchnage() method use show preselect data
   * @param {changes} SimpleChanges type
   * @returns {void}
   */
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
    if (_changes?.['optionsList']?.currentValue) {
      this.showSingle = this.optionsList.every(
        (item: any) =>
          typeof item == 'number' ||
          typeof item == 'string' ||
          typeof item == 'boolean'
      );
      this.writeValue(this.control?.value);
    }
  }
  showSingle: boolean = false;
  control: any;
  ngOnInit(): void {}
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
    if (this.showdropdown) this.onTouchedCallback();
    this.showdropdown = !this.showdropdown;

    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
    setTimeout(() => {
      let data: any = document.getElementsByClassName('selected_item');
      if (data.length) {
        data[0].scrollIntoViewIfNeeded();
      }
    }, 10);
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
      this.showSingle
        ? item.toString().toLowerCase().includes(searchValue.toLowerCase())
        : item?.[this.selectSettings?.textField]
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );
    event.stopPropagation();
  }
  /**
   * @author Tinku Sharma
   * @description selectData() method use for select data and emit fire select data
   * @param {data} selected data
   * @returns {void}
   */
  selectData(data: any) {
    if (
      !(this.showSingle
        ? this.disableOptionList.includes(data)
        : data?.isDisabled)
    ) {
      if (this.showdropdown) this.onTouchedCallback();
      this.showdropdown = false;

      if (this.showSingle) {
        if (JSON.stringify(this.showselectedItem) != JSON.stringify(data)) {
          this.showselectedItem = data;
          this.onChangeCallback(this.showselectedItem);
          this.selectItem.emit(data);
        }
      } else {
        if (
          this.showselectedItem[this.selectSettings.idField] !=
            data[this.selectSettings.idField] &&
          this.showselectedItem[this.selectSettings.textField] !=
            data[this.selectSettings.textField]
        ) {
          this.showselectedItem = data;

          if (this.showselectedItem.hasOwnProperty('isDisabled')) {
            delete this.showselectedItem.isDisabled;
          }
          this.onChangeCallback(this.showselectedItem);
          this.selectItem.emit(data);
        }
      }
    }
  }
  writeValue(value: any): void {
    let data: any;
    if (this.showSingle) {
      data = '';
    } else {
      data = {
        [this.selectSettings.idField]: '',
        [this.selectSettings.textField]: '',
      };
    }

    if (this.optionsList.length && value && this.checkEmitterTime(value)) {
      if (this.showSingle) {
        let getItem = this.optionsList.find((item: any) => item == value);
        if (getItem ?? '') {
          data = getItem;
        }
      } else {
        if (
          typeof value == 'number' ||
          typeof value == 'string' ||
          typeof value == 'boolean'
        ) {
          let getItem = this.optionsList.find(
            (item: any) =>
              item[this.selectSettings.idField] == value ||
              item[this.selectSettings.textField] == value
          );
          if (getItem) {
            data = getItem;
          }
        } else {
          let getItem = this.optionsList.find(
            (item: any) =>
              item[this.selectSettings.idField] ==
              value[this.selectSettings.idField]
          );

          if (getItem) {
            data = getItem;
          }
        }
      }
      setTimeout(() => {
        if (this.showSingle) {
          if (this.showselectedItem != data) {
            this.showselectedItem = data;
            this.selectItem.emit(this.showselectedItem);
          }
        } else {
          if (
            this.showselectedItem &&
            Object.keys(this.showselectedItem).length
          ) {
            if (
              this.showselectedItem[this.selectSettings.idField] !=
              data[this.selectSettings.idField]
            ) {
              this.showselectedItem = JSON.parse(JSON.stringify(data));
              if (this.showselectedItem.hasOwnProperty('isDisabled')) {
                delete this.showselectedItem.isDisabled;
              }
              this.selectItem.emit(this.showselectedItem);
            }
          } else {
            this.showselectedItem = JSON.parse(JSON.stringify(data));
            if (this.showselectedItem.hasOwnProperty('isDisabled')) {
              delete this.showselectedItem.isDisabled;
            }
            this.selectItem.emit(this.showselectedItem);
          }
        }
        this.onChangeCallback(this.showselectedItem);
      });

      this.cdr.markForCheck();
    }

    if (!value && this.optionsList.length) {
      this.showselectedItem = data;
    }
  }
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};
  // private onValidatorChange: () => void = () => {};
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  // registerOnValidatorChange(fn: () => void): void {
  //   this.onValidatorChange = fn;
  // }
  // Validator Interface
  // public validate(c: FormControl) {
  //   this.control = c;
  // }
  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state
    this.disabledFormControl = isDisabled;
  }

  validate(control: FormControl): any {
    // Custom validation logic
    this.control = control;
    // return control.value ? null : { required: true };
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(_evnet: MouseEvent, targetElement: HTMLElement): void {
    if (targetElement) {
      if (!this.el.nativeElement.contains(targetElement)) {
        if (this.showdropdown) {
          this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
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
            this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
            this.onTouchedCallback();
            this.showdropdown = false;
          }
        }
      }
    }
  }
  keydonwOnMain(event: KeyboardEvent) {
    if (!this.disabledFormControl) {
      if (event.key == 'Enter') {
        this.opendropdown();
        event.preventDefault();
      } else if (
        (event.key == 'ArrowUp' || event.key == 'ArrowDown') &&
        this.dropdownValues.length
      ) {
        let index = -1;
        if (
          this.showSingle
            ? this.showselectedItem
            : this.showselectedItem?.[this.selectSettings.idField]
        ) {
          index = this.dropdownValues.findIndex((item: any) => {
            if (this.showSingle) {
              return this.showselectedItem == item;
            } else {
              return (
                this.showselectedItem[this.selectSettings.idField] ==
                  item[this.selectSettings.idField] &&
                this.showselectedItem[this.selectSettings.textField] ==
                  item[this.selectSettings.textField]
              );
            }
          });
        }
        if (event.key == 'ArrowUp') {
          if (index == -1 || index == 0) {
            this.selectDataByKeyBoard(
              this.dropdownValues[
                this.checkDisabledFied(
                  this.dropdownValues.length - 1,
                  'ArrowUp'
                )
              ]
            );
          } else {
            this.selectDataByKeyBoard(
              this.dropdownValues[this.checkDisabledFied(index - 1, 'ArrowUp')]
            );
          }
          event.preventDefault();
        } else if (event.key == 'ArrowDown') {
          if (index == this.dropdownValues.length - 1 || index == -1) {
            this.selectDataByKeyBoard(
              this.dropdownValues[this.checkDisabledFied(0, 'ArrowDown')]
            );
          } else {
            this.selectDataByKeyBoard(
              this.dropdownValues[
                this.checkDisabledFied(index + 1, 'ArrowDown')
              ]
            );
          }
          event.preventDefault();
        }
        setTimeout(() => {
          let data: any = document.getElementsByClassName('selected_item');
          if (data.length) {
            data[0].scrollIntoViewIfNeeded();
          }
        }, 10);
      }
    }
  }

  checkDisabledFied(index: number, action: string): number {
    if (
      this.showSingle
        ? this.disableOptionList.includes(this.dropdownValues[index])
        : this.dropdownValues[index]?.isDisabled
    ) {
      if (action == 'ArrowDown') {
        if (index == -1 || index == this.dropdownValues.length - 1) {
          index = 0;
        } else {
          index++;
        }
      } else {
        if (index == 0 || index == -1) {
          index = this.dropdownValues.length - 1;
        } else {
          index--;
        }
      }
      return this.checkDisabledFied(index, action);
    } else {
      return index;
    }
  }
  selectDataByKeyBoard(data: any) {
    if (
      !(this.showSingle
        ? this.disableOptionList.includes(data)
        : data?.isDisabled)
    ) {
      if (this.showSingle) {
        if (JSON.stringify(this.showselectedItem) != JSON.stringify(data)) {
          this.showselectedItem = data;
          this.onChangeCallback(this.showselectedItem);
          this.selectItem.emit(data);
        }
      } else {
        if (
          this.showselectedItem[this.selectSettings.idField] !=
            data[this.selectSettings.idField] &&
          this.showselectedItem[this.selectSettings.textField] !=
            data[this.selectSettings.textField]
        ) {
          this.showselectedItem = data;

          if (this.showselectedItem.hasOwnProperty('isDisabled')) {
            delete this.showselectedItem.isDisabled;
          }
          this.onChangeCallback(this.showselectedItem);
          this.selectItem.emit(data);
        }
      }
    }
  }
  keydownOnDataList(event: KeyboardEvent) {
    if (!this.disabledFormControl) {
      if (
        (event.key == 'ArrowUp' || event.key == 'ArrowDown') &&
        this.dropdownValues.length
      ) {
        event.preventDefault();
        let index = -1;
        if (
          this.showSingle
            ? this.showselectedItem
            : this.showselectedItem?.[this.selectSettings.idField]
        ) {
          index = this.dropdownValues.findIndex((item: any) => {
            if (this.showSingle) {
              return item == this.showselectedItem;
            } else {
              return (
                this.showselectedItem[this.selectSettings.idField] ==
                  item[this.selectSettings.idField] &&
                this.showselectedItem[this.selectSettings.textField] ==
                  item[this.selectSettings.textField]
              );
            }
          });
        }
        if (event.key == 'ArrowUp') {
          if (index == -1 || index == 0) {
            this.selectDataByKeyBoard(
              this.dropdownValues[
                this.checkDisabledFied(
                  this.dropdownValues.length - 1,
                  'ArrowUp'
                )
              ]
            );
          } else {
            this.selectDataByKeyBoard(
              this.dropdownValues[this.checkDisabledFied(index - 1, 'ArrowUp')]
            );
          }
          // event.preventDefault();
        } else if (event.key == 'ArrowDown') {
          if (index == this.dropdownValues.length - 1 || index == -1) {
            this.selectDataByKeyBoard(
              this.dropdownValues[this.checkDisabledFied(0, 'ArrowDown')]
            );
          } else {
            this.selectDataByKeyBoard(
              this.dropdownValues[
                this.checkDisabledFied(index + 1, 'ArrowDown')
              ]
            );
          }
          // event.preventDefault();
        }
        setTimeout(() => {
          let data: any = document.getElementsByClassName('selected_item');
          if (data.length) {
            data[0].scrollIntoViewIfNeeded();
          }
        }, 10);
      }
    }
  }

  checkEmitterTime(value: any): boolean {
    if (this.showSingle) {
      return this.showselectedItem != value;
    } else {
      return typeof value == 'object'
        ? this.showselectedItem?.[this.selectSettings.idField] !=
            value[this.selectSettings.idField]
        : this.showselectedItem?.[this.selectSettings.idField] != value &&
            this.showselectedItem?.[this.selectSettings.textField] != value;
    }
  }
}
